import fs from "fs";
import { dirname } from "path";

import gitDirectories from "../lib/git-directories.js";
import packageTypes from "../lib/package-types.js";
import packages from "../lib/packages.js";
import dependabot from "../options/dependabot.js";
import type { containers } from "../options/workflow.js";

/**
 * It creates a `dependabot.yml` file in each `.github` directory of each repository in the current
 * working directory
 * @param {containers} files - This is an array of objects that contain the path, name, and workflow
 * function.
 */
const writeWorkflows = async (files: containers) => {
	for (const { path, name, workflow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages()
		)) {
			const githubDir = directory + "/.github";
			const workflowBase = await workflow();

			if (path == "/") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(
						directory,
						""
					);

					const environment = (await packageTypes()).get(
						_package.split("/").pop()
					);

					workflowBase.add(`    - package-ecosystem: "${
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
			}

			if (workflowBase.size > 0) {
				try {
					await fs.promises.mkdir(`${githubDir}${path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${path}`);
				}

				try {
					await fs.promises.writeFile(
						`${githubDir}${path}${name}`,
						`${Array.from(workflowBase).join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/dependabot.yml`
					);
				}
			} else {
				try {
					await fs.promises.access(
						`${githubDir}${path}${name}`,
						fs.constants.F_OK
					);

					try {
						await fs.promises.rm(`${githubDir}${path}${name}`);
					} catch {
						console.log(
							`Could not remove ${path}${name} for: ${githubDir}`
						);
					}
				} catch {}
			}
		}
	}
};

export default () => {
	writeWorkflows(dependabot);
};
