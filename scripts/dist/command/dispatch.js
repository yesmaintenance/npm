import i from"../lib/env.js";import e from"../lib/request.js";const p=async(t=[])=>{const n=i.GITHUB_USER,f=[],a=[];for(const o of(await e(`GET /users/${n}/repos`))?.data)a.push({owner:n,name:o.name});for(const o of(await e(`GET /users/${n}/orgs`))?.data){f.push({name:o.login});for(const r of(await e(`GET /orgs/${o.login}/repos`))?.data)a.push({owner:o.login,name:r.name})}let s;for(const o of a){for(const r of t)o.name===r?s=!0:s=!1;if(typeof s>"u"||s)for(const r of(await e(`GET /repos/${o.owner}/${o.name}/actions/workflows`,{owner:o.owner,repo:o.name}))?.data?.workflows)await e(`POST /repos/${o.owner}/${o.name}/actions/workflows/${r.id}/dispatches`,{ref:"main"})}};var c=p;export{c as default};
