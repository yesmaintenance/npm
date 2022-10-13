import fs from "fs";
import { dirname } from "path";

const walkUntilGit = async (search: string): Promise<string> => {
	const path = dirname(search);
	return fs.existsSync(path + "/.git") ? path : await walkUntilGit(path);
};

export default walkUntilGit;
