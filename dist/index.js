import { Command as i } from "commander";
import t from "./command/clean.js";
import e from "./command/dependabot.js";
import r from "./command/dispatch.js";
import n from "./command/edit.js";
import a from "./command/node.js";
import m from "./command/squash.js";
import s from "./command/star.js";
const o=new i;o.name("maintenance").description("Maintenance tools"),o.command("clean").description("Clean GitHub repositories.").action(t),o.command("dispatch").argument("[repositories...]","Repositories on which to trigger dispatch events.").description("Trigger dispatch events.").action(r),o.command("squash").description("Squash git commits.").action(m),o.command("dependabot").description("Put Dependabot everywhere.").action(e),o.command("edit").description("Edit features for all repositories.").action(n),o.command("node").description("Put node into GitHub Actions.").action(a),o.command("star").description("Star all my used repositories.").action(s),o.parse();
