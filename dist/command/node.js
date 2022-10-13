import t from"fs";import{dirname as a,resolve as p}from"path";import{fileURLToPath as l}from"url";import m from"../lib/directories.js";import d from"../lib/package-types.js";const f=l(import.meta.url),u=a(f);var v=async()=>{for(const[n,c]of await m()){const e=n+"/.github";let r=new Set;for(const i of c){const o=a(i).replace(n,""),s=(await d()).get(i.split("/").pop());typeof s<"u"&&s==="npm"&&(r.add((await t.promises.readFile(p(`${u}/../../src/templates/.github/workflows/node`))).toString()),r.add(`
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
                  cache-dependency-path: |
                      **/pnpm-lock.yaml
                  working-directory: .${o}
            - run: pnpm install
              working-directory: .${o}
            - run: pnpm run build
              working-directory: .${o}`))}if(r.size>0){try{await t.promises.mkdir(e+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${e}`)}try{await t.promises.writeFile(`${e}/workflows/node.yml`,`${Array.from(r).join(`
`)}
`)}catch{console.log(`Could not create node base for: ${e}`)}}}};export{v as default};
