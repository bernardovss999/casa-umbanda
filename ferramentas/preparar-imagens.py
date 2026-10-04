"""Gera as imagens otimizadas do site a partir de ../artes e ../marca.
Rode de dentro de site/:  python ferramentas/preparar-imagens.py
"""
import os, re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ARTES, MARCA, OUT = '../artes', '../marca/logo-original.jpg', 'src/assets/img'
os.makedirs(f'{OUT}/artes', exist_ok=True)
os.makedirs(f'{OUT}/marca', exist_ok=True)

# artes: a versão mais recente de cada nome, em duas larguras
latest = {}
for f in sorted(os.listdir(ARTES)):
    m = re.match(r'(.+)-v(\d+)\.png$', f)
    if m and int(m.group(2)) >= latest.get(m.group(1), (0, ''))[0]:
        latest[m.group(1)] = (int(m.group(2)), f)
for name, (_, f) in latest.items():
    im = Image.open(f'{ARTES}/{f}').convert('RGB')
    for w, q in ((960, 78),):  # uma versão só: o site precisa ficar com menos de 100 arquivos
        im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).save(f'{OUT}/artes/{name}-{w}.webp', quality=q, method=6)
print(len(latest), 'artes')

# brasão: traço claro sobre transparente (usado como máscara, recolorível por CSS)
logo = Image.open(MARCA).convert('L')
bg = logo.getpixel((4, 4))
alpha = logo.point(lambda v: max(0, min(255, (v - bg) * 255 // (255 - bg))))
line = Image.new('LA', logo.size, (255, 0)); line.putalpha(alpha)
line.convert('RGBA').save(f'{OUT}/marca/brasao-traco.webp', lossless=True, method=6)
line.convert('RGBA').resize((360, 360), Image.LANCZOS).save(f'{OUT}/marca/brasao-traco-360.webp', lossless=True)

# avatar circular (igual ao Instagram)
rgb = Image.open(MARCA).convert('RGB')
for s in (192, 512):
    rgb.resize((s, s), Image.LANCZOS).save(f'{OUT}/marca/brasao-{s}.webp', quality=88)
for s, n in ((32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (512, 'icon-512.png')):
    rgb.resize((s, s), Image.LANCZOS).save(f'src/{n}' if s != 512 else f'{OUT}/marca/{n}')

# imagem de compartilhamento 1200x630
og = Image.new('RGB', (1200, 630), (76, 26, 25))
b = rgb.resize((470, 470), Image.LANCZOS); og.paste(b, (680, 80))
d = ImageDraw.Draw(og)
def font(n, s):
    for p in (f'C:/Windows/Fonts/{n}', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'):
        if os.path.exists(p): return ImageFont.truetype(p, s)
    return ImageFont.load_default()
d.text((80, 190), 'CASA DE UMBANDA', fill=(226, 198, 142), font=font('georgia.ttf', 34))
d.text((80, 240), 'Xangô e Iemanjá', fill=(245, 238, 227), font=font('georgiab.ttf', 72))
d.text((80, 345), 'Pedra e Mar, Lei e Amor', fill=(226, 198, 142), font=font('georgiai.ttf', 34))
d.text((80, 470), 'MÉIER · RIO DE JANEIRO', fill=(201, 180, 163), font=font('arial.ttf', 24))
og.save(f'{OUT}/og.jpg', quality=86)
print('ok')

# recortes só da fotografia de algumas artes (para os arcos do topo das páginas)
os.makedirs(f'{OUT}/fotos', exist_ok=True)
recortes = {
    'pai-renato-plano-aberto': (200, 150, 925, 1205),
    'altar-registro': (160, 200, 950, 990),
    'vela-registro': (160, 115, 960, 1200),
}
for name, box in recortes.items():
    im = Image.open(f'{ARTES}/{latest[name][1]}').convert('RGB').crop(box)
    for w in (900,):
        im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).save(f'{OUT}/fotos/{name}-{w}.webp', quality=80, method=6)
print('recortes ok')
