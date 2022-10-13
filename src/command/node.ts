import fs from "fs";
import { dirname, resolve } from "path";

import directories from "../lib/directories.js";
import packageTypes from "../lib/packageTypes.js";

export default async () => {
	for (const [directory, packages] of await directories()) {
		const githubDir = directory + "/.github";

		let nodeWorkflowBase = new Set<string>();

		for (const _package of packages) {
			const packageDirectory = dirname(_package).replace(directory, "");

			const environment = (await packageTypes()).get(
				_package.split("/").pop()
			);

			if (typeof environment !== "undefined" && environment === "npm") {
				nodeWorkflowBase.add(
					(
						await fs.promises.readFile(
							resolve("./src/templates/.github/workflows/node")
						)
					).toString()
				);

				nodeWorkflowBase.add(`
            - run: pnpm install
              working-directory: .${packageDirectory}
            - run: pnpm run build
              working-directory: .${packageDirectory}`);
			}
		}

		if (nodeWorkflowBase.size > 0) {
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
					`${Array.from(nodeWorkflowBase).join("\n")}\n`
				);
			} catch {
				console.log(`Could not create node base for: ${githubDir}`);
			}
		}
	}
};
