import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import pf1 from "@/assets/pf-1.jpg";
import pf2 from "@/assets/pf-2.jpg";
import pf3 from "@/assets/pf-3.jpg";
import pf4 from "@/assets/pf-4.jpg";
import pf5 from "@/assets/pf-5.jpg";
import pf6 from "@/assets/pf-6.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Enkai Social" },
      {
        name: "description",
        content:
          "Selected live-event coverage by Enkai Social — galas, summits, festivals, launches and press days across India.",
      },
      { property: "og:title", content: "Portfolio — Enkai Social" },
      {
        property: "og:description",
        content:
          "Selected live-event coverage by Enkai Social — cinematic real-time storytelling across India.",
      },
    ],
  }),
  component: Portfolio,
});

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

type RowAnim = "fade-up" | "slide-left" | "slide-right" | "scale-in";

type Item = {
  img: string;
  title: string;
  location: string;
  year: string;
  cat: string;
  description: string;
};


const allItems: Item[] = [
  {
    img: portfolio1,
    title: "DAV United Festival",
    location: "New Delhi",
    year: "2025",
    cat: "Concerts",
    description:
      "A three-day cultural spectacle bringing together 15,000 attendees across music, art, and dialogue. We captured every stage, every standing ovation, and every backstage whisper — published to the feed before the applause faded.",
  },
  {
    img: pf3,
    title: "Screen Awards Night",
    location: "Mumbai",
    year: "2025",
    cat: "Awards",
    description:
      "India's most glamorous awards night, reimagined as a real-time social narrative. From the red carpet arrivals to the final encore, every frame was shot, cut, and live-published within minutes.",
  },
  {
    img: portfolio2,
    title: "Leadership Summit",
    location: "New Delhi",
    year: "2025",
    cat: "Corporate",
    description:
      "A flagship corporate summit gathering 200+ industry leaders. Keynotes, panel discussions, and networking moments captured and amplified across social platforms in real time.",
  },
  {
    img: pf1,
    title: "Runway Debut",
    location: "Mumbai",
    year: "2025",
    cat: "Launches",
    description:
      "A high-fashion runway launch where every silhouette was a story. We translated the couture into a social-first visual language — bold, editorial, and instantly shareable.",
  },
  {
    img: pf4,
    title: "Stadium Finale",
    location: "Hyderabad",
    year: "2024",
    cat: "Concerts",
    description:
      "A stadium-scale concert finale with 40,000 fans on their feet. The energy was deafening, the lights were blinding, and we were in the thick of it — streaming the story as it unfolded.",
  },
  {
    img: pf5,
    title: "Concert Night",
    location: "Mumbai",
    year: "2025",
    cat: "Concerts",
    description:
      "An electrifying night of live energy — neon lights, a packed room, and a story captured in motion with editorial precision.",
  },
  {
    img: hero3,
    title: "Award Ceremony",
    location: "New Delhi",
    year: "2025",
    cat: "Awards",
    description:
      "A black-tie award evening built like a narrative — from the first arrivals to the final reveal, captured frame-by-frame.",
  },
];



/* ─────────────────────────────────────────────
   LAYOUT CONFIG
   ───────────────────────────────────────────── */

const rowAnimConfig: Record<number, RowAnim> = {
  0: "fade-up",
  1: "slide-left",
  2: "slide-right",
  3: "scale-in",
};


function getAnimVariant(anim: RowAnim) {
  switch (anim) {
    case "fade-up":
      return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
      };
    case "slide-left":
      return {
        initial: { opacity: 0, x: -60 },
        whileInView: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        initial: { opacity: 0, x: 60 },
        whileInView: { opacity: 1, x: 0 },
      };
    case "scale-in":
      return {
        initial: { opacity: 0, scale: 0.92 },
        whileInView: { opacity: 1, scale: 1 },
      };
  }
}

/* ─────────────────────────────────────────────
   PARALLAX HOOK
   ───────────────────────────────────────────── */

