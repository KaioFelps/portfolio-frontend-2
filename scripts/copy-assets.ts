#!/usr/bin/env -S node --experimental-strip-types --no-warnings
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");

const staticSrcPath = path.join(root, ".next/static");
const staticDestPath = path.join(root, ".next/standalone/.next/static");

const publicSrcPath = path.join(root, "public");
const publicDestPath = path.join(root, ".next/standalone/public");

const greenTick = `\x1b[32m\u2713\x1b[0m`;
const redCross = `\x1b[31m\u274C\x1b[0m`;
const yellowExclamation = `\x1b[33m\u26A0\x1b[0m`;

async function copyAssets(src: string, dest: string) {
  try {
    await fs.access(src);
    // biome-ignore lint/suspicious/noExplicitAny: it's an Error instance
  } catch (e: any) {
    if (e?.code === "ENOENT") {
      console.warn(`${yellowExclamation} Directory not found: ${src}.`);
      return;
    } else throw e;
  }

  await fs.mkdir(dest, { recursive: true });
  const items = await fs.readdir(src, { withFileTypes: true });

  const promises: Promise<unknown>[] = items.flatMap((item) => {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      return copyAssets(srcPath, destPath);
    } else {
      return fs.copyFile(srcPath, destPath);
    }
  });

  return Promise.all(promises);
}

try {
  await copyAssets(staticSrcPath, staticDestPath);
  await copyAssets(publicSrcPath, publicDestPath);
  console.log(`${greenTick} Assets copied successfully`);
} catch (err) {
  console.error(`${redCross} Failed to copy assets: ${err}`);
}
