import e from "fs";
import { dirname as r, resolve as t } from "path";
import { fileURLToPath as a } from "url";
const m=a(import.meta.url),o=r(m),n=new Set([{path:"/",name:"dependabot.yml",workflow:async()=>new Set([(await e.promises.readFile(t(`${o}/../../src/templates/.github/dependabot.yml`))).toString()])},{path:"/workflows/",name:"dependabot.yml",workflow:async()=>new Set([(await e.promises.readFile(t(`${o}/../../src/templates/.github/workflows/dependabot.yml`))).toString()])}]);var p=n;export { p as default };

