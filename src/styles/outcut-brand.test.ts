import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "../..");

describe("Outcut brand tokens", () => {
	it("centralizes teal tokens from the approved logo palette", () => {
		const css = readFileSync(path.join(root, "src/styles/outcut-brand.css"), "utf8");
		expect(css).toContain("--outcut-logo-top: #58d3bc");
		expect(css).toContain("--outcut-logo-bottom: #1d8070");
		expect(css).toContain("--outcut-accent: #35bca6");
		expect(css).toContain("--outcut-accent-hover: #58d3bc");
		expect(css).toContain("--outcut-accent-pressed: #1d8070");
		expect(css).toContain("--outcut-accent-subtle: #0d312b");
		expect(css).toContain("--accent: var(--outcut-accent)");
	});

	it("is imported by the application stylesheet", () => {
		const css = readFileSync(path.join(root, "src/index.css"), "utf8");
		expect(css).toContain('./styles/outcut-brand.css');
	});

	it("does not alter the canonical Outcut SVG", () => {
		const svg = readFileSync(path.join(root, "assets/branding/outcut-logo.svg"), "utf8");
		expect(svg).toContain('stop-color="#58d3bc"');
		expect(svg).toContain('stop-color="#1d8070"');
		expect(svg).toContain('viewBox="0 0 400 400"');
		expect(svg).not.toContain("Recordly");
	});
});
