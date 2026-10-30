"""Builds Outlook-safe HTML email signatures for Zeus Power International.

Every signature is a nested <table> with inline styles only (no CSS classes, flexbox,
web fonts or background images) so it survives Outlook desktop's Word renderer.
"""
import pathlib

OUT = pathlib.Path(__file__).parent
HOSTED = "https://www.zeuspower.lk/email/"  # upload email-assets/* here before use
LOCAL = "../public/email/"

CRIMSON = "#e11d48"
NAVY = "#0a0f1e"
INK = "#0f172a"
INK2 = "#475569"
INK3 = "#64748b"
LINE = "#e2e8f0"
FONT = "'Segoe UI', Arial, Helvetica, sans-serif"

P = {
    "name": "Upul Eranga",
    "title": "Project Engineer",
    "company": "Zeus Power International (Pvt) Ltd",
    "phone": "+94 70 303 7037",
    "phone_href": "tel:+94703037037",
    "email": "upule@iial.lk",
    "web": "www.zeuspower.lk",
    "web_href": "https://www.zeuspower.lk",
    "address": "655/1, Gunathilaka Gardens, Elvitigala Mawatha, Colombo 05",
    "maps": "https://www.google.com/maps/search/?api=1&query=655%2F1+Gunathilaka+Gardens+Elvitigala+Mawatha+Colombo+05+Sri+Lanka",
}


def a(href, text, color=INK2, weight="normal"):
    return (f'<a href="{href}" style="color:{color};text-decoration:none;font-weight:{weight};">{text}</a>')


def contact_rows(color=INK2, label=CRIMSON, address=True, size=13):
    rows = [
        ("T", a(P["phone_href"], P["phone"], color)),
        ("E", a("mailto:" + P["email"], P["email"], color)),
        ("W", a(P["web_href"], P["web"], color)),
    ]
    if address:
        rows.append(("A", a(P["maps"], P["address"], color)))
    html = ""
    for lab, val in rows:
        html += (
            f'<tr><td style="padding:2px 10px 2px 0;font-family:{FONT};font-size:11px;font-weight:bold;'
            f'color:{label};letter-spacing:1px;vertical-align:top;line-height:18px;">{lab}</td>'
            f'<td style="padding:2px 0;font-family:{FONT};font-size:{size}px;color:{color};line-height:18px;">{val}</td></tr>'
        )
    return f'<table cellpadding="0" cellspacing="0" border="0" role="presentation">{html}</table>'


def name_block(name_color=NAVY, title_color=CRIMSON, company_color=INK3, size=21):
    return (
        f'<div style="font-family:{FONT};font-size:{size}px;font-weight:bold;color:{name_color};line-height:26px;letter-spacing:-0.2px;">{P["name"]}</div>'
        f'<div style="font-family:{FONT};font-size:11px;font-weight:bold;color:{title_color};letter-spacing:2px;text-transform:uppercase;line-height:18px;padding-top:2px;">{P["title"]}</div>'
        f'<div style="font-family:{FONT};font-size:13px;color:{company_color};line-height:18px;padding-top:2px;">{P["company"]}</div>'
    )


def img(src, w, h, alt, style=""):
    return (f'<img src="{{BASE}}{src}" width="{w}" height="{h}" alt="{alt}" '
            f'style="display:block;border:0;outline:none;width:{w}px;height:{h}px;{style}">')


def logo(w=150, white=False):
    h = round(w * 158 / 440)
    return a(P["web_href"], img("zeus-logo-white.png" if white else "zeus-logo-dark.png", w, h, "Zeus Power International"))


def table(inner, extra=""):
    return (f'<table cellpadding="0" cellspacing="0" border="0" role="presentation" '
            f'style="border-collapse:collapse;{extra}">{inner}</table>')


