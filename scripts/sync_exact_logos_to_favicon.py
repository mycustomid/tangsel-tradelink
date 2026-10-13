import base64
from PIL import Image

tenants = [
    ('samara-from-home', 'samara-logo', 'samara-from-home-favicon', 'samara-favicon'),
    ('raja-freeze-dried', 'raja-freeze-dried-logo', 'raja-freeze-dried-favicon', 'raja-freeze-dried-favicon'),
    ('bumina-eenk', 'bumina-eenk-logo', 'bumina-eenk-favicon', 'bumina-eenk-favicon'),
    ('my-aicustom', 'my-aicustom-logo', 'my-aicustom-favicon', 'my-aicustom-favicon'),
]

for slug, logo_base, fav_base, ico_base in tenants:
    webp_path = f'D:/code/tangsel-tradelink/public/brand/{logo_base}.webp'
    im = Image.open(webp_path).convert('RGBA')
    w, h = im.size

    # 1. Save logo PNG
    png_path = f'D:/code/tangsel-tradelink/public/brand/{logo_base}.png'
    im.save(png_path, format='PNG')

    # 2. Save favicon PNG (identical to logo)
    fav_png = f'D:/code/tangsel-tradelink/public/brand/{fav_base}.png'
    im.save(fav_png, format='PNG')
    if fav_base != 'samara-favicon':
        im.save('D:/code/tangsel-tradelink/public/brand/samara-favicon.png', format='PNG')

    # 3. Save multi-res ICO (identical to logo)
    ico_path = f'D:/code/tangsel-tradelink/public/brand/{ico_base}.ico'
    im.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    # 4. Save SVG (embed identical logo)
    with open(png_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    svg_path = f'D:/code/tangsel-tradelink/public/brand/{fav_base}.svg'
    svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">\n  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}"/>\n</svg>\n'
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print(f'Synchronized {slug}: favicon 100% identical to {logo_base}.webp ({w}x{h})')
