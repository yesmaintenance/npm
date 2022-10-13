export default async () => {
	const packageTypes = new Map();

	packageTypes.set("package.json", "npm");
	packageTypes.set("Cargo.toml", "cargo");
	packageTypes.set("composer.json", "composer");
	packageTypes.set("packages.config", "nuget");
	packageTypes.set("*.csproj", "nuget");

	return packageTypes;
};
