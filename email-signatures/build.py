"""Builds Outlook-safe HTML email signatures for Zeus Power International.

Every signature is a nested <table> with inline styles only (no CSS classes, flexbox,
web fonts or background images) so it survives Outlook desktop's Word renderer.
"""
import pathlib

OUT = pathlib.Path(__file__).parent
HOSTED = "https://www.zeuspower.lk/email/"  # upload email-assets/* here before use
LOCAL = "../public/email/"
# Images served straight from this branch on GitHub, for testing before the site is redeployed
TEST_HOSTED = "https://raw.githubusercontent.com/Sahan-Madusanka-Perera/zeus-v2/claude/email-signatures/public/email/"

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


FB = "https://www.facebook.com/zpiosrilanka/"
LI = "https://www.linkedin.com/company/zeus-power-international/"
SOFT = "#94a3b8"


def spacer(h):
    return f'<div style="height:{h}px;line-height:{h}px;font-size:0;">&nbsp;</div>'


def icon_rows(rows, color=INK2, dark=False, size=13):
    """Contact rows led by a 16px icon image instead of a letter."""
    suffix = "-dark" if dark else ""
    html = "".join(
        f'<tr><td style="padding:3px 10px 3px 0;vertical-align:top;">{img(f"ic-{ic}{suffix}.png", 16, 16, "")}</td>'
        f'<td style="padding:2px 0;font-family:{FONT};font-size:{size}px;color:{color};line-height:19px;">{val}</td></tr>'
        for ic, val in rows)
    return f'<table cellpadding="0" cellspacing="0" border="0" role="presentation">{html}</table>'


def contacts(color=INK2, dark=False, address=True, phone=True):
    rows = []
    if phone:
        rows.append(("phone", a(P["phone_href"], P["phone"], color)))
    rows += [("mail", a("mailto:" + P["email"], P["email"], color)),
             ("globe", a(P["web_href"], P["web"], color))]
    if address:
        rows.append(("pin", a(P["maps"], "655/1, Gunathilaka Gardens,<br>Elvitigala Mawatha, Colombo 05", color)))
    return icon_rows(rows, color, dark)


def socials(dark=False):
    s = "-dark" if dark else ""
    cell = lambda href, n, alt: f'<td style="padding-right:8px;">{a(href, img(f"so-{n}{s}.png", 26, 26, alt))}</td>'
    return table(f'<tr>{cell(FB, "facebook", "Facebook")}{cell(LI, "linkedin", "LinkedIn")}{cell(P["web_href"], "globe", "Website")}</tr>')


def split_name(size=24, first=NAVY, last=SOFT, caret=True):
    first_name, last_name = P["name"].split(" ", 1)
    bar = f'<span style="color:{CRIMSON};font-weight:300;">&nbsp;|</span>' if caret else ""
    return (f'<div style="font-family:{FONT};font-size:{size}px;font-weight:bold;line-height:{size + 6}px;letter-spacing:-0.3px;">'
            f'<span style="color:{first};">{first_name}</span> <span style="color:{last};">{last_name}</span>{bar}</div>')


def stat(value, label, value_color=CRIMSON, label_color=INK3, bg=None, pad="12px 14px"):
    bgc = f"background:{bg};" if bg else ""
    return (f'<td style="{bgc}padding:{pad};vertical-align:top;">'
            f'<div style="font-family:{FONT};font-size:20px;font-weight:bold;color:{value_color};line-height:24px;letter-spacing:-0.3px;">{value}</div>'
            f'<div style="font-family:{FONT};font-size:10px;color:{label_color};letter-spacing:1.2px;text-transform:uppercase;line-height:14px;padding-top:2px;">{label}</div></td>')


