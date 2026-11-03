# Workspace Rules & Knowledge for zariel.dev

## Media & Video Assets Standards
- **Formats**: Video assets in `public/videos/` must provide optimized `.webm` (VP9) files alongside fallback `.mp4` files.
- **Playback Component**: Always use [`<SmartVideo>`](file:///mnt/code/git/repos/zariel.dev/src/components/SmartVideo.tsx) for web video playback. It automatically resolves the `.webm` stream with `.mp4` fallback.
- **Encoding Standards**: Background and decorative videos must use 2-pass VP9 (`libvpx-vp9`), constrained quality (`-b:v` + `-crf`), and audio stripped (`-an`) when running muted.
- **Documentation**: See [`VIDEO_OPTIMIZATION.md`](file:///mnt/code/git/repos/zariel.dev/VIDEO_OPTIMIZATION.md) for full benchmarks, encoding settings, and SSIM verification commands.
