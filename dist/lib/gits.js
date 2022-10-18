import t from "fast-glob";
import o from "./env.js";
const e=async()=>new Set([...await t(["**/.git"],{absolute:!0,cwd:o.BASE_DIR})]);var i=e;export { i as default };

