import o from"fs";import{dirname as n,resolve as p}from"path";import d from"../lib/directories.js";import l from"../lib/packageTypes.js";var w=async()=>{for(const[r,c]of await d()){const e=r+"/.github";let a=new Set([`version: 2
	updates:
		- package-ecosystem: "github-actions"
		  directory: "/"
		  schedule:
			  interval: "daily"`]);for(const t of c){const i=n(t).replace(r,""),s=(await l()).get(t.split("/").pop());a.add(`
		- package-ecosystem: "${typeof s<"u"?s:(()=>{switch(t.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
		  directory: "${i||"/"}"
		  schedule:
			  interval: "daily"
		  versioning-strategy: increase`)}try{await o.promises.mkdir(e+"/workflows",{recursive:!0})}catch{console.log(`Could not create: ${e}`)}try{await o.promises.writeFile(`${e}/dependabot.yml`,`${Array.from(a).join(`
`)}
`)}catch{console.log(`Could not create dependabot base for: ${e}`)}try{await o.promises.writeFile(`${e}/workflows/dependabot.yml`,await o.promises.readFile(p("./src/templates/.github/workflows/dependabot")))}catch{console.log(`Could not create dependabot workflows for: ${e}`)}}};export{w as default};
