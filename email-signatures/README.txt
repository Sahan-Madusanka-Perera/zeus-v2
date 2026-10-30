ZEUS POWER INTERNATIONAL: EMAIL SIGNATURES FOR UPUL ERANGA

html/                Final signatures (01–11). Image links point to https://www.zeuspower.lk/email/
public/email/ (repo root)  Images served at https://www.zeuspower.lk/email/ once deployed (PNG and JPG, which Outlook can display)
previews/            PNG preview of each signature
Zeus-Power-Email-Signature-Concepts.pdf   Client review deck (drag it into Canva to edit)

INSTALL IN OUTLOOK
1. Merge this branch and deploy, so the image links go live.
2. Open the chosen html/0X-*.html in Chrome or Edge, press Ctrl+A, then Ctrl+C.
3. Outlook > Settings > Signatures > New, then paste with Ctrl+V and save.
   (Classic Outlook: File > Options > Mail > Signatures.)

REBUILDING
  python3 assets.py && python3 build.py && node render.js
  assets.py draws the graphics Outlook cannot render (gradients, ringed portraits, icons) into public/email/.
  build.py writes the signatures (01-11) and the deck; render.js renders images, previews and the PDF.
  Designs 07-11 use image slices and icon PNGs; every name, number and link is still live text.

TESTING BEFORE THE SITE IS REDEPLOYED
  html-test/ holds the same signatures, with images loaded from this branch on GitHub
  (raw.githubusercontent.com), so they work right now. Use them for testing only; switch to
  html/ once public/email/ is live on www.zeuspower.lk.
