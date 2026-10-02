#!/usr/bin/env bash
set -euo pipefail

# DiskWarren — Local DMG Packaging, Signing & Notarization Script
echo "=== DiskWarren DMG Packager ==="

APP_PATH="${1:-build/DiskWarren.app}"
OUTPUT_DMG="${2:-dist/DiskWarren.dmg}"

if [ ! -d "$APP_PATH" ]; then
    echo "Error: Application bundle not found at $APP_PATH"
    echo "Build the application first using: swift build -c release"
    exit 1
fi

mkdir -p "$(dirname "$OUTPUT_DMG")"

# Temporary DMG staging directory
STAGING_DIR=$(mktemp -d -t warren_dmg_staging)
trap 'rm -rf "$STAGING_DIR"' EXIT

echo "Staging application..."
cp -R "$APP_PATH" "$STAGING_DIR/"
ln -s /Applications "$STAGING_DIR/Applications"

echo "Creating compressed DMG image..."
hdiutil create -volname "DiskWarren" \
    -srcfolder "$STAGING_DIR" \
    -ov -format UDZO \
    "$OUTPUT_DMG"

echo "DMG successfully created at: $OUTPUT_DMG"
shasum -a 256 "$OUTPUT_DMG"
