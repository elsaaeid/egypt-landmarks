#!/usr/bin/env node
/*
  create-landmark-examples.js

  Copies krpano example folders into
    public/krpano/viewer/examples_landmarks/landmark-1/
    public/krpano/viewer/examples_landmarks/landmark-2/

  and replaces panorama image files (detected heuristically) with the
  corresponding landmark image while preserving filenames and folder layout.

  Usage: node scripts/create-landmark-examples.js
*/

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const examplesRoot = path.join(projectRoot, 'public', 'krpano', 'viewer', 'examples');
const outRoot = path.join(projectRoot, 'public', 'krpano', 'viewer', 'examples_landmarks');

const landmarkMap = {
  'landmark-1': path.join(projectRoot, 'public', 'assets', 'images', 'grand-egyptian-museum.png'),
  'landmark-2': path.join(projectRoot, 'public', 'assets', 'images', 'sphinx.png'),
};

const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isPanoramaImage(relPath, filename) {
  const lower = filename.toLowerCase();
  const rp = relPath.replace(/\\/g, '/').toLowerCase();

  if (rp.includes('/panos/') || rp.includes('/pano/') || rp.includes('.tiles/')) return true;
  if (/(?:pano|preview|thumb)/.test(lower)) return true;
  if (/[_.-](?:u|f|r|l|d|b)\.(jpg|jpeg|png|webp|jfif)$/i.test(lower)) return true;
  return false;
}

function copyAndReplace(srcDir, destDir, landmarkImagePath) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyAndReplace(srcPath, destPath, landmarkImagePath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (imageExts.has(ext) && isPanoramaImage(path.relative(examplesRoot, srcPath), entry.name)) {
        try {
          fs.copyFileSync(landmarkImagePath, destPath);
          console.log('Replaced panorama image:', destPath);
        } catch (err) {
          console.error('Failed to copy landmark image to', destPath, err.message);
        }
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(examplesRoot)) {
    console.error('Examples root not found:', examplesRoot);
    process.exit(1);
  }
  ensureDir(outRoot);

  for (const key of Object.keys(landmarkMap)) {
    const landmarkImage = landmarkMap[key];
    if (!fs.existsSync(landmarkImage)) {
      console.error('Landmark image not found for', key, landmarkImage);
      continue;
    }
    const targetRoot = path.join(outRoot, key);
    ensureDir(targetRoot);
    console.log('Creating examples for', key, '->', targetRoot);
    copyAndReplace(examplesRoot, targetRoot, landmarkImage);
  }

  console.log('Done. Created copies under:', outRoot);
}

main();
