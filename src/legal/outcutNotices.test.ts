import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "../..");

function read(rel: string) {
	return readFileSync(path.join(root, rel), "utf8");
}

describe("Outcut legal and product identity notices", () => {
	it("keeps AGPL license body and required copyright layering", () => {
		const license = read("LICENSE.md");
		expect(license).toContain("GNU AFFERO GENERAL PUBLIC LICENSE");
		expect(license).toContain("Copyright (C) 2026 webadderall");
		expect(license).toContain("BuildWithDani");
		expect(license).toContain("Outcut AI");
	});

	it("preserves NOTICE provenance for Recordly and OpenScreen", () => {
		const notice = read("NOTICE.md");
		expect(notice).toContain("OpenScreen");
		expect(notice).toContain("Recordly");
		expect(notice).toContain("BuildWithDani does **not** claim ownership");
		expect(notice).toContain("109ca3a13c362e969d9add25d1f93406c36dba2a");
	});

	it("documents upstream compatibility contracts", () => {
		const upstream = read("UPSTREAM.md");
		expect(upstream).toContain(".recordly");
		expect(upstream).toContain("recordly://");
		expect(upstream).toContain("outcut://");
		expect(upstream).toContain("BuildWithDani/Outcut");
	});

	it("ships the canonical Outcut logo without Recordly product marks in SVG", () => {
		const svg = read("assets/branding/outcut-logo.svg");
		expect(svg).toContain('stop-color="#58d3bc"');
		expect(svg).toContain('stop-color="#1d8070"');
		expect(svg).not.toContain("Recordly");
	});

	it("exposes Outcut app icons and not legacy Recordly promotional app icons", () => {
		expect(existsSync(path.join(root, "public/app-icons/outcut-128.png"))).toBe(true);
		expect(existsSync(path.join(root, "public/app-icons/recordly-128.png"))).toBe(false);
		expect(existsSync(path.join(root, "public/app-icons/recordlymac-128.png"))).toBe(false);
	});

	it("identifies the npm package as Outcut AI", () => {
		const pkg = JSON.parse(read("package.json")) as {
			name: string;
			productName: string;
			author: string;
		};
		expect(pkg.name).toBe("outcut-ai");
		expect(pkg.productName).toBe("Outcut AI");
		expect(pkg.author).toBe("BuildWithDani");
	});
});
