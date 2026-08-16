"use strict";
const express=require("express");
const path=require("path");
const config=require("./config");
const app=express();
const port=Number(process.env.PORT||3000);
const startedAt=new Date();
app.disable("x-powered-by");
app.set("trust proxy",1);
app.use("/ctb-shared",express.static(path.join(__dirname,"ctb-shared"),{maxAge:0}));
app.use((req,res,next)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("X-Frame-Options","SAMEORIGIN");
  res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy","camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Resource-Policy","same-origin");
  next();
});
const healthHandler=(_req,res)=>res.status(200).json({ok:true,status:"healthy",project:config.project.name,version:config.project.version,uptimeSeconds:Math.floor(process.uptime()),timestamp:new Date().toISOString()});
app.get("/health",healthHandler);
app.get("/healthz",healthHandler);
app.get("/status",(req,res)=>res.status(200).json({
  ok:true,
  project:{id:config.project.id,name:config.project.name,ticker:config.project.ticker,version:config.project.version},
  server:{startedAt:startedAt.toISOString(),uptimeSeconds:Math.floor(process.uptime()),environment:process.env.NODE_ENV||"development",port},
  moduleOrder:Array.isArray(config.moduleOrder)?config.moduleOrder:["whales","intel","nft","pulse","timeline"],
  modules:{landing:Boolean(config.features.landing),whales:Boolean(config.features.whaleTracker),intel:Boolean(config.features.memeIntel),nft:Boolean(config.features.nftTerminal),pulse:Boolean(config.features.communityPulse),timeline:Boolean(config.features.timeline),landingMarket:Boolean(config.features.liveMarket)},
  routes:{home:"/",health:"/healthz",healthLegacy:"/health",status:"/status",whales:config.features.whaleTracker?"/whales":null,intel:config.features.memeIntel?"/intel":null,pulse:config.features.communityPulse?"/pulse":null,timeline:config.features.timeline?"/timeline":null,nft:config.features.nftTerminal?(config.nft?.mode==="terminal"?"/nft/terminal":"/nft"):null}
}));
if(config.features.whaleTracker) app.use("/whales",require("./02_Whale-Activity-Tracker/server"));
if(config.features.nftTerminal) app.use("/nft",require("./03_NFT-Collection-Terminal/server"));
if(config.features.memeIntel) app.use("/intel",require("./04_Meme-Intel/server"));
if(config.features.communityPulse) app.use("/pulse",require("./06_Community-Pulse/server"));
if(config.features.timeline) app.use("/timeline",require("./07_Timeline/server"));
if(config.features.landing) app.use("/",require("./01_Landing-Page/server"));
else if(config.features.nftTerminal) app.get("/",(_req,res)=>res.redirect(config.nft?.mode==="terminal"?"/nft/terminal":"/nft"));
app.use((err,req,res,next)=>{
  console.error(`[ ERROR ] ${req.method} ${req.originalUrl}:`,err && err.message ? err.message : err);
  if(res.headersSent) return next(err);
  res.status(500).json({ok:false,error:"INTERNAL_SERVER_ERROR",message:process.env.NODE_ENV==="production"?"The terminal encountered an unexpected error.":String(err && err.message || err)});
});
app.listen(port,"0.0.0.0",()=>{
  console.log(`
[ READY ] ${config.project.name} Community Terminal: http://localhost:${port}`);
  console.log(`[ READY ] Health: http://localhost:${port}/healthz`);
  console.log(`[ READY ] Status: http://localhost:${port}/status`);
  if(config.features.whaleTracker) console.log(`[ READY ] Whale Tracker: http://localhost:${port}/whales`);
  if(config.features.memeIntel) console.log(`[ READY ] Meme Intel: http://localhost:${port}/intel`);
  if(config.features.nftTerminal) console.log(`[ READY ] NFT Terminal: http://localhost:${port}/nft`);
  if(config.features.communityPulse) console.log(`[ READY ] Community Pulse: http://localhost:${port}/pulse`);
  if(config.features.timeline) console.log(`[ READY ] Community Timeline: http://localhost:${port}/timeline`);
  console.log("");
});
