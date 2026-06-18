"use client";
import { useRef, useState, useEffect } from "react";

interface VideoItem {
  src: string;
  startTime?: number;
}

export function LocalVideoCycle({ videos }: { videos: VideoItem[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const current = videos[index];
    video.src = current.src;
    video.load();

    const onCanPlay = () => {
      if (current.startTime) video.currentTime = current.startTime;
      video.play().catch(() => {});
    };

    const onEnded = () => setIndex((prev) => (prev + 1) % videos.length);

    video.addEventListener("canplay", onCanPlay, { once: true });
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
    };
  }, [index, videos]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ zIndex: 1 }}
    />
  );
}
