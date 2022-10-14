import gitDirectories from "../lib/git-directories.js";
import packages from "../lib/packages.js";

const squash = async () => {
	for (const [directory] of await gitDirectories(await packages())) {
		console.log(directory);
	}
};

export default squash;
