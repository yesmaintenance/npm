import { Octokit as o } from "@octokit/core";
import r from "../lib/env.js";
const e=new o({auth:r.GITHUB_AUTH_TOKEN});var a=async(t="")=>{if(typeof t=="string")try{await e.request(`PUT /user/starred/${t.replace("https://github.com/","")}`),console.log(`Starred repository: ${t.replace("https://github.com/","")}`)}catch{console.log(`Could not star repository: ${t}`)}};export { a as default };

