import gitDirectories from "../lib/git-directories.js";
import gits from "../lib/gits.js";

const squash = async () => {
	for (const [directory] of await gitDirectories(await gits())) {
		console.log(directory);
	}
};

export default squash;
