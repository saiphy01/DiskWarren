import os
import shutil
import pymupdf  # PyMuPDF
from PIL import Image, ImageDraw

def render_svg_to_png(svg_path: str, output_path: str, size: int):
    """Renders an SVG file to a square PNG of the specified size using PyMuPDF and PIL high-quality resampling."""
    doc = pymupdf.open(svg_path)
    page = doc[0]
    
    # Calculate scale factor to render in high resolution (minimum 1024px for flawless downsampling)
    target_render_size = max(size * 2, 1024)
    zoom = target_render_size / 512.0
    mat = pymupdf.Matrix(zoom, zoom)
    
    pix = page.get_pixmap(matrix=mat, alpha=True)
    temp_img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
    
    # Resize to exact requested size with Lanczos filter
    final_img = temp_img.resize((size, size), Image.Resampling.LANCZOS)
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    final_img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path} ({size}x{size})")
    return final_img

def create_round_icon(source_img: Image.Image, output_path: str, size: int):
    """Creates a circular masked round icon for Android roundIcon."""
    img = source_img.resize((size, size), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    
    round_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    round_img.paste(img, (0, 0), mask=mask)
    
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    round_img.save(output_path, "PNG", optimize=True)
    print(f"Generated round icon: {output_path} ({size}x{size})")

def render_svg(svg_path: str, size: int) -> Image.Image:
    """Renders SVG vector to exact size with supersampled antialiasing."""
    doc = pymupdf.open(svg_path)
    page = doc[0]
    base_dim = page.rect.width
    scale = max(size * 4, 1024) / base_dim
    mat = pymupdf.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=mat, alpha=True)
    img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
    return img.resize((size, size), Image.Resampling.LANCZOS)

import struct
import io

