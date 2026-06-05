#!/bin/bash
echo "🚀 Building zip..."
cd ~/Ddott.Tv
zip -r ddott-tv.zip . -x "*.git*" -x "node_modules/*" -x "*.zip" -x "deploy.sh"
cp ddott-tv.zip ~/storage/downloads/ddott-tv.zip
echo "✅ ZIP ready in Downloads!"
echo "📁 Upload to Cloudflare Pages manually"
echo "🌐 https://dash.cloudflare.com → Pages → ddott-tv → Deployments → Upload"
