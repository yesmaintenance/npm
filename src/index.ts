import { Command } from "commander";

import commands from "./options/commands.js";

const program = new Command();

program.name("maintenance").description("Maintenance tools");

commands?.forEach((command) => {
	program
		.command(command.name)
		.description(
			typeof command.description !== "undefined"
				? command.description
				: ""
		)
		.action(command.action);

	command.arguments?.forEach((argument) =>
		program.argument(argument.name, argument.description)
	);
});

program.parse();
