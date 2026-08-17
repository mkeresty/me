/**
 * Renders resume.md into public/Mason-Keresty-Resume.pdf.
 *
 * Print gets a light, ATS-friendly treatment rather than the site's dark
 * palette — the only carry-over is the signal blue used for rules and the
 * name. Run with: npm run resume
 */
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { marked } from "marked";

const run = promisify(execFile);
const root = process.cwd();

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => existsSync(p));

const CSS = `
  @page { size: Letter; margin: 0.55in 0.6in; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.6pt; line-height: 1.42; color: #16181d; margin: 0;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1 {
    font-size: 21pt; letter-spacing: -0.02em; margin: 0 0 2pt;
    font-weight: 700; color: #0b1020;
  }
  /* Contact line + the title line directly under the name. */
  h1 + p { font-size: 9pt; color: #4a5160; margin: 0 0 3pt; }
  h2 {
    font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.13em;
    color: #3d55b8; margin: 14pt 0 5pt; padding-bottom: 3pt;
    border-bottom: 0.6pt solid #c9cfdd; font-weight: 700;
  }
  h2:first-of-type { margin-top: 9pt; }
  h3 { font-size: 10.4pt; margin: 9pt 0 1pt; font-weight: 700; color: #0b1020; }
  h4 { font-size: 9.4pt; margin: 5pt 0 3pt; font-weight: 600; color: #2b3242; }
  h4 strong { font-weight: 600; }
  p { margin: 0 0 5pt; }
  ul { margin: 0 0 6pt; padding-left: 13pt; }
  li { margin-bottom: 2.6pt; }
  strong { color: #0b1020; }
  a { color: inherit; text-decoration: none; }
  /* Keep a role's heading with at least the start of its bullets. */
  h3, h4 { break-after: avoid; page-break-after: avoid; }
  li { break-inside: avoid; page-break-inside: avoid; }
`;

const md = await readFile(path.join(root, "resume.md"), "utf8");
const body = marked.parse(md, { mangle: false, headerIds: false });

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Mason Keresty — Resume</title><style>${CSS}</style></head>
<body>${body}</body></html>`;

const tmp = path.join(root, ".resume.tmp.html");
const outDir = path.join(root, "public");
const out = path.join(outDir, "Mason-Keresty-Resume.pdf");

await mkdir(outDir, { recursive: true });
await writeFile(tmp, html, "utf8");

try {
  if (CHROME) {
    await run(CHROME, [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${out}`,
      `file://${tmp}`,
    ]);
    console.log(`resume → ${path.relative(root, out)} (chrome)`);
  } else {
    await run("weasyprint", [tmp, out]);
    console.log(`resume → ${path.relative(root, out)} (weasyprint)`);
  }
} finally {
  await unlink(tmp).catch(() => {});
}
