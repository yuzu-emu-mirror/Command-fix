#!/bin/bash -e

yarn

[ -d "dist" ] && rm -rf dist

yarn run build

echo "[+] Installing non-bundle-able packages ..."
# DISCORD_JS="$(grep discord.js package.json | sed 's|,||')"
cd "dist"
echo "{\"name\": \"citra-discord-bot\",\"license\": \"GPL-2.0+\",\"dependencies\": {}}" > package.json
yarn install
