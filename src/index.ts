import { Command } from "commander";

import dependabot from "./command/dependabot.js";
import edit from "./command/edit-features.js";
import node from "./command/node.js";
import star from "./command/star-used.js";

const program = new Command();

program.name("maintenance").description("Maintenance tools").version("0.0.1");

program
	.command("dependabot")
	.description("Put Dependabot everywhere")
	.action(dependabot);

program
	.command("edit")
	.description("Edit features for all repositories")
	.action(edit);

program
	.command("node")
	.description("Put node into GitHub Actions")
	.action(node);

program
	.command("star")
	.description("Star all my used repositories")
	.action(star);

program.parse();