# 1 ─ Signature: round photo, crimson rule, details, logo footer
def v1():
    return table(
        f'<tr><td style="vertical-align:top;padding-right:18px;">{img("upul-round.png", 96, 96, P["name"])}</td>'
        f'<td style="width:3px;background:{CRIMSON};font-size:0;line-height:0;">&nbsp;</td>'
        f'<td style="vertical-align:top;padding-left:18px;">{name_block()}'
        f'<div style="height:12px;line-height:12px;font-size:0;">&nbsp;</div>{contact_rows()}</td></tr>'
        f'<tr><td colspan="3" style="padding-top:16px;"><div style="border-top:1px solid {LINE};height:1px;line-height:1px;font-size:0;">&nbsp;</div></td></tr>'
        f'<tr><td colspan="3" style="padding-top:12px;">'
        + table(f'<tr><td style="vertical-align:middle;">{logo(140)}</td>'
                f'<td style="vertical-align:middle;padding-left:20px;font-family:{FONT};font-size:11px;color:{INK3};letter-spacing:1.5px;text-transform:uppercase;line-height:16px;">'
                f'<span style="color:{CRIMSON};font-weight:bold;">24/7</span> Emergency breakdown response</td></tr>')
        + '</td></tr>')


# 2 ─ Midnight: navy card, portrait photo, white logo
def v2():
    return table(
        f'<tr><td style="vertical-align:middle;padding:18px 0 18px 18px;background:{NAVY};">{img("upul-portrait.jpg", 112, 140, P["name"], f"border-bottom:3px solid {CRIMSON};")}</td>'
        f'<td style="vertical-align:middle;padding:16px 24px 14px 22px;background:{NAVY};">'
        f'{name_block("#ffffff", "#fb7185", "#b4bfcf", 21)}'
        f'<div style="width:36px;height:2px;background:{CRIMSON};line-height:2px;font-size:0;margin:10px 0 10px 0;">&nbsp;</div>'
        f'{contact_rows("#e2e8f0", "#fb7185", address=False)}</td>'
        f'<td style="vertical-align:middle;padding:0 24px;background:{NAVY};border-left:1px solid #1e293b;">{logo(130, white=True)}</td></tr>',
        f"background:{NAVY};")


# 3 ─ Executive: no photo, name-led, two zones split by hairline
def v3():
    return table(
        f'<tr><td colspan="3" style="padding-bottom:12px;">{name_block(size=23)}</td></tr>'
        f'<tr><td colspan="3" style="padding-bottom:14px;"><div style="width:48px;height:2px;background:{CRIMSON};line-height:2px;font-size:0;">&nbsp;</div></td></tr>'
        f'<tr><td style="vertical-align:top;padding-right:26px;">{contact_rows()}</td>'
        f'<td style="width:1px;background:{LINE};font-size:0;line-height:0;">&nbsp;</td>'
        f'<td style="vertical-align:middle;padding-left:26px;">{logo(150)}'
        f'<div style="font-family:{FONT};font-size:10px;color:{INK3};letter-spacing:1px;text-transform:uppercase;padding-top:8px;line-height:14px;">'
        f'An IIAL company &middot; Est. 1992</div></td></tr>')


# 4 ─ Logo lead: no photo, brand mark first
def v4():
    return table(
        f'<tr><td style="vertical-align:middle;padding-right:24px;">{logo(170)}</td>'
        f'<td style="width:2px;background:{CRIMSON};font-size:0;line-height:0;">&nbsp;</td>'
        f'<td style="vertical-align:top;padding-left:24px;">{name_block()}'
        f'<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>{contact_rows(address=False)}</td></tr>')


