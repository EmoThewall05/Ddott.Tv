#!/usr/bin/env python3
"""
ddott_shorts_like_fix_v3.py
Removes ALL coin earning from bindShortLike() — like and super-like are
now purely visual (heart color change, count increment), no coins added.

Usage:
    python3 ddott_shorts_like_fix_v3.py player/shorts.html
"""

import sys

NEW_FN = (
    "function bindShortLike(btn,id,initialLikes){if(!btn)return;"
    "let isPressed=false,pressStart=0,raf=null,likeCount=initialLikes;"
    "const start=()=>{const s0=shortStates.get(id)||{};if(s0.superLiked)return;"
    "isPressed=true;pressStart=Date.now();"
    "btn.classList.add('pressing');const tick=()=>{if(!isPressed)return;"
    "const e=Date.now()-pressStart;if(e>600&&!btn.classList.contains('charging')){"
    "btn.classList.add('charging');if(navigator.vibrate)navigator.vibrate(30);}"
    "raf=requestAnimationFrame(tick);};raf=requestAnimationFrame(tick);};"
    "const end=()=>{if(!isPressed)return;isPressed=false;cancelAnimationFrame(raf);"
    "btn.classList.remove('pressing');"
    "const elapsed=Date.now()-pressStart,wasCharging=btn.classList.contains('charging');"
    "btn.classList.remove('charging');"
    "const state=shortStates.get(id)||{};"
    "if(state.superLiked){shortStates.set(id,state);return;}"
    "if(wasCharging&&elapsed>=600){"
    "state.superLiked=true;state.liked=true;likeCount+=5;"
    "btn.classList.add('super-liked','locked');"
    "btn.querySelector('.s-like-icon').textContent='💛';"
    "btn.querySelector('.sa-count').textContent=fmtNum(likeCount);"
    "showToast('Super Liked! 💛');"
    "if(navigator.vibrate)navigator.vibrate([40,20,40]);}"
    "else if(!state.liked){"
    "state.liked=true;likeCount++;"
    "btn.classList.add('liked');"
    "btn.querySelector('.s-like-icon').textContent='💜';"
    "btn.querySelector('.sa-count').textContent=fmtNum(likeCount);}"
    "shortStates.set(id,state);};"
    "const cancel=()=>{isPressed=false;cancelAnimationFrame(raf);"
    "btn.classList.remove('pressing','charging');};"
    "btn.addEventListener('touchstart',start,{passive:true});"
    "btn.addEventListener('touchend',end);"
    "btn.addEventListener('touchcancel',cancel);"
    "btn.addEventListener('mousedown',start);"
    "btn.addEventListener('mouseup',end);"
    "btn.addEventListener('mouseleave',cancel);}"
)

def find_function_span(html, marker):
    start = html.find(marker)
    if start == -1:
        return None, None
    brace_start = html.find("{", start)
    if brace_start == -1:
        return None, None
    depth = 0
    i = brace_start
    in_string = False
    string_char = ""
    escape = False
    while i < len(html):
        ch = html[i]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == string_char:
                in_string = False
        else:
            if ch in ("'", '"', "`"):
                in_string = True
                string_char = ch
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return start, i + 1
        i += 1
    return None, None


def fix(path):
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    marker = "function bindShortLike("
    start, end = find_function_span(html, marker)

    if start is None:
        print("❌ Could not locate bindShortLike() — marker not found at all.")
        return

    print(f"Found function spanning {end - start} characters.")
    new_html = html[:start] + NEW_FN + html[end:]

    if new_html == html:
        print("⚠️ Replacement identical to original — nothing changed (already patched?).")
        return

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_html)

    print("✅ bindShortLike() updated — NO coin earning anywhere (like or super-like). Saved to:", path)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 ddott_shorts_like_fix_v3.py path/to/shorts.html")
        sys.exit(1)
    fix(sys.argv[1])

