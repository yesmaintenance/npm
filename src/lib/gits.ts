import FastGlob from "fast-glob";

import env from "./env.js";

/**
 * It returns a set of all the git repositories in the current directory
 */
const gits = async () =>
	new Set<string>([
		...(await FastGlob([`**/.git`], {
			absolute: true,
			cwd: env.BASE_DIR,
		})),
	]);

export default gits;
