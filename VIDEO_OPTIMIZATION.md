# Video Optimization & WebM Conversion Guide

This document records the video compression strategy, benchmark results, and FFmpeg command reference used for optimizing web video delivery across the site.

---

## 1. Overview & Benchmark Results

Video assets are heavily utilized in the Hero and About sections as animated backgrounds and visual showcases. Originally delivered as H.264 MP4 files, they accounted for **~42.9 MB** of uncompressed payload.

Converting them to **WebM (VP9 codec)** with dual-pass constrained-quality encoding resulted in a **68.3% total bandwidth reduction (~29.3 MB saved)** while preserving high visual fidelity (SSIM > 0.95).

| Video Asset | Source Location | Original MP4 Size | WebM VP9 Size | Reduction | SSIM Score | Resolution / FPS |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `vlhlll.webm` | `/public/videos/vlhlll.webm` | 31.4 MB | **7.9 MB** | **-74.8%** | 0.956 | 1920x1200 @ 30 fps |
| `feature-1.webm` | `/public/videos/feature-1.webm` | 11.0 MB | **5.4 MB** | **-50.9%** | 0.980 | 1920x1080 @ 30 fps |
| `feature-4.webm` | `/public/videos/feature-4.webm` | 519 KB | **369 KB** | **-28.9%** | 0.993 | 720x720 @ 30 fps |
| **Total** | | **42.9 MB** | **13.6 MB** | **-68.3% (-29.3 MB)** | | |

---

## 2. Key Optimization Strategies

### A. Constrained Quality (CQ) 2-Pass VP9 Encoding
- **Two-Pass Analysis**: Pass 1 analyzes frame motion and complexity to build a statistics log. Pass 2 allocates bitrate dynamically to prevent artifacts in complex scenes while aggressively compressing static or low-motion frames.
- **Constrained Quality Mode**: Combines target bitrate (`-b:v`) with a Constant Rate Factor (`-crf`). This caps bitrate spikes on high-motion bursts while avoiding unnecessary bit waste during calmer sections.
- **Multi-threading (`-row-mt 1`)**: Enables row-based multi-threading for faster encoding on multi-core processors.

### B. Stripping Silent Audio Tracks (`-an`)
- Several source videos (notably `vlhlll.mp4`) contained silent AAC audio tracks (`mean_volume: -91.0 dB`).
- Stripping the audio channel via `-an` removed unnecessary overhead since all background video components (`SmartVideo`) run muted.

### C. HTML5 Modern Fallback Architecture
- Video delivery is handled through `src/components/SmartVideo.tsx`.
- Modern browsers (Chrome, Firefox, Safari 15+, Edge) parse `<source type="video/webm" />` first and only download the lightweight WebM file.
- The existing `.mp4` files remain in `public/videos/` as fallback sources for legacy clients.

```tsx
<video muted loop playsInline preload="metadata" {...props}>
  {src && (
    <>
      <source src={src.replace(/\.(mp4|webm)$/i, ".webm")} type="video/webm" />
      <source src={src.replace(/\.(mp4|webm)$/i, ".mp4")} type="video/mp4" />
    </>
  )}
</video>
```

---

## 3. FFmpeg Commands Reference for Future Videos

To convert future video assets with the same quality standard, use the following commands:

### Standard 1080p / 1200p Background Video (Hero / Large Bento)
```bash
# Pass 1: Analysis
ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -b:v 4000k -crf 34 \
  -pass 1 -passlogfile /tmp/ffmpeg2pass \
  -cpu-used 2 -row-mt 1 -an -f null /dev/null

# Pass 2: Output Generation
ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -b:v 4000k -crf 34 \
  -pass 2 -passlogfile /tmp/ffmpeg2pass \
  -cpu-used 1 -row-mt 1 -an output.webm
```

### Medium Resolution / Bento Card Showcase (e.g. 720p / Square)
```bash
# Pass 1: Analysis
ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -b:v 600k -crf 44 \
  -pass 1 -passlogfile /tmp/ffmpeg2pass \
  -cpu-used 2 -row-mt 1 -an -f null /dev/null

# Pass 2: Output Generation
ffmpeg -y -i input.mp4 -c:v libvpx-vp9 -b:v 600k -crf 44 \
  -pass 2 -passlogfile /tmp/ffmpeg2pass \
  -cpu-used 1 -row-mt 1 -an output.webm
```

### Quality Verification (SSIM / PSNR Check)
To check visual similarity between the original MP4 and converted WebM:
```bash
ffmpeg -i output.webm -i input.mp4 -lavfi "ssim;[0:v][1:v]psnr" -f null -
```
*(Aim for an overall SSIM score $\ge 0.95$ for visually lossless web presentation).*
