Trafiq – generátor vizitiek

Spustenie
Generátor musí bežať cez webový server – priamo otvorený súbor (file://) prehliadač nenačíta.
- Najjednoduchšie: nahrajte celý priečinok na ľubovoľný web hosting (napr. intranet, Netlify, GitHub Pages).
- Lokálne: v tomto priečinku spustite  python3 -m http.server 8000
  a otvorte http://localhost:8000/Generátor vizitky v1.dc.html

Použitie
Vyplňte údaje -> tlačidlo „Stiahnuť PDF pre tlač“.
PDF: 85 × 55 mm, spadávka 3 mm, orezové značky, CMYK.

Zmena dizajnu
Šablóny sú v assets/vizitka-v1|v2|v3-sablona.pdf (export z InDesignu).
Pozície textov a QR sú v vizitka-engine.js (CONFIGS). Pri zmene layoutu v InDesigne treba upraviť aj tieto súradnice.
Potrebné pripojenie na internet (knižnice pdf-lib, pdf.js, qrcode sa načítavajú z CDN).
