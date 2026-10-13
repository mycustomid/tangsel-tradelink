import base64
from PIL import Image, ImageDraw

master = Image.open('D:/code/tangsel-tradelink/public/brand/logo-samara-2.png').convert('RGBA')
bbox = master.getbbox()
cropped = master.crop(bbox) # (5622, 1641)

size = 512
badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(badge)

# Crisp white squircle badge for contrast in dark mode browser tabs
draw.rounded_rectangle([(16, 16), (496, 496)], radius=110, fill='#ffffff', outline='#d1d5db', width=8)

# Scale full wordmark to fit with nice breathing margins
target_w = 440
target_h = int(target_w * (cropped.height / cropped.width))
res = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

x = (size - target_w) // 2
y = (size - target_h) // 2
badge.paste(res, (x, y), res)

# 1. Save as samara-logo.webp (this is tenant.logo!)
badge.save('D:/code/tangsel-tradelink/public/brand/samara-logo.webp', format='WEBP', quality=95)

# 2. Save as samara-logo.png
badge.save('D:/code/tangsel-tradelink/public/brand/samara-logo.png', format='PNG')

# 3. Save as samara-from-home-favicon.png and samara-favicon.png
badge.save('D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.png', format='PNG')
badge.save('D:/code/tangsel-tradelink/public/brand/samara-favicon.png', format='PNG')

# 4. Save as multi-resolution ICO
badge.save('D:/code/tangsel-tradelink/public/brand/samara-favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# 5. Save as SVG
with open('D:/code/tangsel-tradelink/public/brand/samara-logo.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n  <image href="data:image/png;base64,{b64}" width="512" height="512"/>\n</svg>\n'
with open('D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg)

print('Successfully generated visible Samara logo and favicon suite!')
