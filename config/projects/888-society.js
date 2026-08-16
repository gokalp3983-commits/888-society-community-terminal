"use strict";
module.exports = {
  "generatedAt": "2026-08-16T19:57:50.569Z",
  "project": {
    "id": "888-society",
    "name": "888 SOCIETY",
    "displayName": "888 SOCIETY",
    "ticker": "$888SOCIETY",
    "version": "1.0.0",
    "description": "888 Society NFT Collection Portal",
    "ecosystem": "Robinhood Chain",
    "promptUser": "888society",
    "promptHost": "robinhood"
  },
  "contracts": {
    "token": "",
    "nft": "0x632b4a985c12b990f4ea22ffa479c7c715e973a7"
  },
  "market": {
    "dexScreenerChainId": "robinhood",
    "blockscoutApiBase": "https://robinhoodchain.blockscout.com/api/v2",
    "refreshMs": 30000,
    "cacheTtlMs": 30000
  },
  "branding": {
    "mascot": "/assets/888-society-mascot.png",
    "mascotAlt": "888 SOCIETY mascot",
    "themeColor": "#020806",
    "colors": {
      "background": "#020806",
      "panel": "#03100b",
      "green": "#39ff14",
      "yellow": "#ff6a00",
      "cyan": "#65dfff",
      "blue": "#68c8ff",
      "orange": "#ff8a00",
      "red": "#ff5a67",
      "muted": "#708a7b",
      "line": "#ff8a00"
    }
  },
  "links": {
    "home": "/",
    "modules": {
      "whales": "/whales",
      "intel": "/intel",
      "nft": "/nft",
      "pulse": "/pulse",
      "timeline": "/timeline"
    },
    "website": "",
    "x": "https://x.com/888s_Society",
    "telegram": "",
    "explorer": "",
    "dexScreener": "",
    "openSea": "https://opensea.io/collection/888-society-605141138",
    "additionalLinks": [
      {
        "label": "DISCORD",
        "text": "Join Discord",
        "url": "https://discord.gg/cme62Pemdm",
        "highlight": false
      }
    ]
  },
  "nft": {
    "collectionName": "888 society",
    "openSeaSlug": "888-society-605141138",
    "standard": "",
    "symbol": "",
    "metadataUriMethod": "",
    "mode": "multiple",
    "mintAt": "2026-08-16T21:08:00+03:00",
    "mintEndAt": null,
    "mintPrice": "",
    "mintLimit": "",
    "mintPhases": [
      {
        "id": "phase-1",
        "label": "ALLOWLIST",
        "name": "I know a guy (team/mods)",
        "startsAt": "2026-08-16T21:08:00+03:00",
        "endsAt": "2026-08-16T22:03:00+03:00",
        "price": "FREE",
        "limit": "1",
        "timezone": "Europe/Istanbul"
      },
      {
        "id": "phase-2",
        "label": "ALLOWLIST",
        "name": "don't embarrASS us. (GTD)",
        "startsAt": "2026-08-16T22:03:00+03:00",
        "endsAt": "2026-08-17T01:36:00+03:00",
        "price": "FREE",
        "limit": "1",
        "timezone": "Europe/Istanbul"
      },
      {
        "id": "phase-3",
        "label": "PUBLIC",
        "name": "the public humiliation",
        "startsAt": "2026-08-17T01:36:00+03:00",
        "endsAt": "2026-08-17T07:36:00+03:00",
        "price": "5.04 USDG",
        "limit": "1",
        "timezone": "Europe/Istanbul"
      }
    ],
    "timezone": "Europe/Istanbul",
    "supply": 8561,
    "whaleThreshold": 10
  },
  "timeline": {
    "createdAt": "2026-08-16T19:57:50.569Z",
    "events": []
  },
  "features": {
    "landing": false,
    "whaleTracker": false,
    "nftTerminal": true,
    "memeIntel": false,
    "communityPulse": false,
    "timeline": false,
    "liveMarket": false
  },
  "moduleOrder": [
    "whales",
    "intel",
    "nft",
    "pulse",
    "timeline"
  ],
  "modules": {
    "whales": {
      "command": "whales",
      "title": "Whale Activity Tracker",
      "description": "Monitor Top-30 whales, DEX activity, and holder rankings.",
      "status": "DISABLED"
    },
    "intel": {
      "command": "intel",
      "title": "Meme Intelligence Portal",
      "description": "Read market pulse, buy pressure, holder behavior, and transparent risk signals.",
      "status": "DISABLED"
    },
    "nft": {
      "command": "nft",
      "title": "888 SOCIETY NFT Portal",
      "description": "NFT whale analytics and collection statistics.",
      "status": "READY"
    },
    "pulse": {
      "command": "pulse",
      "title": "Community Pulse",
      "description": "Synthesize explainable market, holder, whale, fresh-wallet and NFT signals.",
      "status": "DISABLED"
    },
    "timeline": {
      "command": "timeline",
      "title": "Community Timeline",
      "description": "Follow project, NFT and community milestones chronologically.",
      "status": "DISABLED"
    }
  }
};
