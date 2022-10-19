import fs from "fs";
import { dirname, basename } from "path";

import gitDirectories from "../lib/git-directories.js";
import packageTypes from "../lib/package-types.js";
import packages from "../lib/packages.js";
import rust from "../options/rust.js";
import type { containers } from "../options/workflow.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {containers} files - containers
 */
const writeWorkflows = async (files: containers) => {
	for (const { path, name, workflow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages()
		)) {
			const githubDir = directory + "/.github";
			const workflowBase = await workflow();

			if (path == "/workflows/" && name == "rust.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(
						directory,
						""
					);

					const environment = (await packageTypes()).get(
						_package.split("/").pop()
					);

					if (
						typeof environment !== "undefined" &&
						environment === "cargo"
					) {
						workflowBase.add(`
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${packageDirectory}/${basename(
							_package
						)}
`);
					}
				}
			}

			if (workflowBase.size > 1) {
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

export default async () => {
	await writeWorkflows(rust);
};
