import t from"fs";import{dirname as u}from"path";import k from"../lib/git-directories.js";import g from"../lib/package-types.js";import h from"../lib/packages.js";import b from"../options/node.js";const D=async m=>{for(const{path:e,name:n,workflow:w}of m)for(const[p,y]of await k(await h())){const o=p+"/.github",i=await w();if(e=="/workflows/"&&n=="node.yml")for(const a of y){const c=u(a).replace(p,""),$=(await t.promises.readFile(a)).toString(),d=(await g()).get(a.split("/").pop());if(typeof d<"u"&&d==="npm"){const s=JSON.parse($);for(const r of["bundledDependencies","peerDependencies","peerDependenciesMeta","dependencies","optionalDependencies","devDependencies","extensionDependencies","bundleDependencies"])typeof s[r]<"u"&&i.add(`
            - uses: actions/setup-node@v3.5.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${c}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${c}
`);for(const r in s)if(Object.prototype.hasOwnProperty.call(s,r)){const f=s[r];if(r=="scripts")for(const l in f)Object.prototype.hasOwnProperty.call(f,l)&&l=="build"&&i.add(`
            - run: pnpm run build
              working-directory: .${c}
`)}}}if(i.size>0){try{await t.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await t.promises.writeFile(`${o}${e}${n}`,`${Array.from(i).join("")}`)}catch{console.log(`Could not create workflow for: ${o}/dependabot.yml`)}}else try{await t.promises.access(`${o}${e}${n}`,t.constants.F_OK);try{await t.promises.rm(`${o}${e}${n}`)}catch{console.log(`Could not remove ${e}${n} for: ${o}`)}}catch{}}};var J=()=>{D(b)};export{J as default};
