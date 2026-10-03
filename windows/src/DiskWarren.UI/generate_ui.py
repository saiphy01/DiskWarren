import os

script_dir = os.path.dirname(os.path.abspath(__file__))
template_path = os.path.join(script_dir, "ui_template.html")
target_cs_path = os.path.join(script_dir, "UiHtml.cs")

with open(template_path, "r", encoding="utf-8") as f:
    html = f.read()

# Escape double quotes for C# verbatim string literal
escaped_html = html.replace('"', '""')

cs_content = f"""namespace DiskWarren.UI;

public static class UiHtml
{{
    public const string Content = @\"{escaped_html}\";
}}
"""

with open(target_cs_path, "w", encoding="utf-8") as f:
    f.write(cs_content)

print(f"Successfully generated {target_cs_path} ({len(cs_content)} chars)")
