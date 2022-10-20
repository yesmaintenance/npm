import type { CommandOptions } from "commander";
declare const commands: Set<{
    name: string;
    opts?: CommandOptions;
    description?: string;
    arguments?: Set<{
        name: string;
        description?: string;
        defaultValue?: unknown;
    }>;
    action: (...args: any[]) => void | Promise<void>;
}>;
export default commands;
