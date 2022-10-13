import t from"dotenv";import{z as r}from"zod";var i=r.object({GITHUB_USER:r.string(),BASE_DIR:r.string(),GITHUB_AUTH_TOKEN:r.string()}).parse(t.config().parsed);export{i as default};
