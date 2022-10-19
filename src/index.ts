import { Command } from "commander";

import clean from "./command/clean.js";
import dependabot from "./command/dependabot.js";
import dispatch from "./command/dispatch.js";
import edit from "./command/edit.js";
import node from "./command/node.js";
import rust from "./command/rust.js";
import squash from "./command/squash.js";
import star from "./command/star.js";

const program = new Command();

program.name("maintenance").description("Maintenance tools");

program
	.command("clean")
	.description("Clean GitHub repositories.")
	.action(clean);

program
	.command("dispatch")
	.argument(
		"[repositories...]",
		"Repositories on which to trigger dispatch events."
	)
	.description("Trigger dispatch events.")
	.action(dispatch);

program.command("squash").description("Squash git commits.").action(squash);

program
	.command("dependabot")
	.description("Put Dependabot everywhere.")
	.action(dependabot);

program
	.command("edit")
	.description("Edit features for all repositories.")
	.action(edit);

program
	.command("node")
	.description("Put node into GitHub Actions.")
	.action(node);

program
	.command("rust")
	.description("Put rust into GitHub Actions.")
	.action(rust);

program
	.command("workflows")
	.description("Trigger all workflow tasks.")
	.action(async () => {
		await rust();
		await dependabot();
		await node();
	});

program
	.command("star")
	.description("Star all my used repositories.")
	.action(star);

program.parse();
