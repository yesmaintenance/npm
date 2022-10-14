import dotenv from "dotenv";
import { cwd } from "process";
import { z } from "zod";

const env = dotenv.config();

export default z
	.object({
		GITHUB_USER: z.string().default(""),
		BASE_DIR: z.string().default(cwd()),
		GITHUB_AUTH_TOKEN: z.string().default(""),
	})
	.parse(env.error ? {} : env.parsed);
