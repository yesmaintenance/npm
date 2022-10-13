import n from"fs";import{dirname as a,resolve as m}from"path";import{fileURLToPath as u}from"url";import w from"../lib/directories.js";import y from"../lib/package-types.js";const g=u(import.meta.url),k=a(g);var _=async()=>{for(const[s,p]of await w()){const e=s+"/.github";let r=new Set;for(const o of p){const t=a(o).replace(s,""),d=(await n.promises.readFile(o)).toString(),c=(await y()).get(o.split("/").pop());if(typeof c<"u"&&c==="npm"){const i=JSON.parse(d),l=["bundledDependencies","peerDependencies","peerDependenciesMeta","dependencies","optionalDependencies","devDependencies","extensionDependencies","bundleDependencies"];for(const f of l)i[f],r.add(`
            - uses: pnpm/action-setup@v2.2.3
              with:
                  version: 7.13.4
                  run_install: |
                      - recursive: true
                        args: [
                          --shamefully-hoist=true,
                          --child-concurrency=9999,
                          --network-concurrency=9999,
                          --prefer-frozen-lockfile=false,
                          --strict-peer-dependencies=false,
                          --unsafe-perm=true,
                          --lockfile-only
                        ]
            - uses: actions/setup-node@v3.5.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: '.${t}/pnpm-lock.yaml'
            - run: pnpm install
              working-directory: .${t}`);typeof i.scripts<"u"&&typeof i.scripts.build<"u"&&r.add(`
            - run: pnpm run build
              working-directory: .${t}`)}}if(r.size>0){try{await n.promises.mkdir(e+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${e}`)}try{const o=Array.from([(await n.promises.readFile(m(`${k}/../../src/templates/.github/workflows/node`))).toString(),...r]);await n.promises.writeFile(`${e}/workflows/node.yml`,`${o.join(`
`)}
`)}catch{console.log(`Could not create node base for: ${e}`)}}else try{await n.promises.rm(`${e}/workflows/node.yml`)}catch{console.log(`Could not remove node base for: ${e}`)}}};export{_ as default};