# 5 ─ Service banner: photo + details, navy services strip
def v5():
    services = " &nbsp;&middot;&nbsp; ".join(["Electrical", "Fire protection", "Air conditioning", "Solar"])
    emergency = (f'<tr><td style="padding:2px 10px 2px 0;font-family:{FONT};font-size:11px;font-weight:bold;color:{CRIMSON};letter-spacing:1px;line-height:18px;">24/7</td>'
                 f'<td style="padding:2px 0;font-family:{FONT};font-size:13px;color:{INK2};line-height:18px;">Emergency breakdown support</td></tr>')
    contacts = contact_rows(address=False).replace("</table>", emergency + "</table>")
    return table(
        f'<tr><td style="padding:0 0 16px 0;">'
        + table(f'<tr><td style="vertical-align:middle;padding-right:18px;">{img("upul-round.png", 84, 84, P["name"])}</td>'
                f'<td style="vertical-align:middle;padding-right:24px;">{name_block()}</td>'
                f'<td style="vertical-align:middle;padding-left:22px;border-left:1px solid {LINE};">{contacts}</td></tr>')
        + '</td></tr>'
        f'<tr><td style="background:{NAVY};padding:0;">'
        + table(f'<tr><td style="width:6px;background:{CRIMSON};font-size:0;line-height:0;">&nbsp;</td>'
                f'<td style="padding:11px 20px;vertical-align:middle;">{logo(100, white=True)}</td>'
                f'<td style="padding:11px 20px 11px 0;vertical-align:middle;text-align:right;font-family:{FONT};font-size:10px;color:#b4bfcf;letter-spacing:1.4px;text-transform:uppercase;line-height:16px;">{services}</td></tr>', "width:100%;")
        + '</td></tr>')


# 6 ─ Compact: no photo, for replies and forwards
def v6():
    dot = f'<span style="color:{CRIMSON};">&nbsp;&nbsp;|&nbsp;&nbsp;</span>'
    return table(
        f'<tr><td style="vertical-align:middle;padding-right:18px;border-right:2px solid {CRIMSON};">{logo(96)}</td>'
        f'<td style="vertical-align:middle;padding-left:18px;font-family:{FONT};line-height:19px;">'
        f'<span style="font-size:15px;font-weight:bold;color:{NAVY};">{P["name"]}</span>'
        f'<span style="font-size:13px;color:{INK3};">&nbsp;&nbsp;{P["title"]}, Zeus Power International</span><br>'
        f'<span style="font-size:13px;">{a(P["phone_href"], P["phone"])}{dot}{a("mailto:" + P["email"], P["email"])}{dot}{a(P["web_href"], P["web"])}</span>'
        f'</td></tr>')


VARIANTS = [
    ("01-signature", "Signature", "With photo", "Round portrait, crimson rule and a logo footer. The all-round default.", v1),
    ("02-midnight", "Midnight", "With photo", "Navy card with the portrait full-bleed and the white logo. The boldest option.", v2),
    ("03-executive", "Executive", "No photo", "Name-led and typographic, details and brand split by a hairline.", v3),
    ("04-logo-lead", "Logo Lead", "No photo", "The brand mark leads, details follow. Clean and corporate.", v4),
    ("05-service-banner", "Service Banner", "With photo", "Photo and details over a navy strip with services and the 24/7 line.", v5),
    ("06-compact", "Compact", "No photo", "Two lines for replies and forwards.", v6),
]


def standalone(body, base):
    return (f'<!doctype html><html><head><meta charset="utf-8"><title>{P["name"]} signature</title></head>'
            f'<body style="margin:0;padding:24px;background:#ffffff;">{body.replace("{BASE}", base)}</body></html>')


