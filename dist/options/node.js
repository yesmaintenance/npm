import o from "fs";
import { dirname as e, resolve as r } from "path";
import { fileURLToPath as t } from "url";
const m=t(import.meta.url),i=e(m),n=new Set([{path:"/workflows/",name:"node.yml",workflow:async()=>new Set([(await o.promises.readFile(r(`${i}/../../src/templates/.github/workflows/node.yml`))).toString()])}]);var f=n;export { f as default };

