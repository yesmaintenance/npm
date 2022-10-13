import { Octokit } from "@octokit/core";

import env from "../lib/env.js";

export default async () => {
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

	// start: orgs
	for (const org of orgs) {
		// start: actions/permissions
		try {
			await octokit.request(`PUT /orgs/${org.name}/actions/permissions`, {
				org: org.name,
				enabled_repositories: "all",
				allowed_actions: "all",
			});

			console.log(`Set actions/permissions for: ${org.name}`);
		} catch (error) {
			console.log(`Could not set actions/permissions for: ${org.name}`);
		}
		// end: actions/permissions

		// actions/permissions/workflow
		try {
			await octokit.request(
				`PUT /orgs/${org.name}/actions/permissions/workflow`,
				{
					org: org.name,
					default_workflow_permissions: "write",
					can_approve_pull_request_reviews: true,
				}
			);

			console.log(`Set permissions/workflow for: ${org.name}`);
		} catch (error) {
			console.log(`Could not set permissions/workflow for: ${org.name}`);
		}
		// end: actions/permissions/workflow
	}
	// end: orgs

	// start: repos
	for (const repo of repos) {
		// start: vulnerability-alerts
		try {
			await octokit.request(
				`PUT /repos/${repo.owner}/${repo.name}/vulnerability-alerts`
			);

			console.log(`Enabled vulnerability-alerts for: ${repo.name}`);
		} catch (error) {
			console.log(
				`Could not enable vulnerability-alerts for: ${repo.name}`
			);
		}
		// end: vulnerability-alerts

		// start: automated-security-fixes
		try {
			await octokit.request(
				`PUT /repos/${repo.owner}/${repo.name}/automated-security-fixes`
			);

			console.log(`Enabled automated-security-fixes for: ${repo.name}`);
		} catch (error) {
			console.log(
				`Could not enable automated-security-fixes for: ${repo.name}`
			);
		}
		// end: automated-security-fixes

		// start: patch
		try {
			await octokit.request(`PATCH /repos/${repo.owner}/${repo.name}`, {
				has_issues: true,
				has_projects: false,
				has_wiki: false,
				allow_squash_merge: true,
				allow_merge_commit: true,
				allow_rebase_merge: false,
				allow_auto_merge: true,
				delete_branch_on_merge: true,
				allow_update_branch: true,
				use_squash_pr_title_as_default: true,
				allow_forking: true,
				web_commit_signoff_required: true,
			});

			console.log(`Updated features for: ${repo.name}`);
		} catch (error) {
			console.log(`Could not update features for: ${repo.name}`);
		}
		// end: patch

		// start: actions/permissions
		try {
			await octokit.request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions`,
				{
					enabled: true,
					allowed_actions: "all",
				}
			);

			console.log(`Updated actions/permissions for: ${repo.name}`);
		} catch (error) {
			console.log(
				`Could not update actions/permissions for: ${repo.name}`
			);
		}
		// end: actions/permissions

		// start: actions/permissions/workflow
		try {
			await octokit.request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions/workflow`,
				{
					default_workflow_permissions: "write",
					can_approve_pull_request_reviews: true,
				}
			);

			console.log(
				`Updated actions/permissions/workflow for: ${repo.name}`
			);
		} catch (error) {
			console.log(
				`Could not update actions/permissions/workflow for: ${repo.name}`
			);
		}
		// end: actions/permissions/workflow

		// start: starred
		try {
			await octokit.request(
				`PUT /user/starred/${repo.owner}/${repo.name}`
			);

			console.log(`Starred repository: ${repo.name}`);
		} catch (error) {
			console.log(`Could not star repository: ${repo.name}`);
		}
		// end: starred

		// start: actions/permissions/access
		try {
			await octokit.request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions/access`,
				{
					access_level: "organization",
				}
			);

			console.log(`Updated actions/permissions/access for: ${repo.name}`);
		} catch (error) {
			console.log(
				`Could not update actions/permissions/access for: ${repo.name}`
			);
		}
		// end: actions/permissions/access
	}
	// end: repos
};
