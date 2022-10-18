import o from "dotenv";
import { cwd as e } from "process";
import { z as r } from "zod";
const t=o.config();var n=r.object({GITHUB_USER:r.string().default(""),BASE_DIR:r.string().default(e()),GITHUB_AUTH_TOKEN:r.string().default("")}).parse(t.error?{}:t.parsed);export { n as default };

