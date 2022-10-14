import t from"fs";import{dirname as l}from"path";import d from"../lib/git-directories.js";import $ from"../lib/package-types.js";import w from"../lib/packages.js";import g from"../options/dependabot.js";const y=async p=>{for(const{path:o,name:r,workflow:m}of p)for(const[s,f]of await d(await w())){const e=s+"/.github",a=await m();if(o=="/")for(const i of f){const c=l(i).replace(s,""),n=(await $()).get(i.split("/").pop());a.add(`
    - package-ecosystem: "${typeof n<"u"?n:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: increase`)}if(a.size>0){try{await t.promises.mkdir(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await t.promises.writeFile(`${e}${o}${r}`,`${Array.from(a).join(`
`)}`)}catch{console.log(`Could not create workflow for: ${e}/dependabot.yml`)}}else try{await t.promises.access(`${e}${o}${r}`,t.constants.F_OK);try{await t.promises.rm(`${e}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${e}`)}}catch{}}};var j=()=>{y(g)};export{j as default};
