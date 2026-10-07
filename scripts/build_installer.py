import os
import zipfile
import subprocess
import shutil

repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
publish_dir = os.path.join(repo_root, "windows", "artifacts", "recover_publish")
setup_dir = os.path.join(repo_root, "windows", "src", "DiskWarren.Recover.Setup")
payload_zip = os.path.join(setup_dir, "payload.zip")

print("1. Creating payload.zip from recover_publish...")
with zipfile.ZipFile(payload_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
    for root, _, files in os.walk(publish_dir):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, publish_dir)
            zf.write(full_path, rel_path)
            print(f"  Added: {rel_path}")

print(f"Payload created: {os.path.getsize(payload_zip):,} bytes")

print("2. Publishing DiskWarren.Recover.Setup...")
setup_csproj = os.path.join(setup_dir, "DiskWarren.Recover.Setup.csproj")
setup_out = os.path.join(repo_root, "windows", "artifacts", "setup_publish")
cmd = [
    "dotnet", "publish", setup_csproj,
    "-c", "Release",
    "-r", "win-x64",
    "--self-contained", "true",
    "-p:PublishSingleFile=true",
    "-o", setup_out
]
subprocess.run(cmd, check=True)

built_setup_exe = os.path.join(setup_out, "DiskWarrenRecover-Setup-1.0.0.exe")
dest_installer = os.path.join(repo_root, "web", "public", "downloads", "DiskWarrenRecover-Setup.exe")

print(f"3. Copying {built_setup_exe} -> {dest_installer}...")
shutil.copy2(built_setup_exe, dest_installer)

print(f"Installer ready at {dest_installer} ({os.path.getsize(dest_installer):,} bytes)")
