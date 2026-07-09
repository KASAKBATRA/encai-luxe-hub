import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type CSSProperties, type SyntheticEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  Play,
  Quote,
  X,
  User,
  LayoutGrid,
  ClipboardList,
  Target,
  Fingerprint,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Globe,
  ShieldCheck,
  Award,
  Rocket,
  Users,
  Trophy,
  Edit3,
  Megaphone,
  TrendingUp,
  BarChart3,
  Star,
  Handshake,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";

import {
  ALL_PROJECTS_ENKAI,
  TABS_ENKAI,
  GALLERY_PREVIEW_COUNT_ENKAI,
  type Project,
  type ProjectStat,
  type ProjectImpactStat,
  type ProjectHighlightIcon,
} from "./projectdata";
import { Navbar } from "@/components/enkai/Navbar";


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
   SCOPED LIGHTBOX DARK PALETTE
   Exactly mirrors Echelon's dark overlay block 
   with Enkai's gold (#d4af37) as --amber.
   ───────────────────────────────────────────── */
const overlayThemeVars = {
  "--pf-bg": "#121014",
  "--pf-panel": "#1c181f",
  "--pf-panel-2": "#221e25",
  "--pf-fg": "#f6f2ea",
  "--pf-fg-soft": "rgba(246,242,234,0.75)",
  "--pf-fg-mute": "rgba(246,242,234,0.5)",
  "--pf-border": "rgba(212,175,55,0.18)",
  "--amber": "#d4af37",
} as CSSProperties;

function getInstagramHandle(url: string) {
  return url.split("/")[3]?.split("?")[0] ?? "enkai.social";
}

function isVideoSource(src: string) {
  return /\.(mp4|mov|webm)(\?.*)?$/i.test(src);
}

function getRoundedCounterValue(rawValue: string) {
  const match = rawValue.trim().match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { value: 0, suffix: rawValue.trim() };
  }
  return {
    value: Number.parseFloat(match[1]),
    suffix: match[2].trim(),
  };
}

/* ─────────────────────────────────────────────
   ECHELON HELPER COMPONENTS
   ───────────────────────────────────────────── */

type ProjectMediaProps = {
  src: string;
  alt: string;
  className?: string;
  mediaClassName?: string;
  fallbackRatio?: string;
  fit?: "cover" | "contain";
  eager?: boolean;
  onClick?: () => void;
  showPlayBadge?: boolean;
  objectPosition?: string;
  autoPlay?: boolean;
  controls?: boolean;
  poster?: string;
  lockAspectRatio?: boolean;
};

