"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme, type Theme } from "./theme";

/* ------------------------------------------------------------------ *
 * A low-angle point field with a scan line sweeping through it.
 *
 * Ambient motion is layered sine waves; the pointer pushes a soft
 * gaussian bump across the surface; and every few seconds a narrow band
 * travels from the far edge to the near one, lifting and lighting the
 * points it crosses. That band is the idea — a scanner passing over a
 * surface, which is what the work below it is about.
 * ------------------------------------------------------------------ */

const GRID_W = 34;
const GRID_D = 26;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerStrength;
  uniform float uScanZ;
  uniform float uSize;
  uniform float uDpr;

  attribute float aRand;

  varying float vFlare;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec3 pos = position;

    // Ambient field: three travelling waves at different rates, so the
    // surface never visibly repeats.
    float w =
        sin(pos.x * 0.28 + uTime * 0.55) * 0.34
      + sin(pos.z * 0.22 - uTime * 0.40) * 0.30
      + sin((pos.x + pos.z) * 0.16 + uTime * 0.27) * 0.22;

    // Pointer: a gaussian bump tracking the cursor across the plane.
    float d = distance(pos.xz, uPointer);
    w += exp(-d * d * 0.05) * uPointerStrength * 1.6;

    pos.y += w;
    vHeight = w;

    // Scan band.
    float scan = exp(-pow(pos.z - uScanZ, 2.0) * 1.1);
    pos.y += scan * 0.55;
    vFlare = scan;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    gl_PointSize = uSize * uDpr * (8.5 / dist) * (0.6 + aRand * 0.8);

    // Dissolve into the void at the far edge rather than ending on a line.
    vFade = smoothstep(23.0, 5.0, dist);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3  uBase;
  uniform vec3  uSignal;
  uniform float uOpacity;
  uniform float uGlow;   // additive bloom on dark; off for ink-on-paper
  uniform float uFloor;  // resting alpha of an unlit point

  varying float vFlare;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;

    float alpha = smoothstep(0.25, 0.0, r);
    float lit = clamp(vFlare * 1.4 + max(vHeight, 0.0) * 0.5, 0.0, 1.0);

    vec3 col = mix(uBase, uSignal, lit) + uSignal * vFlare * 0.6 * uGlow;

    gl_FragColor = vec4(col, alpha * vFade * uOpacity * (uFloor + lit * (1.0 - uFloor)));
    #include <colorspace_fragment>
  }
`;

/**
 * Dark composites additively so the scan band blooms. Light cannot —
 * adding light to paper only erases it — so points are laid down as ink
 * with normal blending and the band reads by darkening instead.
 *
 * Light needs a much darker base and a higher resting alpha to land at
 * the same visual weight: additive accumulates where points overlap,
 * normal blending does not. These values were matched by measuring mean
 * contrast against each theme's own background.
 */
const PALETTE = {
  dark: { base: "#46608f", signal: "#6b8afd", glow: 1, floor: 0.5, blending: THREE.AdditiveBlending },
  light: { base: "#4a5a80", signal: "#3a54c4", glow: 0, floor: 0.72, blending: THREE.NormalBlending },
} as const;

type FieldProps = {
  density: number;
  interactive: boolean;
  frozen: boolean;
  theme: Theme;
};

function Field({ density, interactive, frozen, theme }: FieldProps) {
  const { size, invalidate } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);

  const cols = Math.max(2, Math.round(140 * density));
  const rows = Math.max(2, Math.round(92 * density));

  const [positions, randoms] = useMemo(() => {
    const count = cols * rows;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    let i = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        pos[i * 3] = (ix / (cols - 1) - 0.5) * GRID_W;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (iz / (rows - 1) - 0.5) * GRID_D;
        rnd[i] = Math.random();
        i++;
      }
    }
    return [pos, rnd] as const;
  }, [cols, rows]);

  // Created once and mutated in useFrame — never rebuilt per render, or
  // three would rebind the whole uniform block every frame.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerStrength: { value: 0 },
      uScanZ: { value: 999 },
      uSize: { value: 3 },
      uDpr: { value: 1 },
      uOpacity: { value: 0 },
      uGlow: { value: PALETTE.dark.glow as number },
      uFloor: { value: PALETTE.dark.floor as number },
      uBase: { value: new THREE.Color(PALETTE.dark.base) },
      uSignal: { value: new THREE.Color(PALETTE.dark.signal) },
    }),
    [],
  );

  // Swapping the palette also swaps how points composite, so the material
  // needs recompiling — not just new uniform values.
  useEffect(() => {
    const p = PALETTE[theme];
    uniforms.uBase.value.set(p.base);
    uniforms.uSignal.value.set(p.signal);
    uniforms.uGlow.value = p.glow;
    uniforms.uFloor.value = p.floor;
    if (material.current) {
      material.current.blending = p.blending;
      material.current.needsUpdate = true;
    }
    invalidate();
  }, [theme, uniforms, invalidate]);

  // Points need to read larger on narrow viewports or the field turns to noise.
  useEffect(() => {
    uniforms.uSize.value = size.width < 640 ? 4.2 : 3;
    invalidate();
  }, [size.width, uniforms, invalidate]);

  // Frozen fields render on demand, so there are no frames to ramp over.
  useEffect(() => {
    if (frozen) {
      uniforms.uOpacity.value = 1;
      invalidate();
    }
  }, [frozen, uniforms, invalidate]);

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const u = uniforms;
    u.uDpr.value = Math.min(state.gl.getPixelRatio(), 2);

    if (frozen) {
      // A single representative moment: waves settled, scan mid-field.
      u.uTime.value = 4.2;
      u.uScanZ.value = 2;
      return;
    }

    const t = state.clock.elapsedTime;
    u.uTime.value = t;
    u.uOpacity.value = THREE.MathUtils.damp(u.uOpacity.value, 1, 1.8, delta);

    if (interactive) {
      raycaster.setFromCamera(state.pointer, state.camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        target.current.set(hit.x, hit.z);
      }
      u.uPointer.value.lerp(target.current, 1 - Math.pow(0.001, delta));
      u.uPointerStrength.value = THREE.MathUtils.damp(
        u.uPointerStrength.value,
        0.9,
        2.5,
        delta,
      );
    }

    // Sweep far → near over ~6s, then rest ~3s before the next pass.
    const PERIOD = 9;
    const SWEEP = 0.66;
    const p = (t % PERIOD) / PERIOD;
    u.uScanZ.value = p < SWEEP ? THREE.MathUtils.lerp(-15, 15, p / SWEEP) : 999;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthWrite={false}
        blending={PALETTE[theme].blending}
      />
    </points>
  );
}

export default function HeroField() {
  const [reduced, setReduced] = useState(false);
  const [small, setSmall] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduced(motion.matches);
      setSmall(narrow.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2.4, 7.6], fov: 42 }}
      dpr={[1, small ? 1.5 : 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <Field
        density={small ? 0.55 : 1}
        interactive={!small && !reduced}
        frozen={reduced}
        theme={theme}
      />
    </Canvas>
  );
}
