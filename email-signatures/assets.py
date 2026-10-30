"""Draws the signature graphics that Outlook cannot render itself (gradients, overlapping
circles, icons) as HTML, for render.js to screenshot into ../public/email/ at 2x.

Run: python3 assets.py && node render.js
"""
import json
import pathlib

OUT = pathlib.Path(__file__).parent
PHOTO = "src/upul.png"
CRIMSON = "#e11d48"
NAVY = "#0a0f1e"

ICONS = {
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "globe": '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    "facebook": '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
}


def svg(name, size, color, stroke=2):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" '
            f'stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round">{ICONS[name]}</svg>')


# Lucide-style triangle echoing the logo mark, used as a faint motif
TRI = ('<svg viewBox="0 0 100 100" style="position:absolute;{pos}" fill="none" stroke="{c}" stroke-width="{w}" '
       'stroke-linejoin="round"><path d="M20 8 L92 50 L20 92 Z"/></svg>')

assets = {}  # name -> (width, height, inner html, transparent)


def add(name, w, h, html, transparent=True):
    assets[name] = (w, h, html, transparent)


# small contact icons, crimson on white and rose on navy
for n in ("phone", "mail", "pin", "globe"):
    add(f"ic-{n}", 16, 16, f'<div style="padding:1px">{svg(n, 14, CRIMSON)}</div>')
    add(f"ic-{n}-dark", 16, 16, f'<div style="padding:1px">{svg(n, 14, "#fb7185")}</div>')

# round social buttons
for n in ("facebook", "linkedin", "globe"):
    add(f"so-{n}", 26, 26, f'<div style="width:26px;height:26px;border-radius:50%;background:{NAVY};display:flex;align-items:center;justify-content:center">{svg(n, 13, "#fff")}</div>')
    add(f"so-{n}-dark", 26, 26, f'<div style="width:26px;height:26px;border-radius:50%;background:#1e293b;display:flex;align-items:center;justify-content:center">{svg(n, 13, "#fff")}</div>')

add("bar-gradient", 600, 4, f'<div style="width:600px;height:4px;background:linear-gradient(90deg,{NAVY} 0%,{NAVY} 35%,{CRIMSON} 100%)"></div>', False)

# 07 Ignite: banner (later sliced so the social icons become separate links)
add("ignite-banner", 600, 150, f'''
<div style="position:relative;width:600px;height:150px;overflow:hidden;
  background:radial-gradient(130% 190% at 100% 0%,{CRIMSON} 0%,#be123c 22%,rgba(190,18,60,.35) 45%,rgba(10,15,30,0) 68%),{NAVY}">
  {TRI.format(pos="width:250px;height:250px;right:-70px;top:-50px;opacity:.16", c="#fff", w=1.2)}
  <img src="../public/email/zeus-logo-white.png" style="position:absolute;left:28px;top:26px;width:150px">
  <div style="position:absolute;right:28px;top:22px;text-align:right;color:#fff;font:700 23px/1.12 Inter;letter-spacing:-.4px">
    Sri Lanka's 24/7<br>technical breakdown<br>specialists</div>
  <div style="position:absolute;left:28px;top:112px;display:flex;gap:8px">
    <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center">{svg("facebook", 15, "#fff")}</div>
    <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center">{svg("linkedin", 15, "#fff")}</div>
    <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center">{svg("globe", 15, "#fff")}</div>
  </div>
</div>''', False)

add("ignite-avatar", 178, 104, f'''
<div style="position:relative;width:178px;height:104px">
  <div style="position:absolute;left:74px;top:2px;width:100px;height:100px;border-radius:50%;background:{NAVY};
    display:flex;align-items:center;justify-content:center;padding-left:14px">{svg("zap", 38, "#fff", 1.6)}</div>
  <div style="position:absolute;left:2px;top:2px;width:100px;height:100px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 3px #fff">
    <img src="{PHOTO}" style="position:absolute;left:-74px;top:-4px;width:200px;height:200px"></div>
</div>''')

# 08 Voltage: portrait with crimson ring on navy
add("voltage-portrait", 140, 140, f'''
<div style="position:relative;width:140px;height:140px;background:{NAVY}">
  <div style="position:absolute;inset:4px;border-radius:50%;border:1px solid #1e293b"></div>
  <div style="position:absolute;inset:10px;border-radius:50%;background:conic-gradient(from 200deg,{CRIMSON},#fb7185,{NAVY} 70%,{CRIMSON})"></div>
  <div style="position:absolute;left:15px;top:15px;width:110px;height:110px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 2px {NAVY}">
    <img src="{PHOTO}" style="position:absolute;left:-82px;top:-5px;width:220px;height:220px"></div>
  <div style="position:absolute;right:10px;bottom:12px;width:34px;height:34px;border-radius:50%;background:{CRIMSON};
    box-shadow:0 0 0 3px {NAVY};display:flex;align-items:center;justify-content:center">{svg("zap", 17, "#fff", 2)}</div>
</div>''', False)

# 10 Portrait Duo: photo panel fading into navy
add("duo-panel", 190, 330, f'''
<div style="position:relative;width:190px;height:330px;overflow:hidden;background:{NAVY}">
  <img src="{PHOTO}" style="position:absolute;left:-150px;top:0;width:390px;height:390px">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,15,30,0) 55%,rgba(10,15,30,.85) 85%,{NAVY} 100%)"></div>
  {TRI.format(pos="width:120px;height:120px;right:-34px;bottom:-26px;opacity:.95", c=CRIMSON, w=5)}
  <div style="position:absolute;left:18px;bottom:18px;color:#fff;font:600 10px/1.4 Inter;letter-spacing:2px;text-transform:uppercase">
    <span style="color:#fb7185">Since</span> 2019</div>
</div>''', False)

# 11 Hotline: zap badge on navy
add("hotline-zap", 44, 44, f'''
<div style="width:44px;height:44px;background:{NAVY};display:flex;align-items:center;justify-content:center">
  <div style="width:34px;height:34px;border-radius:50%;background:{CRIMSON};display:flex;align-items:center;justify-content:center;
    box-shadow:0 0 0 5px rgba(225,29,72,.22)">{svg("zap", 17, "#fff", 2)}</div></div>''', False)

if __name__ == "__main__":
    blocks = "".join(
        f'<div id="{n}" style="width:{w}px;height:{h}px;margin:10px;{"" if t else ""}">{html}</div>'
        for n, (w, h, html, t) in assets.items())
    (OUT / "_assets.html").write_text(
        '<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:transparent;font-family:Inter}</style>'
        f'</head><body>{blocks}</body></html>')
    (OUT / "_assets.json").write_text(json.dumps({n: v[3] for n, v in assets.items()}))
    print("assets", len(assets))
