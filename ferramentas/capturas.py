"""Capturas de tela para revisão (tela visível, emendadas).
python ferramentas/capturas.py <saida> [caminhos...]"""
import sys, os, io
from playwright.sync_api import sync_playwright
from PIL import Image
out = sys.argv[1]; caminhos = sys.argv[2:] or ['/']
os.makedirs(out, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    for nome, vp, mobile, escala in (('d', {'width': 1440, 'height': 900}, False, .5), ('m', {'width': 390, 'height': 844}, True, 1)):
        ctx = b.new_context(viewport=vp, device_scale_factor=1, is_mobile=mobile, has_touch=mobile)
        pg = ctx.new_page(); erros = []
        pg.on('pageerror', lambda e: erros.append(str(e)))
        pg.on('console', lambda m: m.type == 'error' and erros.append(m.text))
        for c in caminhos:
            pg.goto('http://localhost:5173' + c, wait_until='networkidle'); pg.wait_for_timeout(3600)
            h = pg.evaluate('document.documentElement.scrollHeight'); quadros = []
            y = 0
            while y < h:
                pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(1300)
                quadros.append(Image.open(io.BytesIO(pg.screenshot())))
                y += vp['height']
            W = vp['width']; total = Image.new('RGB', (W, vp['height'] * len(quadros)))
            for i, q in enumerate(quadros): total.paste(q, (0, i * vp['height']))
            total = total.crop((0, 0, W, min(h, total.height)))
            if escala != 1: total = total.resize((int(W * escala), int(total.height * escala)))
            base = f"{out}/{nome}{c.strip('/').replace('/', '_') or '_inicio'}"
            # fatia em pedaços legíveis
            fat = 1400
            for k in range(0, total.height, fat): total.crop((0, k, total.width, min(total.height, k + fat))).save(f'{base}_{k // fat}.png')
            print(base, 'partes:', (total.height + fat - 1) // fat, 'largura:', pg.evaluate('document.documentElement.scrollWidth'))
        print(nome, 'erros:', erros[:5]); ctx.close()
    b.close()
