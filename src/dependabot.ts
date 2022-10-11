import FastGlob from "fast-glob";
import fs from "fs";
import { dirname } from "path";

import env from "./lib/env.js";

const packageTypes = new Map();

packageTypes.set("package.json", "npm");
packageTypes.set("Cargo.toml", "cargo");
packageTypes.set("composer.json", "composer");
packageTypes.set("packages.config", "nuget");
packageTypes.set("*.csproj", "nuget");

const packages = new Set<string>([
	...(await FastGlob(
		[
			...Array.from(packageTypes.keys()).map(
				(_package) => `**/${_package}`
			),
			"!**/node_modules",
			"!**/target",
			"**/__pycache__/",
			"**/_ReSharper*/",
			"**/_UpgradeReport_Files/",
			"**/!?*.[Cc]ache/",
			"**/!**/[Pp]ackages/build/",
			"**/.fake/",
			"**/.idea/",
			"**/.localhistory/",
			"**/.mfractor/",
			"**/.sass-cache/",
			"**/.vs/",
			"**/[Aa][Rr][Mm]/",
			"**/[Aa][Rr][Mm]64/",
			"**/[Bb]in/",
			"**/[Dd]ebug/",
			"**/[Dd]ebugPS/",
			"**/[Dd]ebugPublic/",
			"**/[Ee]xpress/",
			"**/[Ll]og/",
			"**/[Oo]bj/",
			"**/[Rr]elease/",
			"**/[Rr]eleasePS/",
			"**/[Rr]eleases/",
			"**/[Tt]est[Rr]esult*/",
			"**/#bower_components/",
			"**/#wwwroot/",
			"**/$tf/",
			"**/AppPackages/",
			"**/artifacts/",
			"**/ASALocalRun/",
			"**/AutoTest.Net/",
			"**/Backup*/",
			"**/BenchmarkDotNet.Artifacts/",
			"**/bld/",
			"**/BundleArtifacts/",
			"**/ClientBin/",
			"**/csx/",
			"**/DocProject/buildhelp/",
			"**/ecf/",
			"**/FakesAssemblies/",
			"**/Generated Files/",
			"**/Generated_Code/",
			"**/ipch/",
			"**/node_modules/",
			"**/OpenCover/",
			"**/paket-files/",
			"**/publish/",
			"**/PublishScripts/",
			"**/rcf/",
			"**/ServiceFabricBackup/",
			"**/x64/",
			"**/x86/",
		],
		{
			absolute: true,
			cwd: env.BASE_DIR,
		}
	)),
]);

const walkUntilGit = async (search: string): Promise<string> => {
	const path = dirname(search);
	return fs.existsSync(path + "/.git") ? path : await walkUntilGit(path);
};

const directories = new Map();

for (const _package of packages) {
	const directory = await walkUntilGit(_package);

	if (!directories.has(directory)) {
		directories.set(directory, new Set<string>([_package]));
	} else {
		directories.set(directory, directories.get(directory).add(_package));
	}
}

for (const [directory, packages] of directories) {
	const githubDir = directory + "/.github";

	let dependabotBase = new Set<string>([
		`version: 2
updates:
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
          interval: "daily"
      versioning-strategy: increase`,
	]);

	for (const _package of packages) {
		const packageDirectory = dirname(_package).replace(directory, "");
		const environment = packageTypes.get(_package.split("/").pop());
		dependabotBase.add(`
    - package-ecosystem: "${
		typeof environment !== "undefined"
			? environment
			: (() => {
					switch (_package.split(".").pop()) {
						case "csproj":
							return "nuget";
						default:
							return "npm";
					}
			  })()
	}"
      directory: "${packageDirectory ? packageDirectory : "/"}"
      schedule:
          interval: "daily"
      versioning-strategy: increase`);
	}

	try {
		await fs.promises.mkdir(githubDir + "/workflows", {
			recursive: true,
		});
	} catch {
		console.log(`Could not create: ${githubDir}`);
	}

	try {
		await fs.promises.writeFile(
			`${githubDir}/dependabot.yml`,
			`${Array.from(dependabotBase).join("\n")}\n`
		);
	} catch {
		console.log(`Could not create dependabot base for: ${githubDir}`);
	}

	try {
		await fs.promises.writeFile(
			`${githubDir}/workflows/dependabot.yml`,
			await fs.promises.readFile(
				"../src/template/.github/workflows/dependabot"
			)
		);
	} catch {
		console.log(
			`Could not create dependabot workflows for: ${githubDir}/workflows`
		);
	}
}
