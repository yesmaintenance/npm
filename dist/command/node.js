import t from"fs";import{dirname as a,resolve as p}from"path";import{fileURLToPath as l}from"url";import m from"../lib/directories.js";import d from"../lib/package-types.js";const f=l(import.meta.url),u=a(f);var $=async()=>{for(const[n,c]of await m()){const r=n+"/.github";let o=new Set;for(const i of c){const e=a(i).replace(n,""),s=(await d()).get(i.split("/").pop());typeof s<"u"&&s==="npm"&&(o.add((await t.promises.readFile(p(`${u}/../../src/templates/.github/workflows/node`))).toString()),o.add(`
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
                  dest: .${e}
            - uses: actions/setup-node@v3.5.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: |
                      .${e}/pnpm-lock.yaml
                  working-directory: .${e}
            - run: pnpm install
              working-directory: .${e}
            - run: pnpm run build
              working-directory: .${e}`))}if(o.size>0){try{await t.promises.mkdir(r+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${r}`)}try{await t.promises.writeFile(`${r}/workflows/node.yml`,`${Array.from(o).join(`
`)}
`)}catch{console.log(`Could not create node base for: ${r}`)}}}};export{$ as default};
