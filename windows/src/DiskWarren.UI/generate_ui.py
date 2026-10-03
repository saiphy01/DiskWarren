import os

template_path = r"C:\Users\saiph\DiskWarren\windows\src\DiskWarren.UI\ui_template.html"
target_cs_path = r"C:\Users\saiph\DiskWarren\windows\src\DiskWarren.UI\UiHtml.cs"

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
