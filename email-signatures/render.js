// Renders the graphics from assets.py into ../public/email/, then the signature previews and the
// client deck. Run after `python3 assets.py && python3 build.py`.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pub = path.join(dir, '..', 'public', 'email');

// Ignite banner is cut into strips so each social icon can be its own link in Outlook
const IGNITE_SLICES = [
  ['ignite-top', 0, 0, 600, 104],
  ['ignite-row-a', 0, 104, 28, 46],
  ['ignite-fb', 28, 104, 24, 46],
  ['ignite-gap-1', 52, 104, 8, 46],
  ['ignite-li', 60, 104, 24, 46],
  ['ignite-gap-2', 84, 104, 8, 46],
  ['ignite-web', 92, 104, 24, 46],
  ['ignite-row-b', 116, 104, 484, 46],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1280, height: 800 } });

  const transparent = JSON.parse(fs.readFileSync(path.join(dir, '_assets.json')));
  await page.goto('file://' + path.join(dir, '_assets.html'));
  await page.waitForLoadState('networkidle');
  for (const [name, isTransparent] of Object.entries(transparent)) {
    const el = page.locator('#' + name);
    if (name === 'ignite-banner') {
      const box = await el.boundingBox();
      for (const [slice, x, y, w, h] of IGNITE_SLICES) {
        await page.screenshot({ path: path.join(pub, slice + '.png'), clip: { x: box.x + x, y: box.y + y, width: w, height: h } });
      }
      continue;
    }
    await el.screenshot({ path: path.join(pub, name + '.png'), omitBackground: isTransparent });
  }

  fs.mkdirSync(path.join(dir, 'previews'), { recursive: true });
  for (const f of fs.readdirSync(dir).filter((f) => f.startsWith('_preview-'))) {
    await page.goto('file://' + path.join(dir, f));
    await page.waitForLoadState('networkidle');
    const out = f.replace('_preview-', '').replace('.html', '.png');
    await page.locator('body > table').screenshot({ path: path.join(dir, 'previews', out) });
  }

  await page.goto('file://' + path.join(dir, '_board.html'));
  await page.waitForLoadState('networkidle');
  await page.pdf({ path: path.join(dir, 'Zeus-Power-Email-Signature-Concepts.pdf'), width: '1280px', height: '800px', printBackground: true });
  const pages = await page.locator('section.page').count();
  for (let i = 0; i < pages; i++) {
    await page.locator('section.page').nth(i).screenshot({ path: path.join(dir, `_board-${i}.png`) });
  }
  await browser.close();
})();
