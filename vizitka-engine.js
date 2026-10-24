// Trafiq vizitky – generátor tlačového PDF zo šablóny z InDesignu.
// Líce sa kopíruje 1:1, na rube sa odstráni pôvodný text a QR a vykreslí sa nový (CMYK).
const NAVY = [0.982, 0.926, 0.445, 0.562];
const GRAY = [0.622, 0.533, 0.345, 0.088];
const QR_INK = [0.909, 0.832, 0.503, 0.634];

export const CONFIGS = {
  1: {
    template: 'assets/vizitka-v1-sablona.pdf',
    qr: { x: 189.646, y: 35.024, size: 57.874 },
    text: [
      { k: 'name', font: 'ExtraBold', size: 11 * 0.85, x: 43.328, y: 147.038, tc: 0.005, c: NAVY, maxW: 135 },
      { k: 'position', font: 'Regular', size: 8, x: 43.328, y: 134.496, tc: 0.017, c: GRAY, maxW: 135 },
      { k: 'company', font: 'SemiBold', size: 8, x: 50.197, y: 101.409, tc: 0, c: NAVY, maxW: 128 },
      { k: 'street', font: 'Regular', size: 7, x: 50.197, y: 91.409, tc: 0.038, c: GRAY, maxW: 128 },
      { k: 'city', font: 'Regular', size: 7, x: 50.197, y: 81.409, tc: 0.02, c: GRAY, maxW: 128 },
      { k: 'phone', font: 'SemiBold', size: 8, x: 50.197, y: 66.836, tc: 0, c: NAVY, maxW: 128 },
      { k: 'email', font: 'SemiBold', size: 8, x: 50.197, y: 54.053, tc: 0.018, c: NAVY, maxW: 128 },
      { k: 'web', font: 'SemiBold', size: 8, x: 50.197, y: 39.968, tc: 0.001, c: NAVY, maxW: 128 },
    ],
    icons: [
      { at: [38.325, 100.227], keys: ['company', 'street', 'city'] },
      { at: [37.845, 65.548], keys: ['phone'] },
      { at: [38.041, 53.53], keys: ['email'] },
      { at: [38.041, 38.813], keys: ['web'] },
    ],
  },
  2: {
    template: 'assets/vizitka-v2-sablona.pdf',
    qr: { x: 33.549, y: 109.911, size: 53.635 },
    text: [
      { k: 'name', font: 'ExtraBold', size: 11 * 0.85, x: 32.622, y: 59.447, tc: 0.005, c: [0.028, 0.018, 0.018, 0], maxW: 106 },
      { k: 'position', font: 'Regular', size: 7.5, x: 32.622, y: 46.454, tc: 0, c: [0.28, 0.24, 0, 0], maxW: 106 },
      { k: 'company', font: 'Regular', size: 7.5, x: 32.622, y: 36.454, tc: -0.009, c: [0.28, 0.24, 0, 0], maxW: 106 },
      { k: 'street', font: 'Medium', size: 7.5, x: 158.764, y: 88.974, tc: 0.028, c: [0, 0, 0, 0], maxW: 91 },
      { k: 'city', font: 'Medium', size: 7.5, x: 158.764, y: 77.974, tc: 0.02, c: [0, 0, 0, 0], maxW: 91 },
      { k: 'phone', font: 'Medium', size: 7.5, x: 158.764, y: 63.117, tc: 0.02, c: [0, 0, 0, 0], maxW: 91 },
      { k: 'email', font: 'Medium', size: 7.5, x: 158.764, y: 50.334, tc: 0.038, c: [0, 0, 0, 0], maxW: 91 },
      { k: 'web', font: 'Medium', size: 7.5, x: 158.764, y: 36.249, tc: 0.026, c: [0, 0, 0, 0], maxW: 91 },
    ],
    icons: [
      { at: [145.049, 87.202], keys: ['street', 'city'] },
      { at: [144.286, 61.154], keys: ['phone'] },
      { at: [144.262, 49.25], keys: ['email'] },
      { at: [144.341, 34.901], keys: ['web'] },
    ],
  },
  3: {
    template: 'assets/vizitka-v3-sablona.pdf',
    qr: { x: 190.512, y: 104.622, size: 57.874 },
    text: [
      { k: 'name', font: 'ExtraBold', size: 12 * 0.85, x: 38.291, y: 146.255, tc: 0.001, c: NAVY, maxW: 140 },
      { k: 'position', font: 'Medium', size: 7.5, x: 38.291, y: 133.761, tc: 0.035, c: [0.483, 0.383, 0.261, 0.007], maxW: 140, upper: true },
      { k: 'phone', font: 'Bold', size: 7.5, x: 37.441, y: 107.399, tc: 0, c: NAVY, maxW: 140 },
      { k: 'email', font: 'Bold', size: 7.5, x: 37.441, y: 96.769, tc: 0, c: NAVY, maxW: 140 },
      { k: 'web', font: 'Bold', size: 7.5, x: 37.441, y: 86.422, tc: 0.038, c: [0.039, 0.765, 0.967, 0.002], maxW: 140 },
      { k: 'company', font: 'Bold', size: 7.5, x: 38.008, y: 61.194, tc: 0, c: NAVY, maxW: 140 },
      { k: 'street', font: 'Regular', size: 7, x: 38.008, y: 51.194, tc: 0.038, c: GRAY, maxW: 140 },
      { k: 'city', font: 'Regular', size: 7, x: 38.008, y: 41.194, tc: 0, c: GRAY, maxW: 140 },
    ],
    icons: [],
  },
};

