"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { site } from "@/content/site";
import { AnimatedPhotoStack } from "@/components/ui/animated-photo-stack";
import { TypewriterText } from "@/components/ui/typewriter-text";

/*
  Phase ladder (sequential typewriter):
    0 – waiting for scroll-trigger
    1 – label "درباره ما" typing
    2 – heading typing
    3 – subtitle typing
    4…N – paragraph[i] typing  (i = phase - 4)
    N+1  – button fades in
*/

export default function About() {
  const { about } = site;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [phase, setPhase] = useState(0);

  // Kick off animation when section enters viewport
  useEffect(() => {
    if (isInView && phase === 0) setPhase(1);
  }, [isInView, phase]);

  const advance = (to: number) =>
    setPhase((prev) => (prev === to - 1 ? to : prev));

  const buttonPhase = 4 + about.paragraphs.length;

  return (
    <section ref={sectionRef} id="about" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text column (right in RTL) ──────────────────── */}
          <div>
            {/* Gold label */}
            <p className="text-[11px] tracking-[0.45em] uppercase text-gold font-medium mb-5 min-h-[1em]">
              <TypewriterText
                text="درباره ما"
                speed={55}
                isActive={phase >= 1}
                onComplete={() => advance(2)}
              />
            </p>

            {/* Heading */}
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-darktext leading-tight mb-4 min-h-[1em]">
              <TypewriterText
                text={about.title}
                speed={48}
                isActive={phase >= 2}
                onComplete={() => advance(3)}
              />
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-sans text-primary font-medium mb-8 leading-relaxed min-h-[1em]">
              <TypewriterText
                text={about.intro}
                speed={32}
                isActive={phase >= 3}
                onComplete={() => advance(4)}
              />
            </p>

            {/* Paragraphs — each starts after previous completes */}
            <div className="space-y-4 text-base leading-[1.9] text-darktext/65">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="min-h-[1em]">
                  <TypewriterText
                    text={p}
                    speed={16}
                    isActive={phase >= 4 + i}
                    onComplete={() => advance(5 + i)}
                  />
                </p>
              ))}
            </div>

            {/* CTA button — fades in after all text is done */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= buttonPhase ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className="inline-block mt-10 text-[13px] font-sans font-medium px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-cream transition-all duration-200"
              >
                مشاوره رایگان
              </a>
            </motion.div>
          </div>

          {/* ── Photos column (left in RTL) ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedPhotoStack
              photo={about.photo}
              photo2={about.photo2}
              badgeNumber="۱۰+"
              badgeLabel="سال تجربه"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
