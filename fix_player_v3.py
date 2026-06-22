import os

PLAYER_PATH = os.path.expanduser('~/Ddott.Tv/player/player-v3.html')

OLD_SNIPPET = "if(url&&url!=='undefined'){let v=decodeURIComponent(url);if(v.includes('cloudinary.com')&&!v.includes('f_mp4'))v=v.replace('/upload/','/upload/f_mp4,vc_h264,q_auto/');mainVid.src=v;}"

NEW_SNIPPET = "if(url&&url!=='undefined'){let v=safeDecodeUrl(url);if(v.includes('cloudinary.com')&&!v.includes('f_mp4'))v=v.replace('/upload/','/upload/f_mp4,vc_h264,q_auto/');mainVid.src=v;}"

HELPER_FN = "function safeDecodeUrl(raw){let val=raw;for(let i=0;i<3;i++){if(!/%[0-9A-Fa-f]{2}/.test(val))break;try{const d=decodeURIComponent(val);if(d===val)break;val=d;}catch(e){break;}}return val;}\n"

def main():
    if not os.path.exists(PLAYER_PATH):
        print("FILE NOT FOUND: " + PLAYER_PATH)
        return

    with open(PLAYER_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    if NEW_SNIPPET in content:
        print("Already fixed.")
        return

    if OLD_SNIPPET not in content:
        idx = content.find("decodeURIComponent(url)")
        if idx == -1:
            print("Could not find decodeURIComponent(url) at all.")
        else:
            print("NEARBY TEXT:")
            print(content[max(0, idx-150):idx+150])
        return

    content = content.replace(OLD_SNIPPET, NEW_SNIPPET)

    marker = "const FALLBACK="
    if marker not in content:
        print("Could not find marker const FALLBACK=")
        return

    content = content.replace(marker, HELPER_FN + marker, 1)

    with open(PLAYER_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("PATCHED OK")

main()
