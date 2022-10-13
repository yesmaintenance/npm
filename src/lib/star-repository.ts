import { Octokit } from "@octokit/core";

import env from "../lib/env.js";

const octokit = new Octokit({
	auth: env.GITHUB_AUTH_TOKEN,
});

export default async (url: string = "") => {
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
		console.log(`Could not star repository: ${url}`);
	}
	// end: starred
};
