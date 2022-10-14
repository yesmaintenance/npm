import fs from "fs";
import { dirname } from "path";

import gitDirectories from "../lib/git-directories.js";
import packageTypes from "../lib/package-types.js";
import packages from "../lib/packages.js";
import node from "../options/node.js";
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

			if (path == "/workflows/" && name == "node.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(
						directory,
						""
					);
					const packageFile = (
						await fs.promises.readFile(_package)
					).toString();

					const environment = (await packageTypes()).get(
						_package.split("/").pop()
					);

					if (
						typeof environment !== "undefined" &&
						environment === "npm"
					) {
						const packageJson = JSON.parse(packageFile);

						for (const bundle of [
							"bundledDependencies",
							"peerDependencies",
							"peerDependenciesMeta",
							"dependencies",
							"optionalDependencies",
							"devDependencies",
							"extensionDependencies",
							"bundleDependencies",
						]) {
							if (typeof packageJson[bundle] !== "undefined") {
								workflowBase.add(`            - uses: actions/setup-node@v3.5.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: '.${packageDirectory}/pnpm-lock.yaml'
            - run: pnpm install
              working-directory: .${packageDirectory}`);
							}
						}

						for (const key in packageJson) {
							if (
								Object.prototype.hasOwnProperty.call(
									packageJson,
									key
								)
							) {
								const values = packageJson[key];
								if (key == "scripts") {
									for (const scripts in values) {
										if (
											Object.prototype.hasOwnProperty.call(
												values,
												scripts
											)
										) {
											if (scripts == "build") {
												workflowBase.add(`
            - run: pnpm run build
              working-directory: .${packageDirectory}
`);
											}
										}
									}
								}
							}
						}
					}
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
	writeWorkflows(node);
};
