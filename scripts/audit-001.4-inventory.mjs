#!/usr/bin/env node
/**
 * BUILD 001.4 — complete tracked-file inventory for Outcut AI.
 * Writes machine-readable artifacts under .tmp/audit-001.4/ (gitignored).
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".tmp", "audit-001.4");
fs.mkdirSync(outDir, { recursive: true });

const files = execFileSync("git", ["ls-files", "-z"], { cwd: root })
	.toString("utf8")
	.split("\0")
	.filter(Boolean);

const BINARY_EXT = new Set([
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".ico",
	".icns",
	".mp4",
	".webm",
	".wav",
	".mp3",
	".exe",
	".dll",
	".so",
	".dylib",
	".node",
	".ttf",
	".otf",
	".woff",
	".woff2",
	".pdf",
	".zip",
	".7z",
	".pdb",
	".lib",
	".a",
]);

function subsystemOf(rel) {
	const p = rel.replaceAll("\\", "/");
	if (p.startsWith("electron/native")) return "native-helpers";
	if (p.startsWith("electron/")) return "electron-main";
	if (p.startsWith("src/components/auth") || p.startsWith("src/lib/auth")) return "auth";
	if (p.startsWith("src/components/video-editor")) return "editor";
	if (p.startsWith("src/components/capture") || p.includes("recording")) return "recorder";
	if (p.startsWith("src/lib/exporter")) return "export";
	if (p.startsWith("src/")) return "renderer";
	if (p.startsWith("public/wallpapers")) return "wallpapers";
	if (p.startsWith("public/app-icons") || p.startsWith("icons/") || p.startsWith("assets/branding"))
		return "branding-assets";
	if (p.startsWith("public/")) return "public-assets";
	if (p.startsWith("tests/") || p.startsWith("src/") && p.includes(".test.")) return "tests";
	if (p.startsWith("services/")) return "optional-services";
	if (p.startsWith(".github/")) return "ci-github";
	if (p.startsWith("scripts/")) return "build-scripts";
	if (p.startsWith("docs/")) return "documentation";
	if (
		[
			"README.md",
			"LICENSE.md",
			"NOTICE.md",
			"UPSTREAM.md",
			"SECURITY.md",
			"CONTRIBUTING.md",
			"TRADEMARKS.md",
			"THIRD_PARTY_NOTICES.md",
			"RELEASING.md",
			"EXTENSIONS.md",
			"TRANSLATION_GUIDE.md",
			"README.zh-CN.md",
		].includes(p)
	)
		return "legal-docs";
	if (p.startsWith("branding/")) return "branding-assets";
	if (p === "package.json" || p === "package-lock.json") return "package-manifest";
	return "root-config";
}

function purposeOf(rel, subsystem) {
	const p = rel.replaceAll("\\", "/");
	if (p.includes(".test.") || p.endsWith(".spec.ts") || p.startsWith("tests/")) return "test";
	if (subsystem === "documentation" || subsystem === "legal-docs") return "documentation";
	if (subsystem === "ci-github" || subsystem === "build-scripts") return "build";
	if (subsystem === "branding-assets" || subsystem === "wallpapers" || subsystem === "public-assets")
		return "asset";
	if (p.endsWith(".md")) return "documentation";
	return "runtime";
}

function classify(rel, textSample) {
	const p = rel.replaceAll("\\", "/");
	const reasons = [];

	// Legal retention
	if (
		[
			"LICENSE.md",
			"NOTICE.md",
			"UPSTREAM.md",
			"THIRD_PARTY_NOTICES.md",
			"TRADEMARKS.md",
			"SECURITY.md",
		].includes(p) ||
		p.includes("CreditsDialog")
	) {
		return {
			action: "RETAIN FOR LEGAL COMPLIANCE",
			reason: "Required license, attribution, or credits surface",
		};
	}

	if (p === "assets/branding/outcut-logo.svg") {
		return { action: "KEEP", reason: "Canonical Outcut logo; do not modify geometry/gradient" };
	}

	// Generated / vendored dist in share worker — review heavy
	if (p.startsWith("services/recordly-share/worker/web/dist/")) {
		return {
			action: "REVIEW",
			reason: "Built share-worker web assets; prefer build-from-source over committed dist",
		};
	}

	if (p.startsWith("services/recordly-share/")) {
		return {
			action: "KEEP",
			reason: "Optional upstream-compatible share worker; not Outcut Cloud; retained for future/self-host",
		};
	}

	// Native binaries — keep, names are spawn contracts
	if (p.startsWith("electron/native/bin/") && BINARY_EXT.has(path.extname(p).toLowerCase())) {
		return {
			action: "KEEP",
			reason: "Packaged native helper binary; filename may remain recordly-* for spawn compatibility",
		};
	}

	if (p.startsWith("electron/native/bin/") && !path.extname(p)) {
		return {
			action: "KEEP",
			reason: "Packaged native helper executable (posix binary name)",
		};
	}

	// Branding leftovers
	if (/recordly/i.test(p) && (p.endsWith(".png") || p.endsWith(".svg") || p.endsWith(".ico"))) {
		if (p.includes("Credits") || p.includes("NOTICE")) {
			return { action: "RETAIN FOR LEGAL COMPLIANCE", reason: "Attribution-related" };
		}
		return {
			action: "REVIEW",
			reason: "Path still contains Recordly product branding; verify runtime references before REMOVE",
		};
	}

	// Auth module names
	if (p.includes("recordlyAuth") || p.includes("RecordlySignIn")) {
		return {
			action: "KEEP",
			reason: "Internal auth module name; compatibility with tests/protocols; product UI already Outcut",
		};
	}

	// User-facing copy with Recordly in non-legal paths
	if (textSample && /\bRecordly\b/.test(textSample) && purposeOf(rel, subsystemOf(rel)) === "runtime") {
		if (p.includes("credits") || p.includes("legal") || p.includes("UPSTREAM") || p.includes("NOTICE")) {
			return { action: "RETAIN FOR LEGAL COMPLIANCE", reason: "Attribution text" };
		}
		if (p.includes(".test.") || p.startsWith("tests/")) {
			return { action: "KEEP", reason: "Test fixture / protocol compatibility strings" };
		}
		return {
			action: "REBRAND",
			reason: "Source contains Recordly product string; verify attribution vs product identity",
		};
	}

	// Core app
	if (
		subsystemOf(rel) === "editor" ||
		subsystemOf(rel) === "recorder" ||
		subsystemOf(rel) === "export" ||
		subsystemOf(rel) === "electron-main" ||
		subsystemOf(rel) === "renderer"
	) {
		return { action: "KEEP", reason: "Eligible recorder/editor/runtime source" };
	}

	if (subsystemOf(rel) === "tests" || purposeOf(rel, subsystemOf(rel)) === "test") {
		return { action: "KEEP", reason: "Regression / UI test infrastructure" };
	}

	if (subsystemOf(rel) === "wallpapers") {
		return { action: "KEEP", reason: "Runtime wallpaper asset (bundled via electron-builder extraResources)" };
	}

	if (subsystemOf(rel) === "ci-github" || subsystemOf(rel) === "build-scripts") {
		return { action: "KEEP", reason: "Build, CI, or packaging automation" };
	}

	if (subsystemOf(rel) === "package-manifest" || subsystemOf(rel) === "root-config") {
		return { action: "KEEP", reason: "Project configuration / package manifest" };
	}

	if (subsystemOf(rel) === "documentation" || subsystemOf(rel) === "legal-docs") {
		return { action: "KEEP", reason: "Active documentation or legal notice" };
	}

	if (subsystemOf(rel) === "branding-assets") {
		return { action: "KEEP", reason: "Outcut branding / icon pipeline asset" };
	}

	if (subsystemOf(rel) === "optional-services") {
		return { action: "KEEP", reason: "Optional service scaffolding (auth/share); not required for local core" };
	}

	if (subsystemOf(rel) === "public-assets") {
		return { action: "KEEP", reason: "Public static asset served by renderer" };
	}

	return { action: "REVIEW", reason: "Classifier lacked strong evidence; retain pending human review" };
}

const inventory = [];
let binaryCount = 0;
let textScanCount = 0;

for (const rel of files) {
	const abs = path.join(root, rel);
	let size = 0;
	let hash = "";
	let exists = true;
	try {
		const buf = fs.readFileSync(abs);
		size = buf.length;
		hash = createHash("sha256").update(buf).digest("hex");
	} catch {
		exists = false;
	}

	const ext = path.extname(rel).toLowerCase();
	const isBinary =
		BINARY_EXT.has(ext) ||
		(!ext && rel.includes("electron/native/bin/")) ||
		rel.includes("/bin/");

	let textSample = "";
	if (exists && !isBinary && size < 2_000_000 && size > 0) {
		try {
			const raw = fs.readFileSync(path.join(root, rel), "utf8");
			textSample = raw.slice(0, 8000);
			textScanCount++;
		} catch {
			/* binary misdetected */
		}
	} else if (isBinary) binaryCount++;

	const subsystem = subsystemOf(rel);
	const purpose = purposeOf(rel, subsystem);
	const { action, reason } = classify(rel, textSample);
	const branding =
		/recordly|webadderall|openscreen/i.test(rel) ||
		(textSample ? /Recordly|recordly\.dev|webadderall/i.test(textSample) : false);

	inventory.push({
		path: rel.replaceAll("\\", "/"),
		exists,
		fileType: isBinary ? "binary" : ext || "no-ext",
		sizeBytes: size,
		sha256: hash,
		subsystem,
		purpose,
		importedOrGenerated: rel.includes("/dist/") || rel.includes("generated/") ? "generated" : "source",
		referenced: "unknown-static", // refined in summary pass
		requiredByApp: ["runtime", "asset", "build"].includes(purpose) || action === "KEEP",
		containsUpstreamBranding: Boolean(branding),
		licensing:
			action === "RETAIN FOR LEGAL COMPLIANCE"
				? "required-notice"
				: branding
					? "may-contain-upstream-marks"
					: "n/a",
		action,
		reason,
	});
}

