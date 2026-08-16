"use strict";
const fs=require("fs");
const path=require("path");
const {execFileSync}=require("child_process");
const config=require("./config");
const checks=[];
function pass(name,ok){if(!ok)throw new Error(`FAIL: ${name}`);checks.push(name);console.log(`[ PASS ] ${name}`)}
pass("active profile",config.project.id==="888-society");
pass("root server",fs.existsSync("server.js"));
pass("Render Blueprint",fs.existsSync("render.yaml"));
pass("environment example",fs.existsSync(".env.example"));
pass("deployment verifier",fs.existsSync("verify-deployment.js"));
pass("release metadata",fs.existsSync("terminal-release.json"));
pass("landing favicon",fs.existsSync(path.join("01_Landing-Page","public","favicon.png"))||fs.readFileSync(path.join("01_Landing-Page","public","index.html"),"utf8").includes("assets/"));
const source=fs.readFileSync("server.js","utf8");
pass("health route",source.includes('app.get("/health"'));
pass("healthz route",source.includes('app.get("/healthz"'));
pass("status route",source.includes('app.get("/status"'));
execFileSync(process.execPath,["--check","server.js"]);
execFileSync(process.execPath,["--check","verify-deployment.js"]);
for(const moduleName of ["01_Landing-Page","02_Whale-Activity-Tracker","03_NFT-Collection-Terminal","04_Meme-Intel","06_Community-Pulse","07_Timeline"])execFileSync(process.execPath,["--check",path.join(moduleName,"server.js")]);
pass("NFT feature state",config.features.nftTerminal===true);
console.log(`
Release validation passed (${checks.length} checks).`);
