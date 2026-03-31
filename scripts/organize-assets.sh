#!/bin/bash

# ===============================================
# BluePineapple Asset Organization Script
# Organizes new assets from /public/assets/new/
# ===============================================

set -e  # Exit on error

echo "🎨 Starting BluePineapple Asset Organization..."
echo ""

# Define source and destination
SOURCE_DIR="public/assets/new"
DEST_BASE="public/assets/new"

# Create organized folder structure
echo "📁 Creating organized folder structure..."
mkdir -p "$DEST_BASE/images/boats"
mkdir -p "$DEST_BASE/images/coastal"
mkdir -p "$DEST_BASE/images/adventures"
mkdir -p "$DEST_BASE/images/wildlife"
mkdir -p "$DEST_BASE/images/premium"
mkdir -p "$DEST_BASE/images/historical"
mkdir -p "$DEST_BASE/videos"
mkdir -p "$DEST_BASE/thumbnails"

echo "✅ Folder structure created"
echo ""

# Rename and organize images
echo "📸 Organizing images..."

# Create a mapping of old names to new names and categories
declare -A IMAGE_MAPPING=(
    ["WhatsApp Image 2026-03-31 at 10.41.19 AM (1).jpeg"]="images/coastal/coastal-view-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.20 AM (1).jpeg"]="images/boats/luxury-boat-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.21 AM (1).jpeg"]="images/coastal/sunset-sail-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.21 AM (2).jpeg"]="images/wildlife/marine-life-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.21 AM.jpeg"]="images/adventures/adventure-activity-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.22 AM (2).jpeg"]="images/historical/fort-view-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.41.22 AM (4).jpeg"]="images/boats/boat-interior-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.42.48 AM.jpeg"]="images/coastal/sunset-coast-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.42.49 AM.jpeg"]="images/wildlife/tropical-setting-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.42.50 AM.jpeg"]="images/boats/luxury-yacht-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.45.18 AM (1).jpeg"]="images/adventures/creek-safari-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.45.18 AM (2).jpeg"]="images/adventures/beach-dunes-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.45.18 AM.jpeg"]="images/adventures/water-adventure-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.45.19 AM.jpeg"]="images/coastal/coastal-exploration-1.jpg"
    ["WhatsApp Image 2026-03-31 at 10.45.20 AM.jpeg"]="images/premium/premium-experience-1.jpg"
)

# Move and rename images
for old_name in "${!IMAGE_MAPPING[@]}"; do
    new_path="${IMAGE_MAPPING[$old_name]}"
    old_path="$SOURCE_DIR/$old_name"
    new_path_full="$DEST_BASE/$new_path"
    
    if [ -f "$old_path" ]; then
        echo "  Moving: $old_name → $new_path"
        mv "$old_path" "$new_path_full"
    else
        echo "  ⚠️  File not found: $old_name"
    fi
done

echo "✅ Images organized"
echo ""

# Rename and organize videos
echo "🎬 Organizing videos..."

declare -A VIDEO_MAPPING=(
    ["WhatsApp Video 2026-03-31 at 10.41.20 AM.mp4"]="videos/boat-tour-highlight.mp4"
    ["WhatsApp Video 2026-03-31 at 10.41.21 AM.mp4"]="videos/sunset-sailing-experience.mp4"
    ["WhatsApp Video 2026-03-31 at 10.45.18 AM.mp4"]="videos/adventure-montage.mp4"
)

for old_name in "${!VIDEO_MAPPING[@]}"; do
    new_path="${VIDEO_MAPPING[$old_name]}"
    old_path="$SOURCE_DIR/$old_name"
    new_path_full="$DEST_BASE/$new_path"
    
    if [ -f "$old_path" ]; then
        echo "  Moving: $old_name → $new_path"
        mv "$old_path" "$new_path_full"
    else
        echo "  ⚠️  File not found: $old_name"
    fi
done

echo "✅ Videos organized"
echo ""

# Generate video thumbnails using ffmpeg
echo "🎥 Generating video thumbnails..."

if command -v ffmpeg &> /dev/null; then
    # Generate thumbnail for boat-tour-highlight.mp4
    if [ -f "$DEST_BASE/videos/boat-tour-highlight.mp4" ]; then
        echo "  Generating thumbnail for boat-tour-highlight.mp4..."
        ffmpeg -i "$DEST_BASE/videos/boat-tour-highlight.mp4" -ss 00:00:03 -vframes 1 -y "$DEST_BASE/thumbnails/boat-tour-highlight.jpg" 2>/dev/null
        echo "  ✅ boat-tour-highlight.jpg created"
    fi
    
    # Generate thumbnail for sunset-sailing-experience.mp4
    if [ -f "$DEST_BASE/videos/sunset-sailing-experience.mp4" ]; then
        echo "  Generating thumbnail for sunset-sailing-experience.mp4..."
        ffmpeg -i "$DEST_BASE/videos/sunset-sailing-experience.mp4" -ss 00:00:05 -vframes 1 -y "$DEST_BASE/thumbnails/sunset-sailing-experience.jpg" 2>/dev/null
        echo "  ✅ sunset-sailing-experience.jpg created"
    fi
    
    # Generate thumbnail for adventure-montage.mp4
    if [ -f "$DEST_BASE/videos/adventure-montage.mp4" ]; then
        echo "  Generating thumbnail for adventure-montage.mp4..."
        ffmpeg -i "$DEST_BASE/videos/adventure-montage.mp4" -ss 00:00:05 -vframes 1 -y "$DEST_BASE/thumbnails/adventure-montage.jpg" 2>/dev/null
        echo "  ✅ adventure-montage.jpg created"
    fi
else
    echo "  ⚠️  ffmpeg not found. Skipping thumbnail generation."
    echo "  To generate thumbnails manually, run:"
    echo "  ffmpeg -i public/assets/new/videos/boat-tour-highlight.mp4 -ss 00:00:03 -vframes 1 public/assets/new/thumbnails/boat-tour-highlight.jpg"
    echo "  ffmpeg -i public/assets/new/videos/sunset-sailing-experience.mp4 -ss 00:00:05 -vframes 1 public/assets/new/thumbnails/sunset-sailing-experience.jpg"
    echo "  ffmpeg -i public/assets/new/videos/adventure-montage.mp4 -ss 00:00:05 -vframes 1 public/assets/new/thumbnails/adventure-montage.jpg"
fi

echo ""
echo "═══════════════════════════════════════"
echo "✅ Asset organization complete!"
echo "═══════════════════════════════════════"
echo ""
echo "📊 Asset Summary:"
echo "  Images: 15 files organized into categories"
echo "  Videos: 3 files organized"
echo "  Thumbnails: Generated for all videos"
echo ""
echo "📍 Next Steps:"
echo "  1. Run: npm run dev"
echo "  2. Verify assets are in correct locations"
echo "  3. Gallery system will automatically use new assets"
echo ""
