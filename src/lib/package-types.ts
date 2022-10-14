/**
 * It returns a map of file names to package managers
 * @returns A map of package managers and their configuration files.
 */
const packageTypes = async () => {
	const results = new Map();

	results.set("package.json", "npm");
	results.set("Cargo.toml", "cargo");
	results.set("composer.json", "composer");
	results.set("packages.config", "nuget");
	results.set("*.csproj", "nuget");

	return results;
};

export default packageTypes;
