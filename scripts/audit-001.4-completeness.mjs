#!/usr/bin/env node
/** Completeness check: original tracked set = retained + deleted (vs recovery tag). */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseline = process.argv[2] || "recovery/pre-001.4-c6ba96ae";
const outDir = path.join(root, ".tmp", "audit-001.4");
fs.mkdirSync(outDir, { recursive: true });

function list(ref) {
	return new Set(
		execFileSync("git", ["ls-tree", "-r", "--name-only", ref], { cwd: root })
			.toString()
			.split(/\r?\n/)
			.filter(Boolean),
	);
}

const original = list(baseline);
const current = list("HEAD");
const deleted = [...original].filter((p) => !current.has(p)).sort();
const retained = [...original].filter((p) => current.has(p)).sort();
const added = [...current].filter((p) => !original.has(p)).sort();

const ok = original.size === retained.length + deleted.length;
const report = {
	baseline,
	head: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root }).toString().trim(),
	originalCount: original.size,
	retainedOriginalCount: retained.length,
	deletedOriginalCount: deleted.length,
	addedCount: added.length,
	equationHolds: ok,
	deleted,
	added,
};

fs.writeFileSync(path.join(outDir, "completeness.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!ok) process.exit(1);
