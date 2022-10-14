import { Octokit } from "@octokit/core";

import env from "../lib/env.js";

/**
 * It deletes all GitHub Actions logs and runs for all of your repositories
 */
const clean = async () => {
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
		// start: actions/runs
		try {
			for (const run of (
				await octokit.request(
					`GET /repos/${repo.owner}/${repo.name}/actions/runs`,
					{ owner: repo.owner, repo: repo.name }
				)
			).data.workflow_runs) {
				try {
					await octokit.request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}/logs`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);

					console.log(
						`Deleted actions/runs/${run.id}/logs for: ${repo.name}`
					);
				} catch {
					console.log(
						`Could not delete actions/runs/${run.id}/logs for: ${repo.name}`
					);
				}

				try {
					await octokit.request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);

					console.log(
						`Deleted actions/runs/${run.id} for: ${repo.name}`
					);
				} catch {
					console.log(
						`Could not delete actions/runs/${run.id} for: ${repo.name}`
					);
				}
			}
		} catch (error) {
			console.log(
				`Could not delete actions/runs and logs for: ${repo.name}`
			);
		}
		// end: actions/runs
	}
	// end: repos
};

export default clean;