function ProjectMedia({
  src,
  alt,
  className,
  mediaClassName,
  fallbackRatio = "1 / 1",
  fit = "cover",
  eager = false,
  onClick,
  showPlayBadge = false,
  objectPosition = "center",
  autoPlay = false,
  controls = false,
  poster,
  lockAspectRatio = false,
}: ProjectMediaProps) {
  const videoSource = isVideoSource(src);
  const [aspectRatio, setAspectRatio] = useState(fallbackRatio);
  const showVideoFallbackPoster = videoSource && !poster && !autoPlay && !controls;

  useEffect(() => {
    setAspectRatio(fallbackRatio);
  }, [fallbackRatio, src]);

  const wrapperStyle: CSSProperties = {
    ...(lockAspectRatio ? {} : { aspectRatio }),
  };

  const mediaStyle: CSSProperties = {
    objectPosition,
  };

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth > 0 && naturalHeight > 0) {
      setAspectRatio(`${naturalWidth} / ${naturalHeight}`);
    }
  };

  const handleVideoLoaded = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (!lockAspectRatio && videoWidth > 0 && videoHeight > 0) {
      setAspectRatio(`${videoWidth} / ${videoHeight}`);
    }
  };

  const mediaClasses = [
    "block h-full w-full",
    fit === "cover" ? "object-cover" : "object-contain",
    mediaClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {videoSource ? (
        <>
          {showVideoFallbackPoster ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--pf-panel-2)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--pf-bg)] shadow-lg">
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              </span>
            </div>
          ) : null}
          <video
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            muted={autoPlay || !controls}
            loop={!controls}
            playsInline
            preload="metadata"
            controls={controls}
            className={mediaClasses}
            style={mediaStyle}
            onLoadedMetadata={handleVideoLoaded}
            onClick={(event) => {
              if (!controls) {
                event.preventDefault();
              }
            }}
          />
        </>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className={mediaClasses}
          style={mediaStyle}
          onLoad={handleImageLoad}
        />
      )}

      {showPlayBadge && videoSource && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--amber)] bg-[rgba(0,0,0,0.55)] text-[var(--amber)] shadow-lg">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </div>
      )}
    </>
  );

  const sharedClasses = [
    "relative block overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={sharedClasses}
        style={wrapperStyle}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={sharedClasses} style={wrapperStyle}>
      {inner}
    </div>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [didAnimate, setDidAnimate] = useState(false);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const { value: numericTarget, suffix } = getRoundedCounterValue(value);

  useEffect(() => {
    const element = counterRef.current;
    if (!element || didAnimate) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setDidAnimate(true);

        const duration = 1500;
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          const currentValue = Math.round(numericTarget * eased);

          setDisplayValue(currentValue.toLocaleString());

          if (elapsed < 1) {
            requestAnimationFrame(step);
          } else {
            setDisplayValue(numericTarget.toLocaleString());
          }
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [didAnimate, numericTarget]);

  return (
    <span ref={counterRef}>
      {displayValue}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="font-heading text-[15px] font-bold uppercase tracking-[0.08em] text-[var(--pf-fg)]">
      {children}
    </div>
  );
}

const HIGHLIGHT_ICON_MAP: Record<ProjectHighlightIcon, LucideIcon> = {
  user: User,
  grid: LayoutGrid,
  clock: Clock3,
  device: Edit3,
  clipboard: ClipboardList,
  target: Target,
  fingerprint: Fingerprint,
  message: MessageSquare,
  image: ImageIcon,
  file: FileText,
  globe: Globe,
  shield: ShieldCheck,
  award: Award,
  rocket: Rocket,
  users: Users,
  trophy: Trophy,
  pencil: Edit3,
  megaphone: Megaphone,
  trending: TrendingUp,
  barChart: BarChart3,
  star: Star,
  handshake: Handshake,
};

function HighlightIcon({
  icon,
  className,
}: {
  icon: ProjectHighlightIcon;
  className?: string;
}) {
  const Icon = HIGHLIGHT_ICON_MAP[icon] ?? Target;
  return <Icon className={className} />;
}

function ImpactStatCard({ icon, number, label }: ProjectImpactStat) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[10px] border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.05)] px-2 py-5 text-center shadow-[0_0_0_1px_rgba(212,175,55,0.06)]">
      <div className="flex items-center justify-center gap-3">
        <span className="shrink-0 text-[16px] leading-none text-[var(--amber)]">{icon}</span>
        <span className="sr-only">divider</span>
      </div>

      <div className="font-heading text-[clamp(15px,1.8vw,20px)] font-medium leading-none text-[var(--amber)]">
        <AnimatedCounter value={number} />
      </div>

      <div className="font-sans text-[8px] uppercase leading-tight tracking-[0.1em] text-[var(--pf-fg-mute)]">
        {label}
      </div>
    </div>
  );
}

function ProjectNavFooter({
  selectedProject,
  filteredProjects,
  setSelectedProject,
  closeLightbox,
}: {
  selectedProject: Project;
  filteredProjects: Project[];
  setSelectedProject: (p: Project) => void;
  closeLightbox: () => void;
}) {
  return (
    <section className="mt-10 border-t border-[var(--pf-border)] pt-5">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProject.id);
            const targetProject = filteredProjects[(currentIndex - 1 + filteredProjects.length) % filteredProjects.length];
            setSelectedProject(targetProject);
          }}
          className="font-sans text-[13px] font-semibold text-[var(--amber)] transition-colors duration-300 hover:text-[var(--pf-fg)]"
        >
          ← Previous Project
        </button>

        <button
          type="button"
          onClick={closeLightbox}
          aria-label="Back to listing"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--pf-border)] text-[var(--amber)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProject.id);
            const targetProject = filteredProjects[(currentIndex + 1) % filteredProjects.length];
            setSelectedProject(targetProject);
          }}
          className="font-sans text-[13px] font-semibold text-[var(--amber)] transition-colors duration-300 hover:text-[var(--pf-fg)]"
        >
          Next Project →
        </button>
      </div>
    </section>
  );
}

function MediaModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[980] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close media preview"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--pf-border)] bg-[var(--pf-panel)] text-[var(--pf-fg)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className="max-h-[85vh] max-w-[92vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <ProjectMedia
          src={src}
          alt={alt}
          fit="contain"
          autoPlay
          controls={isVideoSource(src)}
          className="max-h-[85vh] max-w-[92vw] rounded-[18px] bg-[var(--pf-panel)] shadow-2xl"
          mediaClassName="max-h-[85vh] max-w-[92vw]"
          fallbackRatio="4 / 3"
          lockAspectRatio
          eager
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO CARD (ORIGINAL EDITORIAL LISTING)
   ───────────────────────────────────────────── */
function PortfolioCard({
  item,
  index,
  onOpen,
}: {
  item: Project;
  index: number;
  onOpen: (i: number) => void;
}) {
  // Strict alternating layout requested:
  // Card 1: Image 70 / Text 30
  // Card 2: Text 30 / Image 70
  // Repeat through all cards using index parity.
  const imageFirst = index % 2 === 0;
  const split70 = index % 2 === 0;

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
                  alt={item.name}
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
                    {item.category}
                  </span>
                  <h3 className="font-heading text-parchment leading-[1.12] text-xl md:text-3xl">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-[12px] text-parchment/60">{item.location}</span>
                    <span className="text-parchment/30 text-[10px]">●</span>
                    <span className="font-ui text-[12px] text-parchment/60">{item.year}</span>
                  </div>
                  <p className="text-parchment/70 text-sm leading-[1.6] justify-pretty">
                    {item.blurb}
                  </p>
                  <div className="mt-1 flex items-center">
                    <button className="ml-0 inline-flex items-center gap-2 text-parchment/80 text-xs tracking-[0.25em] uppercase font-ui hover:text-gold transition-colors duration-500">
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
                    {item.category}
                  </span>
                  <h3 className="font-heading text-parchment leading-[1.12] text-xl md:text-3xl">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-ui text-[12px] text-parchment/60">{item.location}</span>
                    <span className="text-parchment/30 text-[10px]">●</span>
                    <span className="font-ui text-[12px] text-parchment/60">{item.year}</span>
                  </div>
                  <p className="text-parchment/70 text-sm leading-[1.6] justify-pretty">
                    {item.blurb}
                  </p>
                  <div className="mt-1 flex items-center">
                    <button className="ml-0 inline-flex items-center gap-2 text-parchment/80 text-xs tracking-[0.25em] uppercase font-ui hover:text-gold transition-colors duration-500">
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
                  alt={item.name}
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
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO SCREEN
   ───────────────────────────────────────────── */
function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const behindScenesRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = activeTab === "All"
    ? ALL_PROJECTS_ENKAI
    : ALL_PROJECTS_ENKAI.filter((p) => p.category === activeTab);

  const openLightbox = (p: Project) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("enkaiPortfolioScrollY", String(window.scrollY || 0));
      sessionStorage.setItem("enkaiPortfolioRestorePending", "true");
      window.history.pushState({ projectModalOpen: true }, "");
    }
    setSelectedProject(p);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    (window as any).__lenisStart?.();
    if (typeof window !== "undefined" && window.history.state?.projectModalOpen) {
      window.history.back();
    }
    const pendingRaw = sessionStorage.getItem("enkaiPortfolioRestorePending");
    if (pendingRaw === "true") {
      const raw = sessionStorage.getItem("enkaiPortfolioScrollY");
      const value = raw == null ? 0 : Number(raw);
      sessionStorage.setItem("enkaiPortfolioRestorePending", "false");
      window.scrollTo({ top: Number.isFinite(value) ? value : 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (selectedProject) {
        setSelectedProject(null);
        const pendingRaw = sessionStorage.getItem("enkaiPortfolioRestorePending");
        if (pendingRaw === "true") {
          const raw = sessionStorage.getItem("enkaiPortfolioScrollY");
          const value = raw == null ? 0 : Number(raw);
          sessionStorage.setItem("enkaiPortfolioRestorePending", "false");
          window.scrollTo({ top: Number.isFinite(value) ? value : 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) {
      setActiveLightbox(null);
      setScrollProgress(0);
      setShowFullGallery(false);
      return;
    }

    setShowFullGallery(false);
    const contentElement = contentRef.current;
    const overlayElement = overlayRef.current;

    if (overlayElement) {
      overlayElement.scrollTo({ top: 0, behavior: "auto" });
    }

    requestAnimationFrame(() => {
      handleOverlayScroll();
    });

    if (contentElement) {
      gsap.fromTo(
        contentElement,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [selectedProject?.id]);

  useEffect(() => {
    const lenisStop = (window as any).__lenisStop as undefined | (() => void);
    const lenisStart = (window as any).__lenisStart as undefined | (() => void);

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      lenisStop?.();
    } else {
      document.body.style.overflow = "";
      lenisStart?.();
    }

    return () => {
      document.body.style.overflow = "";
      lenisStart?.();
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeLightbox) {
          setActiveLightbox(null);
          return;
        }
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, selectedProject]);

  const handleOverlayScroll = () => {
    const overlayElement = overlayRef.current;
    if (!overlayElement) return;

    const maxScroll = overlayElement.scrollHeight - overlayElement.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    setScrollProgress((overlayElement.scrollTop / maxScroll) * 100);
  };

  const openGalleryLightbox = (src: string) => {
    setActiveLightbox(src);
  };

  const visibleGallery = selectedProject
    ? selectedProject.gallery.filter((src) => !src.includes("placeholder.jpg"))
    : [];

  const displayedGallery = showFullGallery
    ? visibleGallery
    : visibleGallery.slice(0, GALLERY_PREVIEW_COUNT_ENKAI);
  const hasMoreGallery = visibleGallery.length > GALLERY_PREVIEW_COUNT_ENKAI;

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
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
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
          </div>
        </div>

        <p className="justify-pretty mt-8 max-w-2xl text-parchment/70">
          A living archive of the rooms we've stood in, the stages we've circled,
          and the moments we've moved from the venue to the feed — in real time.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-3 mt-12">
          {TABS_ENKAI.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-ui tracking-widest uppercase text-xs transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gold text-navy font-semibold"
                  : "bg-transparent text-parchment/80 border border-gold/40 hover:border-gold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mt-16 space-y-14">
          <div className="font-heading text-[15px] font-bold uppercase tracking-[0.08em] text-parchment/90">
            Featured Projects
          </div>
          <div className="mt-3 text-parchment/70 max-w-2xl leading-relaxed text-sm">
            Selected live-event coverage by Enkai Social — galas, summits, festivals, launches and press days across India.
          </div>

          <div className="mt-10 space-y-14">
            {ALL_PROJECTS_ENKAI.map((item, idx) => (
              <div key={item.name} className="mx-auto w-[90%] md:w-[95%]">
                <PortfolioCard item={item} index={idx} onOpen={() => openLightbox(item)} />
              </div>
            ))}
          </div>
        </div>


        {/* Footer Note */}
        <div className="mt-24 flex items-center gap-4">
          <span className="h-px flex-1 hairline-gold" />
          <span className="font-ui text-[10px] tracking-[0.4em] uppercase text-parchment/40">
            End of Archive
          </span>
          <span className="h-px flex-1 hairline-gold" />
        </div>
      </div>

      {/* ─── Premium Lightbox ─── */}
      {selectedProject && (
        <div
          ref={overlayRef}
          style={overlayThemeVars}
          className="fixed inset-0 z-[900] overflow-y-auto overflow-x-hidden bg-[var(--pf-bg)] text-[var(--pf-fg)] [scrollbar-width:none] overscroll-none [scrollbar-color:transparent_transparent] [&::-webkit-scrollbar]:hidden"
          onScroll={handleOverlayScroll}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
        >
          {/* Scroll Progress Bar */}
          <div
            className="fixed left-0 top-0 z-[930] h-[2px] bg-[var(--amber)] transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Header inside overlay */}
          <div className="fixed inset-x-0 top-0 z-[950] [&_header]:bg-[var(--pf-bg)]/70 [&_header]:backdrop-blur-xl">
            <Navbar />
          </div>

          {/* Close Trigger Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="fixed right-5 top-5 z-[940] inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--pf-border)] bg-[var(--pf-panel)] text-[var(--pf-fg)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
          >
            <X className="h-4 w-4" />
          </button>

          <div ref={contentRef} className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-28 md:pt-32">
            <>
              {/* Hero segment */}
              <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                <div className="space-y-3.5 lg:pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[var(--amber)] uppercase">
                      {selectedProject.category}
                    </span>
                    {selectedProject.year ? (
                      <span className="inline-flex items-center gap-1 font-sans text-[12px] text-[var(--pf-fg-mute)] leading-none">
                        <CalendarDays className="h-3.5 w-3.5 text-[var(--amber)]" />
                        <span>{selectedProject.year}</span>
                      </span>
                    ) : null}
                  </div>

                  <h2 className="max-w-2xl font-heading text-[clamp(32px,4.4vw,56px)] font-extrabold leading-[0.95] text-[var(--pf-fg)]">
                    {selectedProject.name}
                  </h2>

                  <p className="max-w-xl font-italic-tagline text-[clamp(14px,1.6vw,18px)] leading-snug text-[var(--amber)]">
                    {selectedProject.blurb}
                  </p>

                  {(selectedProject.location || selectedProject.duration) ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.location ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--pf-border)] bg-[var(--pf-panel)] px-3 py-1.5 font-sans text-[12px] text-[var(--pf-fg-soft)]">
                          <MapPin className="h-3.5 w-3.5 text-[var(--amber)]" />
                          {selectedProject.location}
                        </span>
                      ) : null}

                      {selectedProject.duration ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--pf-border)] bg-[var(--pf-panel)] px-3 py-1.5 font-sans text-[12px] text-[var(--pf-fg-soft)]">
                          <Clock3 className="h-3.5 w-3.5 text-[var(--amber)]" />
                          {selectedProject.duration}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={selectedProject.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--pf-border)] bg-transparent px-4 py-2.5 font-sans text-[12.5px] font-semibold text-[var(--pf-fg)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="font-semibold text-[var(--pf-fg)]">@{getInstagramHandle(selectedProject.instagram)}</span>
                      <span className="mx-2 text-[var(--amber)]">|</span>
                      <span>View on Instagram ↗</span>
                    </a>
                  </div>

                  <p className="max-w-xl font-sans text-[13px] leading-relaxed text-[var(--pf-fg-soft)] text-justify">
                    {selectedProject.description}
                  </p>
                </div>

                <ProjectMedia
                  src={selectedProject.img}
                  alt={selectedProject.name}
                  className="h-full min-h-[300px] w-full rounded-[14px] bg-[var(--pf-panel)] shadow-xl"
                  mediaClassName="rounded-[14px]"
                  fit="cover"
                  lockAspectRatio
                  eager
                />
              </section>

              {/* What we delivered + Stats strip */}
              <section className="mt-10 border-t border-[var(--pf-border)] pt-6">
                <div className={`grid gap-6 ${selectedProject.stats?.length ? "lg:grid-cols-[0.85fr_1.15fr] lg:items-center" : "grid-cols-1"}`}>
                  <div className="space-y-3">
                    <SectionLabel>What We Delivered</SectionLabel>
                    <ul className="space-y-2 pt-1">
                      {selectedProject.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 font-sans text-[13px] leading-relaxed text-[var(--pf-fg-soft)]"
                        >
                          <span className="mt-0.5 text-[13px] font-bold leading-none text-[var(--amber)]">+</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.stats?.length ? (
                    <div className="flex flex-wrap overflow-hidden rounded-[14px] border border-[var(--pf-border)] bg-[var(--pf-panel)] divide-x divide-[var(--pf-border)]">
                      {selectedProject.stats.map((stat) => (
                        <div
                          key={`${stat.label}-${stat.number}`}
                          className="flex-1 min-w-[110px] px-4 py-5 text-center"
                        >
                          <div className="font-heading text-[clamp(24px,3vw,34px)] font-black leading-none text-[var(--amber)]">
                            {stat.number}
                          </div>
                          <div className="mt-2 font-sans text-[9.5px] uppercase tracking-[0.14em] text-[var(--pf-fg-mute)]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>

              {/* Highlights Gallery */}
              {visibleGallery.length > 0 ? (
                <section className="mt-10 space-y-3.5">
                  <SectionLabel>Highlights</SectionLabel>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {displayedGallery.map((src, index) => {
                      const isFeatured = !showFullGallery && index === 0;

                      return (
                        <ProjectMedia
                          key={`${src}-${index}`}
                          src={src}
                          alt={`${selectedProject.name} gallery ${index + 1}`}
                          onClick={() => openGalleryLightbox(src)}
                          showPlayBadge
                          className={`group relative w-full cursor-zoom-in rounded-[8px] border border-transparent bg-[var(--pf-panel)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--amber)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_0_16px_rgba(245,166,35,0.22)] ${
                            isFeatured ? "row-span-2 md:row-span-2 md:col-span-1 md:h-full" : "aspect-[4/3]"
                          }`}
                          mediaClassName="rounded-[8px] transition-transform duration-300 group-hover:scale-[1.02]"
                          fit="cover"
                          lockAspectRatio
                          autoPlay={false}
                          controls={false}
                        />
                      );
                    })}
                  </div>

                  {hasMoreGallery ? (
                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() => setShowFullGallery((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--amber)] bg-transparent px-4 py-2 font-sans text-[12.5px] font-semibold text-[var(--amber)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
                      >
                        <span>{showFullGallery ? "Show Less" : "View Full Gallery"}</span>
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {/* Behind the Scenes Carousel */}
              {selectedProject.behindScenes?.length ? (
                <section className="mt-10 space-y-3.5">
                  <SectionLabel>Behind The Scenes</SectionLabel>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => behindScenesRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                      className="absolute left-1 top-1/2 z-10 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--pf-bg)] shadow-lg transition-transform duration-300 hover:scale-105"
                      aria-label="Scroll behind the scenes left"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div
                      ref={behindScenesRef}
                      className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-11 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      style={{ msOverflowStyle: "none" }}
                    >
                      {selectedProject.behindScenes.map((src, index) => (
                        <ProjectMedia
                          key={`${src}-${index}`}
                          src={src}
                          alt={`${selectedProject.name} behind the scenes ${index + 1}`}
                          className="h-[190px] w-auto snap-start flex-none rounded-[10px] border border-transparent bg-[var(--pf-panel)] shadow-sm"
                          mediaClassName="rounded-[10px]"
                          fallbackRatio="4 / 3"
                          fit="cover"
                          autoPlay={false}
                          controls={false}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => behindScenesRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                      className="absolute right-1 top-1/2 z-10 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--pf-bg)] shadow-lg transition-transform duration-300 hover:scale-105"
                      aria-label="Scroll behind the scenes right"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </section>
              ) : null}

              {/* Impact Narrative & Testimony */}
              {(selectedProject.impactText || selectedProject.impactStats?.length || selectedProject.testimonial) ? (
                <section className="mt-10">
                  <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[0.75fr_1.25fr_0.8fr] lg:gap-6 lg:items-start">
                    {selectedProject.impactText ? (
                      <div>
                        <div className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--amber)]">
                          THE IMPACT
                        </div>
                        <div className="mt-2 h-[2px] w-[26px] bg-[var(--amber)]" />
                        <p className="mt-3 font-sans text-[12.5px] leading-[1.7] text-[var(--pf-fg-soft)] text-justify">
                          {selectedProject.impactText}
                        </p>
                      </div>
                    ) : null}

                    {selectedProject.impactStats?.length ? (
                      <div className="grid min-w-0 grid-cols-4 gap-2">
                        {selectedProject.impactStats.slice(0, 5).map((stat) => (
                          <ImpactStatCard key={`${stat.label}-${stat.number}`} {...stat} />
                        ))}
                      </div>
                    ) : null}

                    {selectedProject.testimonial ? (
                      <div className="relative overflow-hidden rounded-[10px] border-l-[3px] border-l-[var(--amber)] bg-[var(--pf-panel)] px-4 py-3.5">
                        <Quote className="pointer-events-none absolute right-2 top-0 h-[56px] w-[56px] select-none text-[var(--amber)] opacity-[0.14]" />
                        <p className="relative z-[1] font-sans text-[12.5px] italic leading-[1.6] text-[var(--pf-fg)]">
                          "{selectedProject.testimonial.quote}"
                        </p>
                        <div className="my-2.5 h-px w-full bg-[var(--pf-border)]" />
                        <div className="relative z-[1] font-sans text-[11.5px] font-bold text-[var(--pf-fg)]">
                          – {selectedProject.testimonial.author} / {selectedProject.testimonial.designation}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {/* Technologies */}
              {selectedProject.technologies?.length ? (
                <section className="mt-10 space-y-3.5">
                  <SectionLabel>Technologies</SectionLabel>

                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--pf-border)] bg-[var(--pf-panel)] px-3 py-1.5 font-sans text-[12px] font-medium text-[var(--pf-fg-soft)] transition-colors duration-300 hover:bg-[var(--amber)] hover:text-[var(--pf-bg)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* Navigation Footer */}
              <ProjectNavFooter
                selectedProject={selectedProject}
                filteredProjects={filteredProjects}
                setSelectedProject={setSelectedProject}
                closeLightbox={closeLightbox}
              />
            </>
          </div>

          {activeLightbox ? (
            <MediaModal
              src={activeLightbox}
              alt={`${selectedProject.name} preview`}
              onClose={() => setActiveLightbox(null)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}