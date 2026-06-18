"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface Props {
  videoId: string;
  startSeconds?: number;
  endSeconds?: number;
}

export function YoutubeBackground({ videoId, startSeconds = 0, endSeconds }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let player: any = null;

    const createPlayer = () => {
      if (!mountRef.current) return;

      player = new window.YT.Player(mountRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: startSeconds,
          ...(endSeconds !== undefined ? { end: endSeconds } : {}),
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady: (event: any) => {
            const iframe: HTMLIFrameElement = event.target.getIframe();
            Object.assign(iframe.style, {
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.78vh",
              transform: "translate(-50%, -50%)",
              border: "none",
              pointerEvents: "none",
              opacity: "0",
              transition: "opacity 0.8s ease",
            });
            event.target.playVideo();
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (event: any) => {
            // State 1 = PLAYING → fade iframe in
            if (event.data === 1) {
              const iframe: HTMLIFrameElement = event.target.getIframe();
              iframe.style.opacity = "1";
            }
            // State 0 = ENDED → loop back to startSeconds
            if (event.data === 0) {
              event.target.seekTo(startSeconds, true);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      // Load the API script if not already added
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
      // Chain with any previous callback (avoid clobbering)
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        createPlayer();
      };
    }

    return () => {
      try { player?.destroy(); } catch { /* ignore */ }
    };
  }, [videoId, startSeconds, endSeconds]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* YT.Player inserts the iframe as a child of this div */}
      <div ref={mountRef} />
    </div>
  );
}
