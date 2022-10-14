import walkUntilGit from "./walk-until-git.js";

/**
 * It takes a set of globs, and returns a map of git directories to the globs that are in that
 * directory
 * @param globs - Set<string>
 * @returns A map of git directories to a set of globs.
 */
const gitDirectories = async (globs: Set<string>) => {
	const results = new Map();

	for (const glob of globs) {
		const gitDir = await walkUntilGit(glob);

		if (!results.has(gitDir)) {
			results.set(gitDir, new Set<string>([glob]));
		} else {
			results.set(gitDir, results.get(gitDir).add(glob));
		}
	}

	return results;
};

export default gitDirectories;
