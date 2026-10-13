import base64

def embed_favicon(png_path, svg_path, w, h):
    with open(png_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">
  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}"/>
</svg>'''
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'Successfully updated {svg_path}')

if __name__ == '__main__':
    embed_favicon(
        'D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.png',
        'D:/code/tangsel-tradelink/public/brand/raja-freeze-dried-favicon.svg',
        256, 250
    )
    embed_favicon(
        'D:/code/tangsel-tradelink/public/brand/samara-favicon.png',
        'D:/code/tangsel-tradelink/public/brand/samara-from-home-favicon.svg',
        512, 512
    )