function useScrollParallax() {
  const ref = useRef<HTMLDivElement>(null);

  // Kept for section re-entry detection.
  // No active parallax state is used in the editorial redesign.
  useEffect(() => {
    // Intentionally no-op for this editorial layout.
  }, []);


  return { ref };

}

/* ─────────────────────────────────────────────
   PORTFOLIO CARD
   ───────────────────────────────────────────── */

function PortfolioCard({
  item,
  index,
  onOpen,
}: {
  item: Item;
  index: number;
  onOpen: (i: number) => void;
}) {
  // Editorial alternating layout rules requested:
  // 1: Image 70% | Text 30%
  // 2: Text 30% | Image 70%
  // 3: Image | Text (equal-ish)
  // 4: Text | Image (equal-ish)
  // 5-7 continue the pattern.
  const variant = index % 4;
  const imageFirst = variant === 0 || variant === 2;
  const split70 = variant === 0 || variant === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden cursor-pointer mx-auto"
      style={{ borderRadius: "20px" }}
      onClick={() => onOpen(index)}
    >
      {/* Gold border base (premium glass) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(212,175,55,0.28)",
          boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.08)",
          backdropFilter: "blur(14px)",
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          borderRadius: "20px",
          border: "1px solid rgba(212,175,55,0.7)",
          boxShadow: "0 0 0 1px rgba(212,175,55,0.12), 0 0 42px rgba(212,175,55,0.18)",
        }}
      />

      {/* Layout row (single card per row) */}
      <div className="relative flex items-stretch" style={{ borderRadius: "20px" }}>
        {imageFirst ? (
          <>
            <div className={split70 ? "w-[70%]" : "w-[50%]"}>
              <motion.div
                className="relative h-full overflow-hidden"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.04]"
                  style={{ filter: "brightness(0.78)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(1,34,60,0.10) 0%, rgba(1,34,60,0.40) 55%, rgba(1,34,60,0.92) 100%)",
                  }}
                />
              </motion.div>
            </div>

            <div className={split70 ? "w-[30%]" : "w-[50%]"}>
              <div className="h-full p-6 md:p-8 flex flex-col justify-end">
                <div className="flex flex-col gap-4">
                  <span className="font-ui text-[10px] tracking-[0.35em] uppercase text-gold/90">
                    {item.cat}
                  </span>
                  <h3 className="font-heading text-parchment leading-[1.12] text-xl md:text-3xl">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-[12px] text-parchment/60">{item.location}</span>
                    <span className="text-parchment/30 text-[10px]">●</span>
                    <span className="font-ui text-[12px] text-parchment/60">{item.year}</span>
                  </div>
                  <p className="text-parchment/70 text-sm leading-[1.6] justify-pretty">
                    {item.description}
                  </p>
                  <div className="mt-1 flex items-center">
                    <button className="ml-0 inline-flex items-center gap-2 text-parchment/80 text-xs tracking-[0.25em] uppercase font-ui hover:text-gold transition-colors transition-opacity duration-500">
                      <span className="h-0.5 w-14 bg-gold/30" />
                      <span>View Project →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={split70 ? "w-[30%]" : "w-[50%]"}>
              <div className="h-full p-6 md:p-8 flex flex-col justify-end">
                <div className="flex flex-col gap-4">
                  <span className="font-ui text-[10px] tracking-[0.35em] uppercase text-gold/90">
                    {item.cat}
                  </span>
                  <h3 className="font-heading text-parchment leading-[1.12] text-xl md:text-3xl">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-[12px] text-parchment/60">{item.location}</span>
                    <span className="text-parchment/30 text-[10px]">●</span>
                    <span className="font-ui text-[12px] text-parchment/60">{item.year}</span>
                  </div>
                  <p className="text-parchment/70 text-sm leading-[1.6] justify-pretty">
                    {item.description}
                  </p>
                  <div className="mt-1 flex items-center">
                    <button className="ml-0 inline-flex items-center gap-2 text-parchment/80 text-xs tracking-[0.25em] uppercase font-ui hover:text-gold transition-colors transition-opacity duration-500">
                      <span className="h-0.5 w-14 bg-gold/30" />
                      <span>View Project →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={split70 ? "w-[70%]" : "w-[50%]"}>
              <motion.div
                className="relative h-full overflow-hidden"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.04]"
                  style={{ filter: "brightness(0.78)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(1,34,60,0.10) 0%, rgba(1,34,60,0.40) 55%, rgba(1,34,60,0.92) 100%)",
                  }}
                />
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Luxury shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "20px",
          boxShadow: "0 28px 80px rgba(0,0,0,0.55)",
        }}
      />

      {/* Ensure the gold accent reads as a base stroke even without hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: "20px" }}
      />
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────── */

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ backdropFilter: "blur(20px)", background: "rgba(1,34,60,0.88)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-11 h-11 rounded-full border border-gold/30 text-parchment/70 hover:text-gold hover:border-gold transition-all flex items-center justify-center"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev / Next */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gold/30 text-parchment/70 hover:text-gold hover:border-gold transition-all flex items-center justify-center"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 2L4 9L11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gold/30 text-parchment/70 hover:text-gold hover:border-gold transition-all flex items-center justify-center"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 2L14 9L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl w-full grid md:grid-cols-2 gap-0 overflow-hidden"
          style={{
            borderRadius: "24px",
            background: "rgba(1,34,60,0.6)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] overflow-hidden">
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(1,34,60,0.8))",
              }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="font-ui text-[10px] tracking-[0.4em] uppercase text-gold">
              {item.cat}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-parchment mt-4 leading-[1.1]">
              {item.title}
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <span className="font-ui text-sm text-parchment/60">{item.location}</span>
              <span className="text-parchment/30 text-[10px]">●</span>
              <span className="font-ui text-sm text-parchment/60">{item.year}</span>
            </div>
            <div className="h-px w-16 bg-gold/30 mt-6" />
            <p className="justify-pretty mt-6 text-parchment/70 leading-[1.8]">
              {item.description}
            </p>
            <div className="mt-8 flex items-center gap-2 text-parchment/40 text-[11px] tracking-[0.2em] uppercase font-ui">
              <span>{index + 1}</span>
              <span className="h-px flex-1 bg-parchment/10" />
              <span>{items.length}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO PAGE
   ───────────────────────────────────────────── */

function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref } = useScrollParallax();

  const featured = allItems;

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : (p - 1 + featured.length) % featured.length)),
    [featured.length],
  );
  const nextLightbox = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : (p + 1) % featured.length)),
    [featured.length],
  );


  // ESC to close lightbox + arrow navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  // Featured editorial order (single column)
  const items = allItems;


  return (
    <div className="relative bg-navy pt-40 pb-32 min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 radial-gold-glow opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 80% 20%, rgba(128,0,32,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ─── Header ─── */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-burgundy-bright" />
          <span className="font-ui text-[11px] tracking-[0.4em] uppercase text-burgundy-bright">
            From Our Portfolio
          </span>
        </div>
        <h1 className="mt-6 font-heading text-5xl md:text-7xl leading-[1.02] text-parchment max-w-4xl">
          Every event we've been{" "}
          <em className="italic text-parchment/60">inside.</em>
        </h1>
        <p className="justify-pretty mt-8 max-w-2xl text-parchment/70">
          A living archive of the rooms we've stood in, the stages we've circled,
          and the moments we've moved from the venue to the feed — in real time.
        </p>

        {/* ─── Editorial Gallery (Featured Stories) ─── */}
        <div ref={ref} className="mt-20 space-y-14">
          {items.map((item, idx) => (
            <div key={item.title} className="px-0 md:px-2">
              <PortfolioCard item={item} index={idx} onOpen={openLightbox} />
            </div>
          ))}
        </div>



        {/* ─── Footer note ─── */}
        <div className="mt-24 flex items-center gap-4">
          <span className="h-px flex-1 hairline-gold" />
          <span className="font-ui text-[10px] tracking-[0.4em] uppercase text-parchment/40">
            End of Archive
          </span>
          <span className="h-px flex-1 hairline-gold" />
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
