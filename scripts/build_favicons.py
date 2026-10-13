import base64
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def build_samara():
    pure_s = Image.open('D:/code/tangsel-tradelink/public/brand/pure_s.png').convert('RGBA')
    # Bold stroke dilation for 16x16 / 32x32 tab readability
    alpha = pure_s.split()[3]
    bold_alpha = alpha.filter(ImageFilter.MaxFilter(21))

    arr = np.array(pure_s)
    white_arr = np.zeros_like(arr)
    white_arr[:, :, :3] = 255
    white_arr[:, :, 3] = np.array(bold_alpha)
    s_white = Image.fromarray(white_arr)

    size = 512
    badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    # Deep artisanal terracotta badge
    draw.rounded_rectangle([(16, 16), (496, 496)], radius=120, fill='#9e341b', outline='#c94f32', width=10)

    target_h = 370
    aspect = s_white.width / s_white.height
    target_w = int(target_h * aspect)
    s_res = s_white.resize((target_w, target_h), Image.Resampling.LANCZOS)

    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    badge.alpha_composite(s_res, (pos_x, pos_y))

    # Save PNGs
    badge.save('D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/samara-favicon.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/samara-logo.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/samara-favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

    # SVG with embedded b64
    with open('D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.png', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">\n  <image href="data:image/png;base64,{b64}" width="128" height="128"/>\n</svg>\n'
    with open('D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('[Favicon] Samara built successfully.')

def build_raja():
    # Load astronaut crop
    astro_raw = Image.open('D:/code/tangsel-tradelink/public/brand/raja_astro_crop.png').convert('RGBA')
    # Astronaut is on transparent background. Crop bbox tightly:
    bbox = astro_raw.getbbox()
    astro = astro_raw.crop(bbox)

    size = 512
    badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    # Deep cosmic midnight navy badge with vibrant orange border
    draw.rounded_rectangle([(16, 16), (496, 496)], radius=120, fill='#07182e', outline='#f36b21', width=10)

    # Scale astronaut to fit comfortably in center
    target_h = 360
    aspect = astro.width / astro.height
    target_w = int(target_h * aspect)
    astro_res = astro.resize((target_w, target_h), Image.Resampling.LANCZOS)

    pos_x = (size - target_w) // 2
    pos_y = (size - target_h) // 2
    badge.alpha_composite(astro_res, (pos_x, pos_y))

    # Save PNGs
    badge.save('D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-logo.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

    # SVG with embedded b64
    with open('D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.png', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">\n  <image href="data:image/png;base64,{b64}" width="128" height="128"/>\n</svg>\n'
    with open('D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('[Favicon] Raja Freeze Dried built successfully.')

def build_bumina():
    # Bumina Eenk: Highland Homestay
    # Clean vector alpine villa roof & chimney silhouette inside emerald badge
    size = 512
    badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    # Highland emerald forest badge
    draw.rounded_rectangle([(16, 16), (496, 496)], radius=120, fill='#0d281a', outline='#22c55e', width=10)

    # Draw alpine cottage silhouette
    # Roof triangle
    roof = [(256, 140), (120, 290), (145, 290), (256, 170), (367, 290), (392, 290)]
    # Chimney
    draw.polygon([(320, 230), (320, 165), (345, 165), (345, 255)], fill='#ffffff')
    # Roof slope
    draw.polygon(roof, fill='#ffffff')
    # House body
    draw.rounded_rectangle([(155, 275), (357, 375)], radius=12, fill='#ffffff')
    # Window inside house
    draw.rounded_rectangle([(195, 305), (235, 345)], radius=6, fill='#0d281a')
    draw.rounded_rectangle([(277, 305), (317, 345)], radius=6, fill='#0d281a')
    # Window panes cross
    draw.line([(215, 305), (215, 345)], fill='#ffffff', width=3)
    draw.line([(195, 325), (235, 325)], fill='#ffffff', width=3)
    draw.line([(297, 305), (297, 345)], fill='#ffffff', width=3)
    draw.line([(277, 325), (317, 325)], fill='#ffffff', width=3)

    # Save PNGs
    badge.save('D:/code/tangsel-tradelink/public/brand/bumina-eenk-favicon.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/bumina-eenk-logo.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/bumina-eenk-favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

    # SVG
    with open('D:/code/tangsel-tradelink/public/brand/bumina-eenk-favicon.png', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">\n  <image href="data:image/png;base64,{b64}" width="128" height="128"/>\n</svg>\n'
    with open('D:/code/tangsel-tradelink/public/brand/bumina-eenk-favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print('[Favicon] Bumina Eenk built successfully.')

def build_myaicustom():
    # Ensure PNG and ICO are synced from SVG or rendered nicely
    # Already verified perfect in Bos's screenshot
    # Let's render a 512x512 PNG corresponding to the SVG for fallback
    size = 512
    badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    draw.rounded_rectangle([(16, 16), (496, 496)], radius=120, fill='#090d16', outline='#4f46e5', width=10)
    # Circle outline
    draw.ellipse([(100, 100), (412, 412)], outline='#818cf8', width=8)
    # Central nodes
    # Node 1 (top): (256, 160)
    # Node 2 (bottom-left): (176, 312)
    # Node 3 (bottom-right): (336, 312)
    # Lines
    draw.line([(256, 160), (176, 312)], fill='#e0e7ff', width=12)
    draw.line([(256, 160), (336, 312)], fill='#e0e7ff', width=12)
    draw.line([(176, 312), (336, 312)], fill='#e0e7ff', width=12)
    # Dots
    draw.ellipse([(220, 124), (292, 196)], fill='#6366f1')
    draw.ellipse([(144, 280), (208, 344)], fill='#06b6d4')
    draw.ellipse([(304, 280), (368, 344)], fill='#a855f7')
    draw.ellipse([(240, 240), (272, 272)], fill='#ffffff')

    badge.save('D:/code/tangsel-tradelink/public/brand/my-aicustom-favicon.png', format='PNG')
    badge.save('D:/code/tangsel-tradelink/public/brand/my-aicustom-favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    print('[Favicon] MY-AICUSTOM built successfully.')

if __name__ == '__main__':
    build_samara()
    build_raja()
    build_bumina()
    build_myaicustom()