const byAction = {};
for (const row of inventory) {
	byAction[row.action] = (byAction[row.action] || 0) + 1;
}

const summary = {
	generatedAt: new Date().toISOString(),
	head: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root }).toString().trim(),
	branch: execFileSync("git", ["branch", "--show-current"], { cwd: root }).toString().trim(),
	upstreamBaseline: "109ca3a13c362e969d9add25d1f93406c36dba2a",
	trackedFileCount: inventory.length,
	binaryFilesScannedAsBinary: binaryCount,
	textFilesContentSampled: textScanCount,
	actionCounts: byAction,
	completenessRule: "original = retained + deleted (enforced in audit-completeness pass)",
};

fs.writeFileSync(path.join(outDir, "inventory.json"), JSON.stringify(inventory, null, 2));
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));

// CSV for spreadsheet review
const csvHeader =
	"path,fileType,sizeBytes,sha256,subsystem,purpose,importedOrGenerated,action,containsUpstreamBranding,reason\n";
const csvBody = inventory
	.map((r) =>
		[
			JSON.stringify(r.path),
			r.fileType,
			r.sizeBytes,
			r.sha256,
			r.subsystem,
			r.purpose,
			r.importedOrGenerated,
			JSON.stringify(r.action),
			r.containsUpstreamBranding,
			JSON.stringify(r.reason),
		].join(","),
	)
	.join("\n");
fs.writeFileSync(path.join(outDir, "inventory.csv"), csvHeader + csvBody + "\n");

console.log(JSON.stringify(summary, null, 2));
console.log(`Wrote ${inventory.length} rows to ${path.relative(root, outDir)}`);
