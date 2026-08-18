#!/usr/bin/env python3
import sys

TARGET = "/data/data/com.termux/files/home/Ddott.Tv/community/index.html"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

if "255,140,0" in content and "emomulti-cta" in content:
    print("Already patched with orange color. No changes made.")
    sys.exit(0)

old = '''  <div class="emomulti-cta" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,rgba(0,245,255,0.08),rgba(180,0,255,0.08));border:1px solid rgba(0,245,255,0.25);margin-bottom:12px;">
    <div style="font-size:26px;">🦋</div>
    <div style="flex:1;min-width:0;">
      <div style="font-family:'Orbitron',monospace;font-size:11px;color:var(--cyan);letter-spacing:0.5px;margin-bottom:3px;">EMOMULTI AI STUDIO</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.3;">25+ AI providers, one vault — part of the Dwin Universe</div>
    </div>
    <a href="https://emomulti-ai.emothewall.online" style="flex-shrink:0;padding:9px 14px;border-radius:10px;background:linear-gradient(135deg,var(--cyan),var(--purple));color:var(--dark);font-family:'Orbitron',monospace;font-size:9px;font-weight:900;letter-spacing:0.5px;text-decoration:none;">OPEN</a>
    <a href="https://drive.google.com/file/d/1Nkdv8dnPeo8ThOoEOKcViqdBGfh3m1U_/view?usp=drivesdk" style="flex-shrink:0;padding:9px 12px;border-radius:10px;background:rgba(0,245,255,0.1);border:1px solid rgba(0,245,255,0.3);color:var(--cyan);font-family:'Orbitron',monospace;font-size:9px;font-weight:900;letter-spacing:0.5px;text-decoration:none;">⬇ APK</a>
  </div>'''

new = '''  <div class="emomulti-cta" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,rgba(255,140,0,0.1),rgba(255,255,255,0.05));border:1px solid rgba(255,140,0,0.3);margin-bottom:12px;">
    <div style="font-size:26px;">🦋</div>
    <div style="flex:1;min-width:0;">
      <div style="font-family:'Orbitron',monospace;font-size:11px;color:#ff8c00;letter-spacing:0.5px;margin-bottom:3px;">EMOMULTI AI STUDIO</div>
      <div style="font-size:11px;color:#e8e8e8;line-height:1.3;">25+ AI providers, one vault — part of the Dwin Universe</div>
    </div>
    <a href="https://emomulti-ai.emothewall.online" style="flex-shrink:0;padding:9px 14px;border-radius:10px;background:linear-gradient(135deg,#ff8c00,#ffffff);color:#1a0f00;font-family:'Orbitron',monospace;font-size:9px;font-weight:900;letter-spacing:0.5px;text-decoration:none;">OPEN</a>
    <a href="https://drive.google.com/file/d/1Nkdv8dnPeo8ThOoEOKcViqdBGfh3m1U_/view?usp=drivesdk" style="flex-shrink:0;padding:9px 12px;border-radius:10px;background:rgba(255,140,0,0.15);border:1px solid rgba(255,140,0,0.4);color:#ffffff;font-family:'Orbitron',monospace;font-size:9px;font-weight:900;letter-spacing:0.5px;text-decoration:none;">⬇ APK</a>
  </div>'''

if old not in content:
    print("ERROR: anchor not found. Please check the file manually.")
    sys.exit(1)

content = content.replace(old, new, 1)

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched: EmoMulti CTA card recolored to orange/white theme.")
