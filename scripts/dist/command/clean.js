import e from"../lib/request.js";import s from"../lib/env.js";const r=s.GITHUB_USER,t=[],a=[],i=async()=>{for(const o of(await e(`GET /users/${r}/repos`)).data)a.push({owner:r,name:o.name});for(const o of(await e(`GET /users/${r}/orgs`)).data){t.push({name:o.login});for(const n of(await e(`GET /orgs/${o.login}/repos`)).data)a.push({owner:o.login,name:n.name})}for(const o of a){for(const n of(await e(`GET /repos/${o.owner}/${o.name}/actions/caches`,{owner:o.owner,repo:o.name})).data.actions_caches)await e(`DELETE /repos/${o.owner}/${o.name}/actions/caches/${n.id}`,{owner:o.owner,repo:o.name,cache_id:n.id});for(const n of(await e(`GET /repos/${o.owner}/${o.name}/actions/runs`,{owner:o.owner,repo:o.name})).data.workflow_runs)await e(`DELETE /repos/${o.owner}/${o.name}/actions/runs/${n.id}`,{owner:o.owner,repo:o.name,run_id:n.id}),await e(`DELETE /repos/${o.owner}/${o.name}/actions/runs/${n.id}/logs`,{owner:o.owner,repo:o.name,run_id:n.id})}};var p=i;export{p as default};