def image_to_ico_dib(img: Image.Image) -> bytes:
    """Converts a PIL RGBA image to a standard Win32 DIB icon chunk (BITMAPINFOHEADER + BGRA + 1-bit AND mask)."""
    w, h = img.size
    img_rgba = img.convert('RGBA')
    xor_size = w * h * 4
    and_row_bytes = ((w + 31) // 32) * 4
    and_size = and_row_bytes * h
    
    header = struct.pack(
        '<IIIHHIIIIII',
        40,                  # biSize
        w,                   # biWidth
        h * 2,               # biHeight (XOR mask + AND mask)
        1,                   # biPlanes
        32,                  # biBitCount
        0,                   # biCompression (BI_RGB)
        xor_size + and_size, # biSizeImage
        0, 0, 0, 0           # XPels, YPels, ClrUsed, ClrImportant
    )
    
    xor_data = bytearray()
    and_data = bytearray()
    for y in range(h - 1, -1, -1):
        row_bits = 0
        bit_pos = 7
        and_row = bytearray()
        for x in range(w):
            r, g, b, a = img_rgba.getpixel((x, y))
            xor_data.extend([b, g, r, a])
            if a < 16:
                row_bits |= (1 << bit_pos)
            bit_pos -= 1
            if bit_pos < 0:
                and_row.append(row_bits)
                row_bits = 0
                bit_pos = 7
        if bit_pos != 7:
            and_row.append(row_bits)
        while len(and_row) < and_row_bytes:
            and_row.append(0)
        and_data.extend(and_row)
        
    return header + xor_data + and_data

def pack_ico(images_dict: dict, output_path: str):
    """Packs images into an authentic Windows .ico file with DIB for sizes < 256 and PNG for 256."""
    entries = []
    blobs = []
    sorted_sizes = sorted(images_dict.keys())
    for s in sorted_sizes:
        im = images_dict[s]
        if s >= 256:
            buf = io.BytesIO()
            im.convert('RGBA').save(buf, format='PNG')
            blob = buf.getvalue()
        else:
            blob = image_to_ico_dib(im)
        blobs.append(blob)
        w_b = 0 if s == 256 else s
        h_b = 0 if s == 256 else s
        entries.append({'w': w_b, 'h': h_b, 'size': len(blob)})
    
    header = struct.pack('<HHH', 0, 1, len(entries))
    offset = 6 + len(entries) * 16
    dir_entries = []
    for e in entries:
        dir_entries.append(struct.pack('<BBBBHHII', e['w'], e['h'], 0, 0, 1, 32, e['size'], offset))
        offset += e['size']
    
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(header)
        for de in dir_entries:
            f.write(de)
        for blob in blobs:
            f.write(blob)
    print(f"Generated multi-resolution Windows ICO ({len(entries)} layers: {sorted_sizes}): {output_path}")

def create_windows_ico(favicon_svg: str, logo_svg: str, output_path: str):
    """Generates a high-precision multi-layer Windows .ico.
    - Small sizes (16, 20, 24, 30, 32): Rendered from favicon.svg for high-contrast taskbar/titlebar legibility.
    - Medium & Large sizes (40, 48, 64, 96, 128, 256): Rendered from logo-icon.svg for rich desktop and Start Menu fidelity.
    """
    images = {}
    fav_sizes = [16, 20, 24, 30, 32]
    logo_sizes = [40, 48, 64, 96, 128, 256]
    for s in fav_sizes:
        images[s] = render_svg(favicon_svg, s)
    for s in logo_sizes:
        images[s] = render_svg(logo_svg, s)
    pack_ico(images, output_path)

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_svg = os.path.join(root_dir, "logo-icon.svg")
    fav_svg = os.path.join(root_dir, "favicon.svg")
    
    print(f"Master Logo SVG: {logo_svg}")
    print(f"Master Favicon SVG: {fav_svg}")
    
    # 1. Master High-Resolution Render (1024x1024)
    master_1024 = render_svg_to_png(logo_svg, os.path.join(root_dir, "shared", "design-system", "branding", "icon-1024.png"), 1024)
    
    # 2. Web App Icons
    web_dir = os.path.join(root_dir, "web", "public")
    render_svg_to_png(logo_svg, os.path.join(web_dir, "icon-512.png"), 512)
    render_svg_to_png(logo_svg, os.path.join(web_dir, "icon-192.png"), 192)
    render_svg_to_png(logo_svg, os.path.join(web_dir, "apple-touch-icon.png"), 180)
    render_svg_to_png(fav_svg, os.path.join(web_dir, "favicon-48x48.png"), 48)
    render_svg_to_png(fav_svg, os.path.join(web_dir, "favicon-32x32.png"), 32)
    render_svg_to_png(fav_svg, os.path.join(web_dir, "favicon-16x16.png"), 16)
    
    # Copy SVGs to web/public
    shutil.copy2(logo_svg, os.path.join(web_dir, "logo-icon.svg"))
    shutil.copy2(fav_svg, os.path.join(web_dir, "favicon.svg"))
    shutil.copy2(fav_svg, os.path.join(web_dir, "icon.svg"))

    # Multi-resolution favicon.ico (16, 24, 32, 48, 64) for web browsers
    web_fav_dict = {
        16: render_svg(fav_svg, 16),
        24: render_svg(fav_svg, 24),
        32: render_svg(fav_svg, 32),
        48: render_svg(fav_svg, 48),
        64: render_svg(logo_svg, 64),
    }
    web_fav_path = os.path.join(web_dir, "favicon.ico")
    pack_ico(web_fav_dict, web_fav_path)
    print(f"Generated multi-res Web favicon.ico: {web_fav_path}")
    
    # 3. Windows Application Icons (.ico) across all Windows project directories
    win_targets = [
        os.path.join(root_dir, "windows", "src", "DiskWarren.UI", "app.ico"),
        os.path.join(root_dir, "windows", "src", "DiskWarren.Setup", "app.ico"),
        os.path.join(root_dir, "windows", "publish", "dist", "app.ico"),
        os.path.join(root_dir, "shared", "design-system", "branding", "app.ico"),
        os.path.join(root_dir, "shared", "design-system", "branding", "favicon.ico"),
    ]
    
    # Also update installed application directory if it exists
    local_app_dir = os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "DiskWarren")
    if os.path.isdir(local_app_dir):
        win_targets.append(os.path.join(local_app_dir, "app.ico"))

    for target in win_targets:
        create_windows_ico(fav_svg, logo_svg, target)

    # 4. Mirror PNGs into shared/design-system/branding
    branding_dir = os.path.join(root_dir, "shared", "design-system", "branding")
    for f in ["icon-512.png", "icon-192.png", "apple-touch-icon.png", "favicon-32x32.png", "favicon-16x16.png", "favicon.ico"]:
        src = os.path.join(web_dir, f)
        dst = os.path.join(branding_dir, f)
        shutil.copy2(src, dst)
        print(f"Mirrored: {dst}")

    # 5. Android Mipmaps
    android_res = os.path.join(root_dir, "android", "app", "src", "main", "res")
    densities = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }
    
    for folder, size in densities.items():
        folder_path = os.path.join(android_res, folder)
        square_path = os.path.join(folder_path, "ic_launcher.png")
        round_path = os.path.join(folder_path, "ic_launcher_round.png")
        
        sq_img = render_svg_to_png(logo_svg, square_path, size)
        create_round_icon(sq_img, round_path, size)
        
    print("\nAll brand icons & Windows desktop/taskbar icons generated successfully!")

if __name__ == "__main__":
    main()
