"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  startSeconds?: number;
  endSeconds?: number;
}

export function VideoBackground({
  src,
  mobileSrc,
  poster,
  mobilePoster,
  startSeconds = 0,
  endSeconds,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably serialize `muted` as a DOM attribute.
    // Setting via ref is required for iOS Safari autoplay.
    video.muted = true;

    // Pick portrait crop on mobile to avoid aggressive zoom from cover on landscape source
    const isMobile = window.innerWidth < 640;
    video.src = isMobile && mobileSrc ? mobileSrc : src;
    const activePoster = isMobile && mobilePoster ? mobilePoster : poster;
    if (activePoster) video.poster = activePoster;
    video.load();

    const onReady = () => {
      video.currentTime = startSeconds;
      video.play().catch(() => {});
    };

    const loop = () => {
      if (endSeconds !== undefined && video.currentTime >= endSeconds) {
        video.currentTime = startSeconds;
      }
    };

    const restart = () => {
      video.currentTime = startSeconds;
      video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("timeupdate", loop);
    video.addEventListener("ended", restart);

    if (video.readyState >= 1) onReady();

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("timeupdate", loop);
      video.removeEventListener("ended", restart);
    };
  }, [src, mobileSrc, poster, mobilePoster, startSeconds, endSeconds]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
