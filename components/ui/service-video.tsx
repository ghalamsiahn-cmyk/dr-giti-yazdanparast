"use client";

interface Props {
  src: string;
  startTime?: number;
}

export function ServiceVideo({ src, startTime = 0 }: Props) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      onLoadedMetadata={(e) => {
        if (startTime > 0) e.currentTarget.currentTime = startTime;
      }}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}
