/**
 * Generates the favicon set into app/, where Next picks them up by
 * convention. Run with: npm run icons
 *
 * The mark is a squared M — matching the display face's engineered
 * feel — under the signal-blue scan bar from the hero. Geometry lives
 * here once; the SVG gets a theme-aware variant, the rasters get the
 * dark one (iOS and .ico cannot switch on colour scheme).
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const app = path.join(root, "app");

const DARK = { bg: "#08090c", fg: "#f2f4f8", accent: "#6b8afd" };
const LIGHT = { bg: "#f4f6f9", fg: "#070910", accent: "#3a54c4" };

/** Shared geometry. Stroked, not filled, so it stays crisp when scaled. */
const GEOMETRY = `
  <path d="M6 20.5V5.5l10 10 10-10v15" fill="none" stroke-width="3.6"
        stroke-linejoin="miter" stroke-linecap="butt"/>
  <rect x="6" y="24.5" width="20" height="3.5"/>
`;

const opaque = ({ bg, fg, accent }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${bg}"/>
  <g stroke="${fg}">${GEOMETRY.replace(`<rect x="6"`, `<rect fill="${accent}" x="6"`)}</g>
</svg>`;

/** Browser-chrome-aware version used for the SVG favicon. */
const adaptive = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .bg { fill: ${DARK.bg} }
    .mk { stroke: ${DARK.fg} }
    .bar { fill: ${DARK.accent} }
    @media (prefers-color-scheme: light) {
      .bg { fill: ${LIGHT.bg} }
      .mk { stroke: ${LIGHT.fg} }
      .bar { fill: ${LIGHT.accent} }
    }
  </style>
  <rect class="bg" width="32" height="32"/>
  <path class="mk" d="M6 20.5V5.5l10 10 10-10v15" fill="none" stroke-width="3.6"
        stroke-linejoin="miter" stroke-linecap="butt"/>
  <rect class="bar" x="6" y="24.5" width="20" height="3.5"/>
</svg>
`;

const source = Buffer.from(opaque(DARK));

// Numbered so Next emits an explicit <link> for each. A bare favicon.ico
// would be probed at the domain root, which sits outside the basePath on
// a project-page deploy and would 404.
await writeFile(path.join(app, "icon0.svg"), adaptive, "utf8");
await sharp(source, { density: 1024 }).resize(32, 32).png().toFile(path.join(app, "icon1.png"));

// Apple touch icon: opaque, unrounded — iOS applies its own mask.
await sharp(source, { density: 1024 }).resize(180, 180).png().toFile(path.join(app, "apple-icon.png"));

console.log("icons → app/icon0.svg, app/icon1.png, app/apple-icon.png");