# 07 ─ Ignite: gradient banner with tagline and socials, split name, photo + bolt badge
def v7():
    s = lambda f, w, h, alt="": img(f"{f}.png", w, h, alt)
    banner = (
        f'<tr><td colspan="2" style="padding:0;line-height:0;font-size:0;">{s("ignite-top", 600, 104, "Zeus Power International: Sri Lanka&#39;s 24/7 technical breakdown specialists")}</td></tr>'
        '<tr><td colspan="2" style="padding:0;line-height:0;font-size:0;">'
        + table('<tr>'
                f'<td style="line-height:0;">{s("ignite-row-a", 28, 46)}</td>'
                f'<td style="line-height:0;">{a(FB, s("ignite-fb", 24, 46, "Facebook"))}</td>'
                f'<td style="line-height:0;">{s("ignite-gap-1", 8, 46)}</td>'
                f'<td style="line-height:0;">{a(LI, s("ignite-li", 24, 46, "LinkedIn"))}</td>'
                f'<td style="line-height:0;">{s("ignite-gap-2", 8, 46)}</td>'
                f'<td style="line-height:0;">{a(P["web_href"], s("ignite-web", 24, 46, "Website"))}</td>'
                f'<td style="line-height:0;">{s("ignite-row-b", 484, 46)}</td></tr>')
        + '</td></tr>')
    return table(
        banner
        + f'<tr><td style="padding:22px 0 22px 28px;vertical-align:top;background:#ffffff;">{split_name()}'
        f'<div style="font-family:{FONT};font-size:13px;color:{INK2};line-height:18px;padding-top:4px;">{P["title"]}, Zeus Power International</div>'
        f'{spacer(14)}{contacts(address=True)}</td>'
        f'<td style="padding:22px 28px 22px 0;vertical-align:bottom;text-align:right;background:#ffffff;">'
        f'<div style="display:inline-block;">{s("ignite-avatar", 104, 104, P["name"])}</div></td></tr>',
        f"width:600px;border:1px solid {LINE};background:#ffffff;")


# 08 ─ Voltage: dark card, ringed portrait, stats band
def v8():
    return table(
        f'<tr><td colspan="2" style="line-height:0;font-size:0;">{img("bar-gradient.png", 600, 4, "")}</td></tr>'
        f'<tr><td width="170" style="width:170px;padding:24px 8px 18px 22px;vertical-align:middle;background:{NAVY};">{img("voltage-portrait.png", 140, 140, P["name"])}</td>'
        f'<td style="padding:24px 28px 18px 14px;vertical-align:middle;background:{NAVY};">'
        f'{split_name(24, "#ffffff", "#64748b", caret=False)}'
        f'<div style="font-family:{FONT};font-size:11px;font-weight:bold;color:#fb7185;letter-spacing:2.2px;text-transform:uppercase;line-height:18px;padding-top:4px;">{P["title"]}</div>'
        f'{spacer(14)}{contacts("#e2e8f0", dark=True, address=False)}</td></tr>'
        f'<tr><td colspan="2" style="padding:0 22px 22px 22px;background:{NAVY};">'
        + table('<tr>'
                + stat("500+", "Projects", "#ffffff", SOFT, pad="14px 18px 0 0")
                + stat("15+", "Years", "#ffffff", SOFT, pad="14px 18px 0 18px")
                + stat("24/7", "Breakdown response", "#ffffff", SOFT, pad="14px 18px 0 18px")
                + f'<td style="padding:14px 0 0 0;vertical-align:middle;text-align:right;"><div style="display:inline-block;">{logo(118, white=True)}</div></td></tr>',
                "width:100%;border-top:1px solid #1e293b;")
        + '</td></tr>',
        f"width:600px;background:{NAVY};")


