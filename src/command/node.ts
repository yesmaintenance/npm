import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import directories from "../lib/directories.js";
import packageTypes from "../lib/package-types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
							resolve(
								`${__dirname}/../../src/templates/.github/workflows/node`
							)
						)
					).toString()
				);

				nodeWorkflowBase.add(`
            - uses: pnpm/action-setup@v2.2.3
              with:
                  version: 7.13.4
                  run_install: |
                      - recursive: true
                        args: [
                          --shamefully-hoist=true,
                          --child-concurrency=9999,
                          --network-concurrency=9999,
                          --prefer-frozen-lockfile=false,
                          --strict-peer-dependencies=false,
                          --unsafe-perm=true,
                          --lockfile-only
                        ]
            - uses: actions/setup-node@v3.5.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: |
                      .${packageDirectory}/pnpm-lock.yaml
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
