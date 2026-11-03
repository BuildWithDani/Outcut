/**
 * BUILD 001.5 tracked-file inventory.
 * Writes gitignored artifacts under .tmp/audit-001.5/
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".tmp", "audit-001.5");

const BINARY_EXT = new Set([
	".png",
	".jpg",
	".jpeg",
	".webp",
	".gif",
	".ico",
	".icns",
	".mp4",
	".webm",
	".wav",
	".mp3",
	".ttf",
	".otf",
	".woff",
	".woff2",
	".exe",
	".dll",
	".node",
	".dylib",
	".so",
	".bin",
]);

function classify(rel) {
	const p = rel.replaceAll("\\", "/");
	const lower = p.toLowerCase();

	if (
		p === "LICENSE.md" ||
		p === "NOTICE.md" ||
		p === "THIRD_PARTY_NOTICES.md" ||
		p === "UPSTREAM.md" ||
		p === "TRADEMARKS.md" ||
		lower.includes("ofl.txt")
	) {
		return {
			action: "RETAIN FOR LEGAL COMPLIANCE",
			reason: "License, attribution, or required notice",
		};
	}
	if (p === "assets/branding/outcut-logo.svg") {
		return { action: "KEEP", reason: "Canonical Outcut logo — do not alter geometry" };
	}
	if (p.startsWith("public/app-icons/") || p.startsWith("icons/") || p.startsWith("assets/branding/")) {
		return { action: "KEEP", reason: "Outcut branding / icon pipeline asset" };
	}
	if (p.startsWith("branding/")) {
		return { action: "REMOVE", reason: "Obsolete branding source-assets (replaced by Outcut pipeline)" };
	}
	if (p.startsWith("services/recordly-share/worker/web/dist/")) {
		return { action: "REMOVE", reason: "Rebuildable share-worker web dist" };
	}
	if (/recordly/i.test(p) && (p.endsWith(".png") || p.endsWith(".svg") || p.endsWith(".ico"))) {
		return { action: "REVIEW", reason: "Filename still carries Recordly product branding" };
	}
	if (p.startsWith("electron/native/bin/") && /recordly-/i.test(path.basename(p))) {
		return {
			action: "KEEP",
			reason: "Native helper binary name retained for spawn/packaging compatibility",
		};
	}
	if (p.startsWith("docs/") || p.endsWith(".md")) {
		return { action: "KEEP", reason: "Documentation / provenance" };
	}
	if (p.startsWith("tests/") || p.includes(".test.") || p.includes(".spec.")) {
		return { action: "KEEP", reason: "Test suite" };
	}
	if (p.startsWith("scripts/") || p.startsWith(".github/")) {
		return { action: "KEEP", reason: "Build, audit, or CI tooling" };
	}
	if (p.startsWith("electron/") || p.startsWith("src/") || p.startsWith("public/")) {
		return { action: "KEEP", reason: "Application source or runtime asset" };
	}
	return { action: "KEEP", reason: "Tracked project file — retain pending specialized review" };
}

function subsystem(rel) {
	const p = rel.replaceAll("\\", "/");
	if (p.startsWith("electron/native")) return "native-helpers";
	if (p.startsWith("electron/")) return "electron-main";
	if (p.startsWith("src/components/video-editor")) return "video-editor";
	if (p.startsWith("src/hooks") || p.includes("recorder") || p.includes("Recorder"))
		return "recorder";
	if (p.startsWith("src/")) return "renderer";
	if (p.startsWith("services/")) return "optional-services";
	if (p.startsWith("tests/")) return "tests";
	if (p.startsWith("docs/") || p.endsWith(".md")) return "documentation";
	if (p.startsWith("assets/") || p.startsWith("public/") || p.startsWith("icons/")) return "assets";
	if (p.startsWith("scripts/") || p.startsWith(".github/")) return "tooling";
	return "root";
}

async function main() {
	const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
	const branch = execFileSync("git", ["branch", "--show-current"], {
		cwd: root,
		encoding: "utf8",
	}).trim();
	const files = execFileSync("git", ["ls-files", "-z"], { cwd: root })
		.toString("utf8")
		.split("\0")
		.filter(Boolean);

	await mkdir(outDir, { recursive: true });
	const rows = [];
	let binaryCount = 0;
	let textCount = 0;
	const actionCounts = {};

	for (const rel of files) {
		const abs = path.join(root, rel);
		let size = 0;
		let sha = "";
		let exists = true;
		try {
			const st = await stat(abs);
			size = st.size;
			const buf = await readFile(abs);
			sha = createHash("sha256").update(buf).digest("hex");
		} catch {
			exists = false;
		}
		const ext = path.extname(rel).toLowerCase();
		const isBinary = BINARY_EXT.has(ext);
		if (isBinary) binaryCount += 1;
		else textCount += 1;
		const { action, reason } = classify(rel);
		actionCounts[action] = (actionCounts[action] || 0) + 1;
		rows.push({
			path: rel.replaceAll("\\", "/"),
			type: ext || "none",
			size,
			sha256: sha,
			exists,
			subsystem: subsystem(rel),
			purpose: isBinary ? "binary-asset-or-helper" : "source-or-text",
			binaryInspectedAsText: false,
			recommendedAction: action,
			reason,
			upstreamBrandingHint: /recordly/i.test(rel),
		});
	}

	const summary = {
		generatedAt: new Date().toISOString(),
		head,
		branch,
		upstreamBaseline: "109ca3a13c362e969d9add25d1f93406c36dba2a",
		trackedFileCount: rows.length,
		binaryFilesScannedAsBinary: binaryCount,
		textFilesContentSampled: textCount,
		actionCounts,
		note: "Full detailed CSV/JSON stay under .tmp/audit-001.5 (gitignored).",
	};

	const csvHeader =
		"path,type,size,sha256,subsystem,purpose,recommendedAction,reason,upstreamBrandingHint\n";
	const csvBody = rows
		.map((r) =>
			[
				JSON.stringify(r.path),
				r.type,
				r.size,
				r.sha256,
				r.subsystem,
				r.purpose,
				JSON.stringify(r.recommendedAction),
				JSON.stringify(r.reason),
				r.upstreamBrandingHint,
			].join(","),
		)
		.join("\n");

	await writeFile(path.join(outDir, "inventory.json"), JSON.stringify({ files: rows }, null, 2));
	await writeFile(path.join(outDir, "inventory.csv"), csvHeader + csvBody + "\n");
	await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
	console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
