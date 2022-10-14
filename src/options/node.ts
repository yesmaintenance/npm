import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import type { containers } from "./workflow.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Creating a set of objects that contain the path, name, and workflow for each file that needs to be
created. */
const files: containers = new Set([
	{
		path: "/workflows/",
		name: "node.yml",
		workflow: async () =>
			new Set([
				(
					await fs.promises.readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/workflows/node.yml`
						)
					)
				).toString(),
			]),
	},
]);
export default files;
