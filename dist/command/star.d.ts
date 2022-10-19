/**
 * It finds all the package.json files in the project, and then stars all the dependencies in those
 * package.json files
 */
declare const starUsed: () => Promise<void>;
export default starUsed;
