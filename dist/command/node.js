import r from"fs";import{dirname as c,resolve as d}from"path";import{fileURLToPath as f}from"url";import m from"../lib/directories.js";import u from"../lib/package-types.js";const w=f(import.meta.url),y=c(w);var b=async()=>{for(const[s,p]of await m()){const e=s+"/.github";let n=new Set;for(const o of p){const i=c(o).replace(s,""),l=(await r.promises.readFile(o)).toString(),a=(await u()).get(o.split("/").pop());if(typeof a<"u"&&a==="npm"){const t=JSON.parse(l);(typeof t.dependencies<"u"||typeof t.devDependencies<"u")&&n.add(`
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
                  cache-dependency-path: '.${i}/pnpm-lock.yaml'
            - run: pnpm install
              working-directory: .${i}`),typeof t.scripts<"u"&&typeof t.scripts.build<"u"&&n.add(`
            - run: pnpm run build
              working-directory: .${i}`)}}if(n.size>0){try{await r.promises.mkdir(e+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${e}`)}try{const o=Array.from([(await r.promises.readFile(d(`${y}/../../src/templates/.github/workflows/node`))).toString(),...n]);await r.promises.writeFile(`${e}/workflows/node.yml`,`${o.join(`
`)}
`)}catch{console.log(`Could not create node base for: ${e}`)}}else try{await r.promises.rm(`${e}/workflows/node.yml`)}catch{console.log(`Could not remove node base for: ${e}`)}}};export{b as default};
