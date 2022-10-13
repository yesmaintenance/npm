import packages from "./packages.js";
import walkUntilGit from "./walkUntilGit.js";

export default async () => {
	const directories = new Map();

	for (const _package of await packages()) {
		const directory = await walkUntilGit(_package);

		if (!directories.has(directory)) {
			directories.set(directory, new Set<string>([_package]));
		} else {
			directories.set(
				directory,
				directories.get(directory).add(_package)
			);
		}
	}

	return directories;
};
