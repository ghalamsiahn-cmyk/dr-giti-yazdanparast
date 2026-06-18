"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
} from "framer-motion";
import { useRef } from "react";

interface Props {
  photo?: string;
  photo2?: string;
  badgeNumber?: string;
  badgeLabel?: string;
}

// ── Gold sparkle particles ───────────────────────────────────────────
const SPARKLES = [
  { top: "3%",  right: "20%", size: 5,   dur: 3.2, delay: 0.2 },
  { top: "16%", right: "1%",  size: 3.5, dur: 4.8, delay: 1.4 },
  { top: "48%", right: "-2%", size: 4,   dur: 3.6, delay: 0.8 },
  { top: "6%",  left: "24%",  size: 3,   dur: 4.2, delay: 2.1 },
  { top: "72%", left: "4%",   size: 4.5, dur: 3.8, delay: 1.6 },
  { top: "38%", left: "1%",   size: 2.5, dur: 5.1, delay: 0.4 },
];

// ── Per-card 3-D tilt + inner glow component ─────────────────────────
function TiltCard({
  children,
  className,
  floatY,       // [from, to] values for float keyframe
  floatDelay = 0,
  entranceDelay = 0,
  isVisible,
  aurora = false,
}: {
  children: React.ReactNode;
  className: string;
  floatY: [number, number];
  floatDelay?: number;
  entranceDelay?: number;
  isVisible: boolean;
  aurora?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Per-card mouse state
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 130, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 130, damping: 22 });
  const sc   = useSpring(1, { stiffness: 220, damping: 24 });

  // Mouse-follow inner light
  const glowX = useTransform(mx, [-1, 1], [15, 85]);
  const glowY = useTransform(my, [-1, 1], [15, 85]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201,164,92,0.22) 0%, transparent 58%)`;

  function onMove(e: React.MouseEvent) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
    sc.set(1.04);
  }
  function onLeave() {
    mx.set(0); my.set(0); sc.set(1);
  }

  return (
    // Entrance: clip-path wipe from bottom
    <motion.div
      className={`${className} overflow-visible`}
      initial={{ clipPath: "inset(102% 0% 0% 0%)", opacity: 0 }}
      animate={
        isVisible
          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          : { clipPath: "inset(102% 0% 0% 0%)", opacity: 0 }
      }
      transition={{ duration: 1.0, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Float layer — gentle bob */}
      <motion.div
        className="w-full h-full"
        animate={{ y: [floatY[0], floatY[1], floatY[0]], rotate: [0, 0.6, -0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      >
        {/* 3-D tilt layer */}
        <motion.div
          ref={cardRef}
          className="w-full h-full relative"
          style={{ rotateX: rotX, rotateY: rotY, scale: sc, transformPerspective: 900 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* Spinning aurora glow — main photo only */}
          {aurora && (
            <motion.div
              className="absolute -inset-[5px] rounded-2xl pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, #C9A45C55, #8B6FA375, #5E3A6E55, #C9A45C20, #C9A45C55)",
                filter: "blur(9px)",
                zIndex: 0,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Card content (above the aurora) */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>

          {/* Mouse-follow inner glow (top layer) */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-20"
            style={{ background: glowBg }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Main export ──────────────────────────────────────────────────────
export function AnimatedPhotoStack({
  photo,
  photo2,
  badgeNumber = "۱۰+",
  badgeLabel = "سال تجربه",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  return (
    <div ref={containerRef} className="relative h-[480px] sm:h-[560px] select-none">

      {/* Gold sparkle particles */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{
            top: s.top,
            width: s.size,
            height: s.size,
            ...(("right" in s) ? { right: (s as typeof s & { right: string }).right } : { left: (s as typeof s & { left: string }).left }),
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={
            isInView
              ? { opacity: [0, 0.9, 0.4, 0.8, 0], scale: [0, 1, 0.8, 1, 0], y: [0, -10, -5, -20, -30] }
              : { opacity: 0, scale: 0 }
          }
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main photo — top right ────────────────── */}
      <TiltCard
        className="absolute top-0 right-0 w-[62%] h-[72%]"
        floatY={[0, -16]}
        floatDelay={0}
        entranceDelay={0.1}
        isVisible={isInView}
        aurora
      >
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/30">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="کلینیک دکتر گیتی یزدانپرست" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-soft/30 to-primary/20 flex items-center justify-center">
              <span className="text-primary/25 text-sm font-sans">عکس کلینیک</span>
            </div>
          )}
          {/* Periodic shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/14 to-transparent pointer-events-none"
            animate={{ x: ["-130%", "170%"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 5.5, ease: "easeInOut" }}
          />
        </div>
      </TiltCard>

      {/* ── Secondary photo — bottom left ────────── */}
      <TiltCard
        className="absolute bottom-0 left-0 w-[55%] h-[60%]"
        floatY={[0, 14]}
        floatDelay={1.3}
        entranceDelay={0.38}
        isVisible={isInView}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-primary/20 border-4 border-white">
          {photo2 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo2} alt="خدمات کلینیک" className="w-full h-full object-cover object-left" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-deep/40 to-primary/30 flex items-center justify-center">
              <span className="text-cream/40 text-sm font-sans">عکس خدمات</span>
            </div>
          )}
        </div>
      </TiltCard>


    </div>
  );
}
