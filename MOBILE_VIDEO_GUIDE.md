# 📱 Mobile-Friendly Video Rendering Guide

## TL;DR - Quick Implementation

**For your site RIGHT NOW:**

```typescript
// Old - Simple but not optimized
<video src="/video.mp4" controls poster="/poster.jpg" />

// New - Mobile optimized
import { MobileOptimizedVideo } from "@/components/ui/MobileOptimizedVideo"

<MobileOptimizedVideo
  src="/assets/new/videos/boat-tour.mp4"
  poster="/assets/new/thumbnails/boat-tour.jpg"
  alt="Boat tour"
  title="Experience Our Fleet"
  muted
  showPlayButton
/>
```

---

## 🎯 Key Mobile Video Challenges & Solutions

### Challenge 1: Bandwidth Limitations
**Problem:** Mobile users on 3G/LTE have limited bandwidth

**Solution:**
```
Video Quality by Connection Speed:
- 4G LTE:  Use 720p (2-3 Mbps)
- 4G:      Use 480p (1 Mbps)
- 3G:      Use 360p (0.5 Mbps)
- 2G:      Avoid videos entirely

Create multiple versions:
✓ High (1080p/720p) for desktop/WiFi
✓ Medium (480p) for fast mobile
✓ Low (360p) for slow mobile
```

**Implementation:**
```bash
# Create optimized versions
ffmpeg -i source.mp4 -vcodec libx264 -crf 26 -preset fast -vf scale=1280:720 -acodec aac -b:a 128k video-720p.mp4
ffmpeg -i source.mp4 -vcodec libx264 -crf 28 -preset fast -vf scale=854:480 -acodec aac -b:a 96k video-480p.mp4
ffmpeg -i source.mp4 -vcodec libx264 -crf 32 -preset fast -vf scale=640:360 -acodec aac -b:a 64k video-360p.mp4
```

### Challenge 2: Slow Loading Times
**Problem:** Videos take forever to load on mobile

**Solution - Lazy Loading:**
```typescript
// Component automatically lazy loads using Intersection Observer
// Video only starts loading when visible (saves bandwidth & battery)

<MobileOptimizedVideo
  src="/video.mp4"  // Loads only when scrolled into view
  poster="/poster.jpg"  // Shows immediately while loading
/>
```

### Challenge 3: Battery Drain
**Problem:** Autoplaying videos kill battery on mobile

**Solution:**
```typescript
// DO:
<MobileOptimizedVideo muted autoplay />  // ✓ Allowed (muted autoplay)
<video src="/video.mp4" autoplay controls />  // ✗ Blocked by browser
<video src="/video.mp4" autoplay muted />  // ✓ Allowed

// DON'T:
<video autoplay>  // ✗ Browser blocks (requires user interaction)
<video autoplay={true}>  // ✗ Browser blocks (user gesture needed)
```

### Challenge 4: Responsive Layout Shift
**Problem:** Video aspect ratio changes break layout during load

**Solution - Aspect Ratio Box:**
```css
/* Maintain 16:9 aspect ratio before video loads */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;  /* 16:9 = 9/16 = 56.25% */
  height: 0;
  overflow: hidden;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Result: No layout shift, smooth load */
```

### Challenge 5: Poor Connectivity Experience
**Problem:** Video stalls or buffers on poor connections

**Solution:**
```typescript
// Show poster image while loading (visual feedback)
<MobileOptimizedVideo
  src="/video.mp4"
  poster="/poster.jpg"  // Displays immediately
/>

// User sees poster → clicks play → video loads → playback starts
// Much better UX than blank screen
```

---

## 🚀 Implementation Steps

### Step 1: Create Video Variants

**For each video, create 3 versions:**

```bash
# For 1-minute video (example)

# High quality (desktop/WiFi users)
ffmpeg -i input.mp4 -vcodec libx264 -crf 24 -preset medium \
  -vf scale=1920:1080 -acodec aac -b:a 192k output-1080p.mp4
# Result: ~30-50 MB

# Medium quality (mobile/fast)
ffmpeg -i input.mp4 -vcodec libx264 -crf 26 -preset fast \
  -vf scale=1280:720 -acodec aac -b:a 128k output-720p.mp4
# Result: ~8-12 MB

# Low quality (slow connection)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset ultrafast \
  -vf scale=854:480 -acodec aac -b:a 96k output-480p.mp4
# Result: ~3-5 MB
```