# 09 ─ Credentials: no photo, logo-led with a proof row
def v9():
    services = f' <span style="color:{CRIMSON};">&bull;</span> '.join(["Electrical", "Fire protection", "Air conditioning", "Solar"])
    return table(
        f'<tr><td colspan="2" style="line-height:0;font-size:0;">{img("bar-gradient.png", 600, 4, "")}</td></tr>'
        f'<tr><td style="padding:24px 26px 20px 24px;vertical-align:middle;width:170px;border-right:1px solid {LINE};">{logo(160)}</td>'
        f'<td style="padding:22px 24px 20px 26px;vertical-align:top;">{split_name(23, caret=False)}'
        f'<div style="font-family:{FONT};font-size:11px;font-weight:bold;color:{CRIMSON};letter-spacing:2.2px;text-transform:uppercase;line-height:18px;padding-top:3px;">{P["title"]}</div>'
        f'{spacer(10)}{contacts(address=False)}</td></tr>'
        f'<tr><td colspan="2" style="padding:0 24px;">'
        + table('<tr>' + stat("500+", "Projects completed", bg="#f6f7f9")
                + '<td style="width:6px;font-size:0;">&nbsp;</td>' + stat("15+", "Years of experience", bg="#f6f7f9")
                + '<td style="width:6px;font-size:0;">&nbsp;</td>' + stat("30 min", "Avg. emergency response", bg="#f6f7f9") + '</tr>',
                "width:100%;")
        + '</td></tr>'
        f'<tr><td colspan="2" style="padding:14px 24px 20px 24px;font-family:{FONT};font-size:10px;color:{INK3};letter-spacing:1.6px;text-transform:uppercase;line-height:14px;">{services}</td></tr>',
        f"width:600px;border:1px solid {LINE};background:#ffffff;")


# 10 ─ Portrait Duo: photo panel fading into navy beside a clean white column
def v10():
    return table(
        f'<tr><td style="vertical-align:top;background:{NAVY};width:190px;line-height:0;font-size:0;">{img("duo-panel.png", 190, 330, P["name"])}</td>'
        f'<td style="padding:24px 28px 22px 28px;vertical-align:top;border:1px solid {LINE};border-left:0;background:#ffffff;">'
        f'{logo(118)}{spacer(16)}'
        f'{split_name(24, caret=False)}'
        f'<div style="font-family:{FONT};font-size:11px;font-weight:bold;color:{CRIMSON};letter-spacing:2.2px;text-transform:uppercase;line-height:18px;padding-top:3px;">{P["title"]}</div>'
        f'<div style="width:40px;height:2px;background:{CRIMSON};line-height:2px;font-size:0;margin:12px 0;">&nbsp;</div>'
        f'{contacts()}{spacer(12)}{socials()}</td></tr>',
        "width:600px;")


# 11 ─ Hotline: no photo, navy hotline column leads
def v11():
    return table(
        f'<tr><td style="padding:24px 22px;vertical-align:top;background:{NAVY};width:170px;">'
        f'{img("hotline-zap.png", 44, 44, "")}{spacer(14)}'
        f'<div style="font-family:{FONT};font-size:10px;font-weight:bold;color:#fb7185;letter-spacing:2px;text-transform:uppercase;line-height:14px;">24/7 Hotline</div>'
        f'<div style="font-family:{FONT};font-size:19px;font-weight:bold;line-height:26px;padding-top:4px;white-space:nowrap;">{a(P["phone_href"], P["phone"], "#ffffff", "bold")}</div>'
        f'<div style="font-family:{FONT};font-size:12px;color:{SOFT};line-height:17px;padding-top:6px;">Average response<br><span style="color:#ffffff;font-weight:bold;">30 minutes</span></div></td>'
        f'<td style="padding:24px 26px 22px 26px;vertical-align:top;border:1px solid {LINE};border-left:0;background:#ffffff;">'
        f'{split_name(24)}'
        f'<div style="font-family:{FONT};font-size:13px;color:{INK2};line-height:18px;padding-top:4px;">{P["title"]}, Zeus Power International</div>'
        f'{spacer(14)}{contacts(phone=False)}{spacer(16)}'
        + table(f'<tr><td style="vertical-align:middle;">{logo(116)}</td>'
                f'<td style="vertical-align:middle;text-align:right;"><div style="display:inline-block;">{socials()}</div></td></tr>', "width:100%;")
        + '</td></tr>',
        "width:600px;")


