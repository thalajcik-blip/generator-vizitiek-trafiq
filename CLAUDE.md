# Úloha pre Claude Code: nasadiť Trafiq generátor vizitiek

## Cieľ
Publikovať statický web z tohto priečinka do GitHub repa a nasadiť ho na Vercel.

- GitHub repo (prázdne, už existuje): https://github.com/thalajcik-blip/generator-vizitiek-trafiq
- Vetva: `main`
- Vercel: nový projekt napojený na toto repo, Framework Preset **Other**, bez build kroku, output = koreň repa.

## Kroky
1. V tomto priečinku: `git init -b main`, `git add -A`, `git commit -m "Trafiq generátor vizitiek"`.
2. `git remote add origin https://github.com/thalajcik-blip/generator-vizitiek-trafiq.git` a `git push -u origin main`.
   - Ak repo nie je prázdne (napr. README z GitHubu), najprv `git pull --rebase origin main` a konflikty vyriešiť v prospech súborov z tohto priečinka.
3. Vercel: `vercel link` (nový projekt `generator-vizitiek-trafiq`, napojiť na GitHub repo), potom `vercel --prod`.
   - Nastavenia: Framework = Other, Build Command = prázdny, Output Directory = `.` (koreň), Install Command = prázdny.
   - `vercel.json` je pripravený – nemeniť.
4. Overiť po nasadení (napr. `curl -I`):
   - `/` presmeruje na generátor v1 (HTTP 200 na `index.html`),
   - `/v1`, `/v2`, `/v3` vracajú 200,
   - `/assets/vizitka-v1-sablona.pdf` a `/assets/fonts/Manrope-Bold.ttf` vracajú 200,
   - `/vizitka-engine.js` vracia 200 s `Content-Type` JavaScript.
5. Vypísať produkčnú URL.

## Štruktúra
- `index.html` – rozcestník, presmeruje na v1
- `Generátor vizitky v1|v2|v3.dc.html` – tri generátory (samostatné HTML stránky, otvárajú sa priamo v prehliadači)
- `support.js` – runtime stránok (nemeniť)
- `vizitka-engine.js` – generovanie PDF (pdf-lib + fontkit + qrcode-generator z CDN jsDelivr)
- `assets/vizitka-v1|v2|v3-sablona.pdf` – tlačové šablóny z InDesignu (85×55 mm, 3 mm spadávka, orezové značky, CMYK)
- `assets/fonts/Manrope-*.ttf` – písma vkladané do PDF
- `assets/logo-dk.svg` – logo v hlavičke generátora
- `vercel.json` – čisté URL `/v1`, `/v2`, `/v3` + hlavičky

## Poznámky
- Nič sa nebuildí, žiadne npm závislosti. Knižnice sa načítavajú za behu z `cdn.jsdelivr.net` a `cdnjs.cloudflare.com` – nepridávať CSP, ktorá by ich blokovala.
- Názvy súborov obsahujú diakritiku a medzery – zámerne; prepojenia v hlavičke generátorov na ne odkazujú URL-enkódovane. Nepremenovávať.
- Údaje z formulára sa ukladajú len v localStorage prehliadača, nikam sa neodosielajú.
- Ak by Vercel vrátil pre `.dc.html` iný Content-Type ako `text/html`, hlavička je nastavená vo `vercel.json`.
