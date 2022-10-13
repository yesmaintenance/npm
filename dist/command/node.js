import e from"fs";import{dirname as c,resolve as p}from"path";import l from"../lib/directories.js";import d from"../lib/packageTypes.js";var u=async()=>{for(const[t,s]of await l()){const o=t+"/.github";let r=new Set;for(const i of s){const n=c(i).replace(t,""),a=(await d()).get(i.split("/").pop());typeof a<"u"&&a==="npm"&&(r.add((await e.promises.readFile(p("./src/templates/.github/workflows/node"))).toString()),r.add(`
            - run: pnpm install
              working-directory: .${n}
            - run: pnpm run build
              working-directory: .${n}`))}if(r.size>0){try{await e.promises.mkdir(o+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${o}`)}try{await e.promises.writeFile(`${o}/workflows/node.yml`,`${Array.from(r).join(`
`)}
`)}catch{console.log(`Could not create node base for: ${o}`)}}}};export{u as default};
