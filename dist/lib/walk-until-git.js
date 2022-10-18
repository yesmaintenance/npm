import n from "fs";
import { dirname as s } from "path";
const i=async r=>{const t=s(r);return n.existsSync(t+"/.git")?t:await i(t)};var e=i;export { e as default };

