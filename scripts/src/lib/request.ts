import { Octokit } from "@octokit/core";
import type { OctokitResponse } from "@octokit/types";
import { deepmerge } from "deepmerge-ts";
import etag from "etag";
import env from "../lib/env.js";

const octokit = new Octokit({
	auth: env.GITHUB_AUTH_TOKEN,
});

const request = async (
	where: string,
	_with: {} = {},
	type: string = "octokit"
): Promise<OctokitResponse<any, number> | any> => {
	try {
		console.log(`Successfully ${where}`);

		switch (type) {
			case "octokit": {
				console.log(etag(where));
				return await octokit.request(
					where,
					deepmerge(_with, {
						headers: {
							"If-None-Match": etag(where),
						},
					})
				);
			}
		}
	} catch (e) {
		console.log(`Could not ${where}`);
	}
};

export default request;
