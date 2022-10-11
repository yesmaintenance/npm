import dotenv from "dotenv";
import { z } from "zod";

export default z
	.object({
		GITHUB_USER: z.string(),
		BASE_DIR: z.string(),
		GITHUB_AUTH_TOKEN: z.string(),
	})
	.parse(dotenv.config().parsed);