export const DEFAULTS = {
  pre: 'Ing.', first: 'Ján', last: 'Novák', post: '', position: 'Obchodný riaditeľ',
  company: 'Triton Security, s.r.o.', street: 'Priemyselná 1/2034,', city: '031 01 Liptovský Mikuláš',
  phone: '+421 901 123 567', email: 'jan.novak@trafiq.sk', web: 'www.trafiq.sk',
};

let libs;
async function loadLibs() {
  if (!libs) libs = Promise.all([
    import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm'),
    import('https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/+esm'),
    import('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/+esm'),
  ]).then(([pdf, fk, qr]) => ({ pdf, fontkit: fk.default || fk, qrcode: qr.default || qr }));
  return libs;
}
const cache = {};
const getBytes = (url) => (cache[url] ||= fetch(url).then((r) => { if (!r.ok) throw new Error(url + ' ' + r.status); return r.arrayBuffer(); }));

const clean = (s) => (s || '').trim();
export function displayName(d) {
  const core = [d.pre, d.first, d.last].map(clean).filter(Boolean).join(' ');
  return clean(d.post) ? `${core}, ${clean(d.post)}` : core;
}
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');
export function vcard(d) {
  const first = clean(d.first), last = clean(d.last);
  const web = clean(d.web);
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${esc(last)};${esc(first)}`, `FN:${esc([first, last].filter(Boolean).join(' '))}`];
  if (clean(d.company)) lines.push(`ORG:${esc(clean(d.company))}`);
  if (clean(d.phone)) lines.push(`TEL;TYPE=CELL:${clean(d.phone).replace(/[^\d+]/g, '')}`);
  if (clean(d.email)) lines.push(`EMAIL:${clean(d.email)}`);
  if (web) lines.push(`URL:${/^https?:\/\//i.test(web) ? web : 'https://' + web}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

function stripBack(content, cfg, vals) {
  // 1) pôvodný QR (artefakt s ~800 ťahmi) a ikony pri prázdnych poliach
  content = content.replace(/\/Artifact\s*<<([\s\S]*?)>>\s*BDC([\s\S]*?)EMC/g, (all, dict, body) => {
    if (body.length > 15000 && (body.match(/ l\n/g) || []).length > 300) return '';
    const bb = dict.match(/BBox \[\s*([-\d.]+)\s+([-\d.]+)/);
    if (bb) {
      const ic = cfg.icons.find((i) => Math.abs(i.at[0] - +bb[1]) < 0.3 && Math.abs(i.at[1] - +bb[2]) < 0.3);
      if (ic && ic.keys.every((k) => !vals[k])) return '';
    }
    return all;
  });
  // 2) textové objekty – ponechá sa len nastavenie farby / grafického stavu
  return content.replace(/(^|\n)BT\n([\s\S]*?)\nET(?=\s)/g, (all, pre, body) =>
    pre + body.split('\n').filter((l) => /\b(scn|cs|gs|sc)\s*$/.test(l) && !/T[fmJj]\b/.test(l)).join('\n'));
}

export async function buildPdf(version, data) {
  const cfg = CONFIGS[version];
  const { pdf, fontkit, qrcode } = await loadLibs();
  const { PDFDocument, PDFName, PDFArray, PDFNumber, PDFOperator, cmyk, decodePDFRawStream,
    pushGraphicsState, popGraphicsState, setFillingCmykColor, fill, setCharacterSpacing } = pdf;

  const doc = await PDFDocument.load(await getBytes(cfg.template));
  doc.registerFontkit(fontkit);
  const back = doc.getPages()[1];

  const vals = {
    name: displayName(data), position: clean(data.position), company: clean(data.company),
    street: clean(data.street), city: clean(data.city), phone: clean(data.phone), email: clean(data.email), web: clean(data.web),
  };

  const c = back.node.Contents();
  const streams = c instanceof PDFArray ? c.asArray().map((r) => doc.context.lookup(r)) : [c];
  let content = '';
  for (const s of streams) content += new TextDecoder('latin1').decode(decodePDFRawStream(s).decode()) + '\n';
  content = stripBack(content, cfg, vals);
  const bytes = Uint8Array.from(content, (ch) => ch.charCodeAt(0) & 0xff);
  back.node.set(PDFName.of('Contents'), doc.context.register(doc.context.flateStream(bytes)));

  const fonts = {};
  for (const t of cfg.text) if (!fonts[t.font]) fonts[t.font] = await doc.embedFont(await getBytes(`assets/fonts/Manrope-${t.font}.ttf`), { subset: false });

  const warnings = [];
  for (const t of cfg.text) {
    let s = vals[t.k];
    if (!s) continue;
    if (t.upper) s = s.toLocaleUpperCase('sk');
    const font = fonts[t.font];
    let size = t.size;
    const w = (sz) => font.widthOfTextAtSize(s, sz) + t.tc * sz * s.length;
    if (w(size) > t.maxW) size = Math.max(t.size * 0.62, size * t.maxW / w(size));
    let tc = t.tc * size;
    if (w(size) > t.maxW) tc -= (w(size) - t.maxW) / Math.max(1, s.length - 1);
    if (tc < -0.06 * size) { tc = -0.06 * size; warnings.push(t.k); }
    back.pushOperators(setCharacterSpacing(tc));
    back.drawText(s, { x: t.x, y: t.y, size, font, color: cmyk(...t.c) });
    back.pushOperators(setCharacterSpacing(0));
  }

  const q = qrcode(0, 'M');
  q.addData(unescape(encodeURIComponent(vcard(data))), 'Byte');
  q.make();
  const n = q.getModuleCount(), m = cfg.qr.size / n;
  const ops = [pushGraphicsState(), setFillingCmykColor(...QR_INK)];
  const N = (v) => PDFNumber.of(+v.toFixed(4));
  for (let r = 0; r < n; r++) {
    let start = -1;
    for (let col = 0; col <= n; col++) {
      const dark = col < n && q.isDark(r, col);
      if (dark && start < 0) start = col;
      if (!dark && start >= 0) {
        ops.push(PDFOperator.of('re', [N(cfg.qr.x + start * m), N(cfg.qr.y + cfg.qr.size - (r + 1) * m), N((col - start) * m), N(m)]));
        start = -1;
      }
    }
  }
  ops.push(fill(), popGraphicsState());
  back.pushOperators(...ops);

  doc.setTitle(`Vizitka Trafiq – ${vals.name}`);
  doc.setCreator('Trafiq generátor vizitiek');
  return { bytes: await doc.save(), modules: n, warnings };
}

export function fileName(version, d) {
  const slug = [d.last, d.first].map(clean).filter(Boolean).join('-')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9-]+/g, '-').toLowerCase();
  return `trafiq-vizitka-v${version}-${slug || 'bez-mena'}.pdf`;
}