def board():
    pages = []
    cover = (
        '<section class="page cover"><div class="inner">'
        f'<img src="{LOCAL}zeus-logo-white.png" style="width:220px;">'
        '<div class="kicker">Email signature concepts</div>'
        f'<h1>{P["name"]}<br><span>{P["title"]}</span></h1>'
        f'<p>Six directions for Outlook: three with a portrait, three without. Every version is built as live HTML, so the '
        f'phone number, email and website stay clickable and the text stays sharp on any screen.</p>'
        '</div></section>')
    pages.append(cover)
    for i, (slug, title, kind, desc, fn) in enumerate(VARIANTS, 1):
        sig = fn().replace("{BASE}", LOCAL)
        pages.append(
            '<section class="page"><div class="head">'
            f'<div><div class="num">{i:02d}</div><h2>{title}</h2><div class="desc">{desc}</div></div>'
            f'<div class="tag {"photo" if kind == "With photo" else ""}">{kind}</div></div>'
            '<div class="mail"><div class="bar"><span></span><span></span><span></span><em>New message</em></div>'
            '<div class="meta"><b>To</b> client@example.com<br><b>Subject</b> Preventive maintenance schedule, November</div>'
            '<div class="body"><p>Hi,</p><p>Please find the updated maintenance schedule attached. Let me know if any of the dates need to move.</p>'
            f'<p style="margin-bottom:22px;">Kind regards,</p><div id="sig-{slug}" class="sig">{sig}</div></div></div></section>')
    css = f"""
    @page {{ size: 1280px 800px; margin: 0; }}
    * {{ box-sizing: border-box; }}
    body {{ margin:0; font-family: Inter, Arial, sans-serif; background:#eceff3; }}
    .sig, .sig * {{ font-family: Inter, Arial, sans-serif !important; }}
    .page {{ width:1280px; height:800px; padding:56px 72px; page-break-after: always; overflow:hidden; position:relative; background:#f6f7f9; }}
    .cover {{ background:{NAVY}; color:#fff; display:flex; align-items:center; }}
    .cover::after {{ content:""; position:absolute; right:-140px; top:-140px; width:560px; height:560px; border:60px solid {CRIMSON}; border-radius:50%; opacity:.9; }}
    .cover .inner {{ max-width:720px; position:relative; z-index:1; }}
    .kicker {{ color:#fb7185; letter-spacing:4px; text-transform:uppercase; font-size:14px; font-weight:600; margin-top:56px; }}
    h1 {{ font-size:64px; line-height:1.05; margin:14px 0 22px; letter-spacing:-1.5px; }}
    h1 span {{ color:#94a3b8; font-weight:400; font-size:40px; letter-spacing:-0.5px; }}
    .cover p {{ color:#b4bfcf; font-size:19px; line-height:1.55; }}
    .head {{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; }}
    .num {{ color:{CRIMSON}; font-weight:700; font-size:14px; letter-spacing:3px; }}
    h2 {{ margin:4px 0 6px; font-size:34px; color:{NAVY}; letter-spacing:-0.8px; }}
    .desc {{ color:{INK2}; font-size:16px; }}
    .tag {{ font-size:12px; letter-spacing:2px; text-transform:uppercase; font-weight:600; padding:8px 14px; border-radius:99px; background:#e2e8f0; color:{INK2}; }}
    .tag.photo {{ background:#ffe4e6; color:#be123c; }}
    .mail {{ background:#fff; border-radius:14px; box-shadow:0 20px 50px -20px rgba(15,23,42,.25); overflow:hidden; }}
    .bar {{ height:38px; background:#f1f5f9; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:7px; padding:0 16px; }}
    .bar span {{ width:11px; height:11px; border-radius:50%; background:#cbd5e1; }}
    .bar em {{ font-style:normal; color:{INK3}; font-size:13px; margin-left:10px; }}
    .meta {{ padding:12px 28px; border-bottom:1px solid #e2e8f0; font-size:13px; color:{INK2}; line-height:1.8; }}
    .meta b {{ color:{INK3}; font-weight:500; display:inline-block; width:64px; }}
    .body {{ padding:22px 28px 32px; font-size:15px; color:{INK}; }}
    .body p {{ margin:0 0 10px; }}
    """
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(pages)}</body></html>'


if __name__ == "__main__":
    (OUT / "html").mkdir(exist_ok=True)
    for slug, *_ , fn in VARIANTS:
        (OUT / "html" / f"{slug}.html").write_text(standalone(fn(), HOSTED))
        (OUT / f"_preview-{slug}.html").write_text(standalone(fn(), LOCAL).replace(
            "<head>", "<head><style>*{font-family:Inter,Arial,sans-serif!important}</style>"))
    (OUT / "_board.html").write_text(board())
    print("built", len(VARIANTS))
