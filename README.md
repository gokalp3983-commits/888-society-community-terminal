# 888 SOCIETY Community Terminal

Generated with Community Terminal Builder **v1.3.2-b**.

Release metadata: `terminal-release.json`

Built by Gokalp — X: @Gokalp8339 (https://x.com/Gokalp8339)

## Release provenance

- Builder: v1.3.2-b
- Config schema: v1
- Terminal engine: v1.0.0
- Release status: deployment-ready

## Local run

From this root folder:

```bash
npm install
npm start
```

Open **http://localhost:3000**.

Validate the generated package before launch:

```bash
npm test
```

## Enabled routes

- Landing Page: / (disabled — root redirects to NFT) 
- Whale Tracker: /whales (disabled)
- Meme Intel: /intel (disabled)
- Community Pulse: /pulse (disabled)
- Community Timeline: /timeline (disabled)
- NFT Terminal: /nft (enabled)
- Render health check: /healthz
- Legacy health alias: /health
- Runtime status: /status

All enabled pages share one Node server and one port.

## Render deployment

1. Extract this folder and test it locally.
2. Create a GitHub repository and push the complete folder.
3. In Render, create a new **Blueprint** and select the repository.
4. Render reads `render.yaml`, installs dependencies, starts the server, and checks `/healthz`.
5. After deployment, open your Render URL. Internal routes remain relative, so they work on the public domain automatically.

The generated `.env.example` documents optional local environment variables. Do not commit private secrets to the project.

## Public acceptance test

After deployment, verify the real public URL from this root folder:

```bash
npm run test:deployed -- https://YOUR-TERMINAL.onrender.com
```

This checks the Landing Page, security headers, `/healthz`, `/status`, and every enabled module route. Free hosting may cold-start, so the acceptance tool allows a 30-second response window by default.
