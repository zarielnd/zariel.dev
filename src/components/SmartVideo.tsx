import { useEffect, useRef } from "react";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
}

export const SmartVideo: React.FC<SmartVideoProps> = ({
  src,
  children,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      {...props}
    >
      {src && (
        <>
          {/\.(mp4|webm)$/i.test(src) ? (
            <>
              <source
                src={src.replace(/\.(mp4|webm)$/i, ".webm")}
                type="video/webm"
              />
              <source
                src={src.replace(/\.(mp4|webm)$/i, ".mp4")}
                type="video/mp4"
              />
            </>
          ) : (
            <source src={src} />
          )}
        </>
      )}
      {children}
    </video>
  );
};
