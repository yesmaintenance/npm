import type { CommandOptions } from "commander";
import clean from "../command/clean.js";
import dispatch from "../command/dispatch.js";
import dependabot from "../command/dependabot.js";
import edit from "../command/edit.js";
import node from "../command/node.js";
import readme from "../command/readme.js";
import rust from "../command/rust.js";
import star from "../command/star.js";

const commands: Set<{
	name: string;
	opts?: CommandOptions;
	description?: string;
	arguments?: Set<{
		name: string;
		description?: string;
		defaultValue?: unknown;
	}>;
	action: (...args: any[]) => void | Promise<void>;
}> = new Set([
	{
		name: "clean",
		description: "Clean GitHub repositories",
		action: clean,
	},
	{
		name: "dispatch",
		description: "Trigger dispatch events.",
		arguments: new Set([
			{
				name: "[repositories...]",
				description:
					"Repositories on which to trigger dispatch events.",
			},
		]),
		action: dispatch,
	},
	{
		name: "dependabot",
		description: "Put Dependabot everywhere.",
		action: dependabot,
	},
	{
		name: "edit",
		description: "Edit features for all repositories.",
		action: edit,
	},
	{
		name: "readme",
		description: "Cleanup readmes. Inserts badges.",
		action: readme,
	},
	{
		name: "node",
		description: "Put node into GitHub Actions.",
		action: node,
	},
	{
		name: "rust",
		description: "Put rust into GitHub Actions.",
		action: rust,
	},
	{
		name: "workflows",
		description: "Trigger all workflow tasks.",
		action: async () => {
			await rust();
			await dependabot();
			await node();
		},
	},
	{
		name: "star",
		description: "Star all my used repositories.",
		action: star,
	},
]);

export default commands;