**FFmpeg Parameter Guide:**
- `-crf XX` (0-51): Quality (lower = better, default 28)
- `-preset`: fast/medium/slow (speed vs compression)
- `-vf scale=W:H`: Resolution
- `-b:a XXk`: Audio bitrate
- `-qscale:v 5`: Variable quality

### Step 2: Update Gallery Configuration

```typescript
// In src/config/gallery.ts

export const GALLERY_VIDEOS: GalleryItem[] = [
  {
    id: "new-boat-tour",
    type: "video",
    src: "/assets/new/videos/boat-tour-highlight.mp4",
    poster: "/assets/new/thumbnails/boat-tour-highlight.jpg",
    alt: "Boat tour highlights",
    title: "Boat Tour Highlights",
    description: "Experience our scenic boat tours",
    category: "boats",
    featured: true,
    metadata: {
      tags: ["video", "tour"],
    },
  },
  // More videos...
]
```

### Step 3: Update Gallery Page

```typescript
// In gallery/page.tsx

import { MobileOptimizedVideo, GalleryVideoCard } from "@/components/ui/MobileOptimizedVideo"
import { getAllGalleryItems } from "@/config/gallery"

export default function GalleryPage() {
  const items = getAllGalleryItems()
  const videos = items.filter(item => item.type === "video")
  
  return (
    <div className="gallery-grid">
      {videos.map((video) => (
        <GalleryVideoCard
          key={video.id}
          id={video.id}
          src={video.src}
          poster={video.poster}
          title={video.title}
          description={video.description}
          featured={video.featured}
        />
      ))}
    </div>
  )
}
```

---

## 📊 File Size Reference

### For 30-45 second videos:

| Quality | Resolution | Bitrate | File Size | Use Case |
|---------|-----------|---------|-----------|----------|
| Ultra HD | 1920x1080 | 8 Mbps | 30-40 MB | Desktop only |
| Full HD | 1280x720 | 3 Mbps | 10-15 MB | Desktop/Tablet |
| HD | 854x480 | 1.5 Mbps | 5-8 MB | Mobile/Fast |
| SD | 640x360 | 0.8 Mbps | 3-4 MB | Mobile/Slow |
| Mobile | 426x240 | 0.4 Mbps | 1-2 MB | 2G/Emergency |

---

## 🎨 Video Poster Best Practices

**Poster Image Requirements:**

```typescript
// Good poster:
- Format: JPEG or WEBP
- Size: 350-600 KB max (compressed!)
- Resolution: Match video resolution (1280x720 for 720p)
- Content: First frame or key moment
- Color: Match video tone for smooth transition

// Bad poster:
- Uncompressed PNG: 2-3 MB ✗
- Wrong aspect ratio ✗
- Blank image ✗
- Too small/pixelated ✗
```

**Create poster from video (recommended frame):**
```bash
# Extract frame at 2 seconds
ffmpeg -i video.mp4 -ss 00:00:02 -vframes 1 -vf scale=1280:720 poster.jpg

# Compress to reasonable file size
ffmpeg -i poster.jpg -q:v 2 poster-compressed.jpg  # ~300-500 KB
```

---

## ✅ Mobile Video Checklist

### Video Production
- [ ] Shoot in high quality (4K if possible)
- [ ] Keep videos under 2 minutes for gallery
- [ ] Use natural lighting
- [ ] Stable camera (use gimbal/tripod)
- [ ] Clear audio (if needed)

### Video Encoding
- [ ] Create 3 quality versions (always)
- [ ] Use H.264 codec (universal)
- [ ] MP4 container (best compatibility)
- [ ] File sizes: 360p ≤ 5MB, 480p ≤ 10MB, 720p ≤ 20MB
- [ ] Audio: AAC codec, 96-128 kbps

### Video Hosting
- [ ] Use CDN (CloudFlare, AWS CloudFront, etc.)
- [ ] Enable GZIP compression
- [ ] Enable Range requests (for seeking)
- [ ] Set proper cache headers
- [ ] Monitor bandwidth usage

