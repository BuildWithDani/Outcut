import path from "node:path";
import { expect, it, vi } from "vitest";
import { trashLibraryProjects } from "./trashProjects";

const projectA = path.resolve("/private/tmp/a.recordly");
const projectB = path.resolve("/private/tmp/b.recordly");

it("rejects paths outside the project library before touching files", async () => {
	const trash = vi.fn();
	await expect(
		trashLibraryProjects([projectA, path.resolve("/private/tmp/private.txt")], {
			list: async () => ({ entries: [{ path: projectA }] }),
			trash,
			thumbnailPath: (p) => p + ".png",
		}),
	).rejects.toThrow("not in the library");
	expect(trash).not.toHaveBeenCalled();
});
it("trashes only selected project files, deduplicates paths, and reports partial failures", async () => {
	const trash = vi.fn(async (p: string) => {
		if (p.endsWith("b.recordly")) throw Error("locked");
	});
	const result = await trashLibraryProjects([projectA, projectA, projectB], {
		list: async () => ({
			entries: [{ path: projectA }, { path: projectB }],
		}),
		trash,
		thumbnailPath: (p) => p + ".missing.png",
	});
	expect(result.deleted).toEqual([projectA]);
	expect(result.errors).toEqual(["Could not trash b.recordly"]);
	expect(trash.mock.calls.map(([p]) => p)).toEqual([projectA, projectB]);
});
