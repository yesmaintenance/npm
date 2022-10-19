/**
 * It dispatches all workflows for all repositories for a given user
 * @param {string[]} repositories - string[]
 * @returns the dispatch function.
 */
declare const dispatch: (repositories: string[]) => Promise<void>;
export default dispatch;
