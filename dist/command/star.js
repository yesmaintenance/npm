import p from"fast-glob";import s from"fs";import{dirname as c,resolve as d}from"path";import{fileURLToPath as m}from"url";import f from"../lib/env.js";import l from"../lib/star-repository.js";const g=m(import.meta.url),y=c(g),k=async()=>{const n=JSON.parse((await s.promises.readFile(d(`${y}/../../node_modules/all-the-package-repos/data/packages.json`))).toString()),r=new Set,i=await p(["**/package.json","!**/node_modules"],{absolute:!0,cwd:f.BASE_DIR});for(const t of i){const o=JSON.parse((await s.promises.readFile(t)).toString());for(const e in o)if(Object.prototype.hasOwnProperty.call(o,e)&&(e=="dependencies"||e=="devDependencies"))for(const a in o[e])Object.prototype.hasOwnProperty.call(o[e],a)&&r.add(a)}for(const t of r)l(n[t])};var h=k;export{h as default};
