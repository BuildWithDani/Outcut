#!/usr/bin/env node
/**
 * Generate Outcut AI application icons from the canonical SVG.
 * Uses sharp (libvips SVG rasterization) for gradient/shadow fidelity.
 *
 * Usage:
 *   npm install --no-save sharp png2icons
 *   node scripts/generate-outcut-icons.mjs
 */
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const png2icons = require("png2icons");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "assets", "branding", "outcut-logo.svg");
const appIconsDir = path.join(root, "public", "app-icons");
const pngDir = path.join(root, "icons", "icons", "png");
const winDir = path.join(root, "icons", "icons", "win");
const macDir = path.join(root, "icons", "icons", "mac");
const generatedDir = path.join(root, "assets", "branding", "generated");

const APP_ICON_SIZES = [16, 32, 64, 128, 256, 512, 1024];
const LINUX_PNG_SIZES = [16, 24, 32, 48, 64, 128, 256, 512, 1024];

async function ensureDir(dir) {
	await fs.mkdir(dir, { recursive: true });
}

async function rasterize(svgBuffer, size) {
	return sharp(svgBuffer, { density: Math.max(72, Math.round((size / 512) * 384)) })
		.resize(size, size, {
			fit: "contain",
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		})
		.png()
		.toBuffer();
}

async function writeFile(filePath, buffer) {
	await ensureDir(path.dirname(filePath));
	await fs.writeFile(filePath, buffer);
	console.log(`wrote ${path.relative(root, filePath)} (${buffer.length} bytes)`);
}

async function main() {
	const svg = await fs.readFile(svgPath);
	await ensureDir(generatedDir);
	await ensureDir(appIconsDir);
	await ensureDir(pngDir);
	await ensureDir(winDir);
	await ensureDir(macDir);

	const master = await rasterize(svg, 1024);
	await writeFile(path.join(generatedDir, "outcut-1024.png"), master);

	for (const size of APP_ICON_SIZES) {
		const buffer = size === 1024 ? master : await rasterize(svg, size);
		await writeFile(path.join(appIconsDir, `outcut-${size}.png`), buffer);
		await writeFile(path.join(generatedDir, `outcut-${size}.png`), buffer);
	}

	for (const size of LINUX_PNG_SIZES) {
		await writeFile(path.join(pngDir, `${size}x${size}.png`), await rasterize(svg, size));
	}

	const ico = png2icons.createICO(await rasterize(svg, 256), png2icons.BILINEAR, 0, true);
	if (!ico) throw new Error("Failed to create Windows .ico");
	await writeFile(path.join(winDir, "icon.ico"), ico);

	const icns = png2icons.createICNS(await rasterize(svg, 1024), png2icons.BILINEAR, 0);
	if (!icns) throw new Error("Failed to create macOS .icns");
	await writeFile(path.join(macDir, "icon.icns"), icns);

	console.log("Outcut icon generation complete.");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
