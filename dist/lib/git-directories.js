import r from "./walk-until-git.js";
const n=async i=>{const t=new Map;for(const s of i){const e=await r(s);t.has(e)?t.set(e,t.get(e).add(s)):t.set(e,new Set([s]))}return t};var a=n;export { a as default };

