import fs from "fs";
import { dirname, resolve } from "path";

import directories from "../lib/directories.js";
import packageTypes from "../lib/packageTypes.js";

export default async () => {
	for (const [directory, packages] of await directories()) {
		const githubDir = directory + "/.github";

		let dependabotBase = new Set<string>([
			`version: 2
	updates:
		- package-ecosystem: "github-actions"
		  directory: "/"
		  schedule:
			  interval: "daily"`,
		]);

		for (const _package of packages) {
			const packageDirectory = dirname(_package).replace(directory, "");
			const environment = (await packageTypes()).get(
				_package.split("/").pop()
			);
			dependabotBase.add(`
		- package-ecosystem: "${
			typeof environment !== "undefined"
				? environment
				: (() => {
						switch (_package.split(".").pop()) {
							case "csproj":
								return "nuget";
							default:
								return "npm";
						}
				  })()
		}"
		  directory: "${packageDirectory ? packageDirectory : "/"}"
		  schedule:
			  interval: "daily"
		  versioning-strategy: increase`);
		}

		try {
			await fs.promises.mkdir(githubDir + "/workflows", {
				recursive: true,
			});
		} catch {
			console.log(`Could not create: ${githubDir}`);
		}

		try {
			await fs.promises.writeFile(
				`${githubDir}/dependabot.yml`,
				`${Array.from(dependabotBase).join("\n")}\n`
			);
		} catch {
			console.log(`Could not create dependabot base for: ${githubDir}`);
		}

		try {
			await fs.promises.writeFile(
				`${githubDir}/workflows/dependabot.yml`,
				await fs.promises.readFile(
					resolve("./src/templates/.github/workflows/dependabot")
				)
			);
		} catch {
			console.log(
				`Could not create dependabot workflows for: ${githubDir}`
			);
		}
	}
};
