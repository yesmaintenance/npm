import packages from "./packages.js";
import walkUntilGit from "./walkUntilGit.js";

const directories = new Map();

for (const _package of packages) {
	const directory = await walkUntilGit(_package);

	if (!directories.has(directory)) {
		directories.set(directory, new Set<string>([_package]));
	} else {
		directories.set(directory, directories.get(directory).add(_package));
	}
}

export default directories;
