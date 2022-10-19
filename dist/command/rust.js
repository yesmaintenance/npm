import a from"fs";import{dirname as l,basename as w}from"path";import $ from"../lib/git-directories.js";import d from"../lib/package-types.js";import g from"../lib/packages.js";import u from"../options/rust.js";const y=async n=>{for(const{path:o,name:t,workflow:f}of n)for(const[i,m]of await $(await g())){const r=i+"/.github",e=await f();if(o=="/workflows/"&&t=="rust.yml")for(const s of m){const p=l(s).replace(i,""),c=(await d()).get(s.split("/").pop());typeof c<"u"&&c==="cargo"&&e.add(`
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${p}/${w(s)}
`)}if(e.size>1){try{await a.promises.mkdir(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await a.promises.writeFile(`${r}${o}${t}`,`${Array.from(e).join("")}`)}catch{console.log(`Could not create workflow for: ${r}/dependabot.yml`)}}else try{await a.promises.access(`${r}${o}${t}`,a.constants.F_OK);try{await a.promises.rm(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var F=async()=>{await y(u)};export{F as default};
