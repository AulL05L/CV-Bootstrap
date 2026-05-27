/**
 * build.js — copies Bootstrap dist files and @fontsource font files
 * into the assets/ directory so index.html can reference them locally.
 *
 * Run with:  npm run build
 */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ─── helpers ─────────────────────────────────────────────────── */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`  ✓  ${dest}`);
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : copyFile(s, d);
  }
}

/* ─── 1. Bootstrap CSS + JS ───────────────────────────────────── */
console.log('\n📦  Bootstrap');
copyFile(
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'assets/vendor/css/bootstrap.min.css'
);
copyFile(
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'assets/vendor/js/bootstrap.bundle.min.js'
);

/* ─── 2. Syne (headings) ──────────────────────────────────────── */
console.log('\n🔤  Syne font');
copyDir('node_modules/@fontsource/syne', 'assets/fonts/syne');

/* ─── 3. Outfit (body) ────────────────────────────────────────── */
console.log('\n🔤  Outfit font');
copyDir('node_modules/@fontsource/outfit', 'assets/fonts/outfit');

/* ─── done ────────────────────────────────────────────────────── */
console.log('\n✅  Build complete!');
console.log('   Open index.html in your browser or run: npm start\n');
