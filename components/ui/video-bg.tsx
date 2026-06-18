"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  poster?: string;
  startSeconds?: number;
  endSeconds?: number;
}

export function VideoBackground({ src, poster, startSeconds = 0, endSeconds }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably serialize the `muted` prop as a DOM attribute.
    // Setting it via ref is required for iOS Safari to allow autoplay.
    video.muted = true;

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

    // Handle already-cached video where loadedmetadata already fired
    if (video.readyState >= 1) {
      onReady();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("timeupdate", loop);
      video.removeEventListener("ended", restart);
    };
  }, [startSeconds, endSeconds]);

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
        preload="auto"
        poster={poster}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
