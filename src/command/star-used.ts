import allGitHubRepositories from "all-the-package-repos" assert {
	type: "json"
};

import FastGlob from "fast-glob";
import fs from "fs";

import { Octokit } from "@octokit/core";

import env from "../lib/env.js";

export default async () => {
	const octokit = new Octokit({
		auth: env.GITHUB_AUTH_TOKEN,
	});

	const repositories: {
		[key: string]: any;
	} = allGitHubRepositories;

	const dependencies = new Set<string>();

	const packages = await FastGlob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: env.BASE_DIR,
	});

	const star = async (url: string = "") => {
		if (typeof url !== "string") {
			return;
		}

		// start: starred
		try {
			await octokit.request(
				`PUT /user/starred/${url.replace("https://github.com/", "")}`
			);

			console.log(
				`Starred repository: ${url.replace("https://github.com/", "")}`
			);
		} catch (error) {
			console.log(
				`Could not star repository: ${url.replace(
					"https://github.com/",
					""
				)}`
			);
		}
		// end: starred
	};

	for (const packageFile of packages) {
		const packageJson = JSON.parse(
			(await fs.promises.readFile(packageFile)).toString()
		);

		for (const key in packageJson) {
			if (Object.prototype.hasOwnProperty.call(packageJson, key)) {
				if (key == "dependencies" || key == "devDependencies") {
					for (const dependency in packageJson[key]) {
						if (
							Object.prototype.hasOwnProperty.call(
								packageJson[key],
								dependency
							)
						) {
							dependencies.add(dependency);
						}
					}
				}
			}
		}
	}

	for (const dependency of dependencies) {
		star(repositories[dependency]);
	}
};
