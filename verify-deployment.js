"use strict";
const raw=process.argv[2]||process.env.TERMINAL_PUBLIC_URL;
if(!raw){console.error("Usage: npm run test:deployed -- https://YOUR-TERMINAL.onrender.com");process.exit(2)}
const base=raw.replace(/\/$/,"");
const expected={"whales":false,"intel":false,"pulse":false,"timeline":false,"nft":true};
const timeoutMs=Number(process.env.ACCEPTANCE_TIMEOUT_MS||30000);
function pass(x){console.log(`[ PASS ] ${x}`)}
function check(ok,x){if(!ok)throw new Error(x);pass(x)}
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function get(path,attempts=5){let lastError;for(let attempt=1;attempt<=attempts;attempt+=1){const c=new AbortController();const t=setTimeout(()=>c.abort(),timeoutMs);try{const response=await fetch(`${base}${path}`,{redirect:"follow",signal:c.signal});const transient=(response.status===404&&response.headers.get("x-render-routing")==="no-server")||[502,503,504].includes(response.status);if(!transient)return response;lastError=new Error(`${path} returned HTTP ${response.status}`)}catch(error){lastError=error}finally{clearTimeout(t)}if(attempt<attempts){console.log(`[ RETRY ] ${path} attempt ${attempt}/${attempts}`);await sleep(3000)}}throw lastError}
(async()=>{
 console.log(`[ ACCEPTANCE ] Public terminal: ${base}`);
 const home=await get("/");check(home.status===200,"Root route returned HTTP 200");const html=await home.text();check(html.length>100,"Root route returned content");check(home.headers.get("x-content-type-options")==="nosniff","Security headers present");
 const health=await get("/healthz");check(health.status===200,"/healthz returned HTTP 200");const h=await health.json();check(h.ok===true&&h.status==="healthy","/healthz is healthy");
 const status=await get("/status");check(status.status===200,"/status returned HTTP 200");const s=await status.json();check(s.ok===true,"/status returned ok:true");check(s.modules.whales===expected.whales&&s.modules.intel===expected.intel&&s.modules.pulse===expected.pulse&&s.modules.timeline===expected.timeline&&s.modules.nft===expected.nft,"Mounted modules match generated profile");
 for(const [name,on] of Object.entries(expected)){if(!on)continue;const r=await get(`/${name}`);check(r.status===200,`/${name} returned HTTP 200`)}
 console.log("\n[ ACCEPTED ] Public terminal deployment passed current release checks.");
})().catch(e=>{console.error(`\n[ FAIL ] ${e.name==="AbortError"?`Timed out after ${timeoutMs}ms`:e.message}`);process.exit(1)});
