/**
 * It returns a set of all the git repositories in the current directory
 */
declare const gits: () => Promise<Set<string>>;
export default gits;
