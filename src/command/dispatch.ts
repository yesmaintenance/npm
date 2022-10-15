import { Octokit } from "@octokit/core";

import env from "../lib/env.js";

/**
 * It dispatches all workflows for all repositories for a given user
 * @param {string[]} repositories - string[]
 * @returns the dispatch function.
 */
const dispatch = async (repositories: string[]) => {
	const user = env.GITHUB_USER;

	const orgs: {
		name: string;
	}[] = [];

	const repos: {
		owner: string;
		name: string;
	}[] = [];

	const octokit = new Octokit({
		auth: env.GITHUB_AUTH_TOKEN,
	});

	for (const repo of (await octokit.request(`GET /users/${user}/repos`))
		.data) {
		repos.push({
			owner: user,
			name: repo.name,
		});
	}

	for (const org of (await octokit.request(`GET /users/${user}/orgs`)).data) {
		orgs.push({
			name: org.login,
		});

		for (const repo of (
			await octokit.request(`GET /orgs/${org.login}/repos`)
		).data) {
			repos.push({
				owner: org.login,
				name: repo.name,
			});
		}
	}

	// start: repos
	for (const repo of repos) {
		if (typeof repositories !== "undefined") {
			for (const repository of repositories) {
				if (repo.name !== repository) {
					return;
				}
			}
		}

		// start: actions/workflows
		try {
			for (const workflow of (
				await octokit.request(
					`GET /repos/${repo.owner}/${repo.name}/actions/workflows`,
					{ owner: repo.owner, repo: repo.name }
				)
			).data.workflows) {
				try {
					await octokit.request(
						`POST /repos/${repo.owner}/${repo.name}/actions/workflows/${workflow.id}/dispatches`,
						{
							ref: "main",
						}
					);

					console.log(
						`Dispatched actions/workflows/${workflow.id} for: ${repo.name}`
					);
				} catch {
					console.log(
						`Could not dispatch actions/workflows/${workflow.id} for: ${repo.name}`
					);
				}
			}
		} catch (error) {
			console.log(
				`Could not dispatch actions/workflows and logs for: ${repo.name}`
			);
		}
		// end: actions/workflows
	}
	// end: repos
};

export default dispatch;
