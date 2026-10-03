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

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    svg_source = os.path.join(root_dir, "web", "public", "logo-icon.svg")
    
    print(f"Master SVG source: {svg_source}")
    
    # 1. Master High-Resolution Render (1024x1024)
    master_1024 = render_svg_to_png(svg_source, os.path.join(root_dir, "shared", "design-system", "branding", "icon-1024.png"), 1024)
    
    # 2. Web App Icons
    web_dir = os.path.join(root_dir, "web", "public")
    img_512 = render_svg_to_png(svg_source, os.path.join(web_dir, "icon-512.png"), 512)
    img_192 = render_svg_to_png(svg_source, os.path.join(web_dir, "icon-192.png"), 192)
    img_180 = render_svg_to_png(svg_source, os.path.join(web_dir, "apple-touch-icon.png"), 180)
    img_32 = render_svg_to_png(svg_source, os.path.join(web_dir, "favicon-32x32.png"), 32)
    img_16 = render_svg_to_png(svg_source, os.path.join(web_dir, "favicon-16x16.png"), 16)
    
    # Multi-resolution favicon.ico (16, 32, 48)
    ico_path = os.path.join(web_dir, "favicon.ico")
    master_1024.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated multi-res ICO: {ico_path} (16, 32, 48)")
    
    # 3. Mirror into shared/design-system/branding
    branding_dir = os.path.join(root_dir, "shared", "design-system", "branding")
    for f in ["icon-512.png", "icon-192.png", "apple-touch-icon.png", "favicon-32x32.png", "favicon-16x16.png", "favicon.ico"]:
        src = os.path.join(web_dir, f)
        dst = os.path.join(branding_dir, f)
        shutil.copy2(src, dst)
        print(f"Mirrored: {dst}")

    # 4. Android Mipmaps
    # mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192
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
        
        sq_img = render_svg_to_png(svg_source, square_path, size)
        create_round_icon(sq_img, round_path, size)
        
    print("\nAll brand icons generated successfully!")

if __name__ == "__main__":
    main()