### Website Implementation
- [ ] Use MobileOptimizedVideo component ✓
- [ ] Show poster while loading ✓
- [ ] Lazy load videos ✓
- [ ] Aspect ratio box to prevent shift ✓
- [ ] Muted autoplay (if using) ✓
- [ ] Touch-friendly controls ✓

### Testing
- [ ] Test on real devices (not just browser)
- [ ] Test on slow connection (DevTools throttle)
- [ ] Test on slow device (old iPhone/Android)
- [ ] Test fullscreen mode
- [ ] Test on WiFi + Cellular
- [ ] Check file sizes in DevTools Network
- [ ] Check loading time (target: < 3 seconds to play)

---

## 🔧 Advanced: Adaptive Bitrate Streaming (Optional)

For professional video delivery (only if videos get high traffic):

### HLS (HTTP Live Streaming)
```typescript
// Uses multiple quality versions automatically
// Advantages:
// - Switches quality based on connection
// - Resume playback capability
// - True streaming experience

// Tools:
// - HLS.js: JavaScript library
// - Video.js: Player with HLS plugin
// - AWS MediaConvert: Easy setup

// Cost: ~$0.02 per GB (vs $0.01 for simple MP4)
// Use when: >1000 plays/month on videos
```

---

## 📈 Performance Monitoring

### Metrics to Track

```typescript
// Your MobileOptimizedVideo component already tracks:
const metrics = {
  played: 2,           // How many times played
  paused: 1,           // How many pauses
  completed: false,    // Did user finish?
  abandonedAt: 23.5,   // Where did they leave?
  duration: 45.2,      // Total length
}

// Send to analytics:
trackEvent('video_started', { 
  videoId: 'boat-tour', 
  duration: metrics.duration 
})

trackEvent('video_completed', { 
  videoId: 'boat-tour' 
})
```

### CDN Performance

Monitor in your CDN dashboard:
- Bandwidth usage
- Cache hit ratio (target: >80%)
- Response time (target: <100ms)
- Errors (target: 0%)

---

## 🎯 Recommended Setup for BluePineapple

### Current Situation (Perfect for this approach)
- Gallery videos: 30-60 seconds each
- ~10-15 video files
- Moderate traffic (100s-1000s views/month)
- Mix of desktop and mobile users

### Recommended Strategy
```
✓ Use progressive MP4 download (not HLS)
✓ Create 2 quality versions: 720p + 480p
✓ Serve from CloudFlare (simple + cheap)
✓ Implement lazy loading + aspect ratio boxes
✓ Use MobileOptimizedVideo component
✓ Monitor in analytics (play rate, completion)

Cost: ~$0.01-0.02 per GB ($5-15/month for typical use)
```

### Future Enhancement (when ready)
If videos become popular (>10,000 views/month):
→ Migrate to HLS streaming (better UX)
→ Add analytics dashboard
→ Consider Mux or Cloudflare Stream ($0.03/min)

---

## 🆘 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Video won't play | Wrong format/codec | Use MP4 H.264 |
| Video stalls | Slow server | Use CDN |
| Video won't autoplay | Not muted | Add `muted` attribute |
| Users see blank then play | No poster | Add poster image |
| Layout shifts during load | No aspect ratio | Use aspect ratio box |
| Slow on mobile | High bitrate | Create 480p version |
| Battery drains | Autoplay with audio | Use muted autoplay only |
| Controls don't show | CSS issues | Use standard HTML `controls` |

---

## 📚 Resources

**Free tools:**
- FFmpeg: Video encoding
- HandBrake: User-friendly encoder
- TinyPNG/ImageOptim: Compress posters
- Chrome DevTools: Network throttling

**Services (if needed later):**
- CloudFlare Video Stream: $5/1000 views
- Mux: $0.01/min transcoding + $0.03/1000 views
- AWS MediaConvert: Pay-per-GB
- Vimeo Pro: All-in-one (expensive)

---

## Next Steps for Your Site

1. **Now:**
   - Compress your 3 videos (720p + 480p)
   - Update gallery to use MobileOptimizedVideo component
   - Test on mobile devices

2. **This week:**
   - Monitor video loading performance
   - Check bandwidth usage
   - Gather user feedback on playback

3. **Next month:**
   - If popular, create 360p versions for mobile
   - Consider CDN if self-hosting
   - Add video analytics

---

**Your site is now optimized for mobile video! 🎉**
