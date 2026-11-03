/**
 * BUILD 001.5 completeness: original tracked = retained original + deleted original.
 */
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".tmp", "audit-001.5");

const baseline =
	process.argv[2] ||
	execFileSync("git", ["merge-base", "HEAD", "outcut/main"], {
		cwd: root,
		encoding: "utf8",
	}).trim();

function ls(ref) {
	return new Set(
		execFileSync("git", ["ls-tree", "-r", "--name-only", ref], { cwd: root, encoding: "utf8" })
			.split("\n")
			.map((s) => s.trim())
			.filter(Boolean),
	);
}

async function main() {
	const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
	const original = ls(baseline);
	const current = ls("HEAD");
	const deleted = [...original].filter((p) => !current.has(p)).sort();
	const added = [...current].filter((p) => !original.has(p)).sort();
	const retained = [...original].filter((p) => current.has(p)).length;
	const equationHolds = original.size === retained + deleted.length;

	const report = {
		baseline,
		head,
		originalCount: original.size,
		retainedOriginalCount: retained,
		deletedOriginalCount: deleted.length,
		addedCount: added.length,
		finalTrackedCount: current.size,
		equationHolds,
		deleted,
		added,
	};

	await mkdir(outDir, { recursive: true });
	await writeFile(path.join(outDir, "completeness.json"), JSON.stringify(report, null, 2));
	console.log(JSON.stringify(report, null, 2));
	if (!equationHolds) process.exit(1);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