VARIANTS = [
    ("01-signature", "Signature", "With photo", "Round portrait, crimson rule and a logo footer. The all-round default.", v1),
    ("02-midnight", "Midnight", "With photo", "Navy card with the portrait full-bleed and the white logo. The boldest option.", v2),
    ("03-executive", "Executive", "No photo", "Name-led and typographic, details and brand split by a hairline.", v3),
    ("04-logo-lead", "Logo Lead", "No photo", "The brand mark leads, details follow. Clean and corporate.", v4),
    ("05-service-banner", "Service Banner", "With photo", "Photo and details over a navy strip with services and the 24/7 line.", v5),
    ("06-compact", "Compact", "No photo", "Two lines for replies and forwards.", v6),
    ("07-ignite", "Ignite", "With photo", "Navy-to-crimson banner with the tagline and socials, portrait paired with a bolt badge.", v7),
    ("08-voltage", "Voltage", "With photo", "Dark card, portrait in a crimson ring, with proof points along the base.", v8),
    ("09-credentials", "Credentials", "No photo", "Logo-led, with a row of hard numbers and the four service lines.", v9),
    ("10-portrait-duo", "Portrait Duo", "With photo", "Portrait panel fading into navy beside a clean white column.", v10),
    ("11-hotline", "Hotline", "No photo", "The 24/7 breakdown line leads in a navy column. Built around the service.", v11),
]


# Copies the rendered signature (not its source) so it pastes into Outlook or Gmail as a signature
COPY_BAR = """<div id="copy-bar" style="font:14px Arial,sans-serif;margin-bottom:20px;padding:14px 16px;background:#f6f7f9;border:1px solid #e2e8f0;border-radius:8px;max-width:568px;">
<button onclick="copySig()" style="font:bold 14px Arial,sans-serif;background:#e11d48;color:#fff;border:0;border-radius:6px;padding:10px 18px;cursor:pointer;">Copy signature</button>
<span id="copy-msg" style="margin-left:12px;color:#475569;">Then paste into your email signature settings with Ctrl+V.</span></div>
<script>
function copySig() {
  var sig = document.getElementById('signature'), range = document.createRange(), sel = window.getSelection();
  range.selectNode(sig); sel.removeAllRanges(); sel.addRange(range);
  var ok = document.execCommand('copy'); sel.removeAllRanges();
  document.getElementById('copy-msg').textContent = ok ? 'Copied. Paste it into your signature settings with Ctrl+V.' : 'Copy failed: select the signature with your mouse and press Ctrl+C.';
}
</script>"""


def standalone(body, base, copy_bar=True):
    bar = COPY_BAR if copy_bar else ""
    return (f'<!doctype html><html><head><meta charset="utf-8"><title>{P["name"]} signature</title></head>'
            f'<body style="margin:0;padding:24px;background:#ffffff;">{bar}<div id="signature">{body.replace("{BASE}", base)}</div></body></html>')


def board():
    pages = []
    cover = (
        '<section class="page cover"><div class="inner">'
        f'<img src="{LOCAL}zeus-logo-white.png" style="width:220px;">'
        '<div class="kicker">Email signature concepts</div>'
        f'<h1>{P["name"]}<br><span>{P["title"]}</span></h1>'
        f'<p>{len(VARIANTS)} directions for Outlook, with and without a portrait. Every version is built as live HTML, so the '
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
    (OUT / "html-test").mkdir(exist_ok=True)
    for slug, *_ , fn in VARIANTS:
        (OUT / "html" / f"{slug}.html").write_text(standalone(fn(), HOSTED))
        (OUT / "html-test" / f"{slug}.html").write_text(standalone(fn(), TEST_HOSTED))
        (OUT / f"_preview-{slug}.html").write_text(standalone(fn(), LOCAL, copy_bar=False).replace(
            "<head>", "<head><style>*{font-family:Inter,Arial,sans-serif!important}</style>"))
    (OUT / "_board.html").write_text(board())
    print("built", len(VARIANTS))
