export interface containers
	extends Set<{
		path: string;
		name: string;
		workflow: () => Promise<Set<string>>;
	}> {}
