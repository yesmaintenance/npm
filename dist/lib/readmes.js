import t from"fast-glob";import a from"./env.js";const e=async()=>new Set([...await t(["**/README.md"],{absolute:!0,cwd:a.BASE_DIR})]);var s=e;export{s as default};
