import fs from "fs";
import { resolve } from "path";

import directories from "./lib/directories.js";

for (const [directory, packages] of directories) {
	const githubDir = directory + "/.github";
	let pass = false;

	for (const _package of packages) {
		if (_package.indexOf("package.json") !== -1) {
			pass = true;
		}
	}

	if (pass) {
		try {
			await fs.promises.mkdir(githubDir + "/workflows", {
				recursive: true,
			});
		} catch {
			console.log(`Could not create: ${githubDir}`);
		}

		try {
			await fs.promises.writeFile(
				`${githubDir}/workflows/node.yml`,
				await fs.promises.readFile(
					resolve("./src/templates/.github/workflows/node")
				)
			);
		} catch {
			console.log(`Could not create node workflows for: ${githubDir}`);
		}
	}
}
