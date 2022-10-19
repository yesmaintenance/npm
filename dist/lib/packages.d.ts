/**
 * It returns a set of all the directories that contain a package.json file
 */
declare const packages: () => Promise<Set<string>>;
export default packages;
