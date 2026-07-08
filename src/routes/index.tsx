import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/enkai/MagneticButton";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div id="home" className="relative overflow-hidden bg-navy text-parchment">
      <Hero />
      <MissionVision />
      <WhyEnkai />
      <ChapterAbout />
      <PortfolioGlimpse />
      <Process />
      <Services />
      <Insights />
      <Reels />
      <Contact />
    </div>
  );
}

/* ================= HERO ================= */
const heroImages = [hero1, hero2, hero3, hero4];

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Ken-Burns collage */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className={`h-full w-full object-cover ${
                i === idx ? "scale-110" : "scale-100"
              } transition-transform duration-[6000ms] ease-out`}
            />
          </div>
        ))}
        {/* gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(1,42,74,0.4) 45%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 radial-gold-glow opacity-70" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-16 bg-gold/50" />
          <span className="font-ui text-[11px] tracking-[0.5em] uppercase text-gold">
            India's Real-Time Event Media Company
          </span>
          <span className="h-px w-16 bg-gold/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-parchment max-w-5xl"
        >
          Every event, <em className="italic text-parchment/70">told live</em>,<br />
          the moment it happens.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 2.7 }}
          className="font-script text-4xl md:text-5xl gold-text gold-glow mt-8"
        >
          Where Every Event Goes Social
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-12"
        >
          <MagneticButton as="a" href="#about">
            Explore Our World
          </MagneticButton>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-ui text-[10px] tracking-[0.4em] uppercase text-parchment/50">
            Scroll
          </span>
          <span className="relative h-12 w-px bg-gradient-to-b from-gold/60 to-transparent overflow-hidden">
            <span className="absolute top-0 left-0 h-4 w-px bg-gold animate-float" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= MISSION & VISION ================= */
function MissionVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const bookEase = [0.22, 1, 0.36, 1] as const;
  const openDuration = 1.35;

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-navy overflow-hidden">
      <div className="absolute inset-0 radial-gold-glow opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="relative grid md:grid-cols-2"
          style={{ perspective: "2000px", perspectiveOrigin: "center center" }}
        >
          {/* Spine */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: bookEase }}
            style={{ transformOrigin: "center" }}
            className="hidden md:block pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold to-transparent z-10"
          />

          <BookCard
            side="left"
            inView={inView}
            duration={openDuration}
            ease={bookEase}
            variant="navy"
            label="Our Mission"
            title="To redefine event storytelling."
            body="We exist to transform every event into a real-time digital experience — capturing moments, publishing instantly, and turning presence into reach. Speed is our craft; presence is our discipline; social is our stage."
          />
          <BookCard
            side="right"
            inView={inView}
            duration={openDuration}
            ease={bookEase}
            variant="burgundy"
            label="Our Vision"
            title="India's most trusted Real-Time Event Media Company."
            body="To become the definitive standard for live event coverage in India — a name every host, brand and personality reaches for when a moment must not just happen, but be seen, felt and shared as it unfolds."
          />
        </div>
      </div>
    </section>
  );
}

function BookCard({
  side,
  inView,
  duration,
  ease,
  variant,
  label,
  title,
  body,
}: {
  side: "left" | "right";
  inView: boolean;
  duration: number;
  ease: readonly [number, number, number, number];
  variant: "navy" | "burgundy";
  label: string;
  title: string;
  body: string;
}) {
  const bg = variant === "navy" ? "bg-navy-deep" : "bg-burgundy";
  const isLeft = side === "left";
  const contentDelay = duration * 0.7;

  // Initial: both cards collapsed to the center spine (scaleX 0 from inner edge),
  // then "open" outward with a slight Y rotation for the book effect.
  const initial = {
    rotateY: 0,
    x: isLeft ? 40 : -40,
    scaleX: 0.6,
    opacity: 0.6,
  };
  const animate = inView
    ? { rotateY: isLeft ? -10 : 10, x: 0, scaleX: 1, opacity: 1 }
    : {};

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, ease: [...ease] }}
      style={{
        transformOrigin: isLeft ? "right center" : "left center",
        transformStyle: "preserve-3d",
        boxShadow: isLeft
          ? "-20px 30px 60px -20px rgba(0,0,0,0.5)"
          : "20px 30px 60px -20px rgba(0,0,0,0.5)",
      }}
      className={`${bg} relative px-8 md:px-14 py-16 md:py-20 overflow-hidden`}
    >
      <div className="absolute top-0 right-0 h-32 w-32 opacity-20 pointer-events-none">
        <div className="absolute inset-0 radial-gold-glow" />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: contentDelay + 0.05, ease: [...ease] }}
        style={{ transformOrigin: "left" }}
        className="h-px w-16 bg-gold mb-6"
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: contentDelay + 0.1 }}
        className="font-ui text-[11px] tracking-[0.4em] uppercase text-gold mb-6"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: contentDelay + 0.2, ease: [...ease] }}
        className="font-heading text-3xl md:text-5xl leading-[1.05] text-parchment max-w-lg"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: contentDelay + 0.32, ease: [...ease] }}
        className="justify-pretty mt-8 text-parchment/75 max-w-lg text-[15px]"
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

/* ================= WHY ENKAI ================= */
const pillars = [
  {
    n: "01",
    title: "Real-Time Execution",
    body:
      "Content leaves the venue as fast as the moment it captures — edited, captioned and published while the applause is still in the air.",
  },
  {
    n: "02",
    title: "Speed With Strategy",
    body:
      "Pace never breaks the plan. Every reel, still and story is briefed, styled and sequenced to serve the larger narrative of the event.",
  },
  {
    n: "03",
    title: "Dedicated Media Team",
    body:
      "A single embedded crew — producers, shooters, editors, publishers — deployed on ground, working as one, accountable to one clock.",
  },
  {
    n: "04",
    title: "Social-First Approach",
    body:
      "We shoot for the feed first, the archive second. Aspect ratios, hooks and captions are baked into the shot list, not decided afterwards.",
  },
  {
    n: "05",
    title: "Presence-Based Coverage",
    body:
      "Being there matters. Our team lives inside the event — not covering it from the wings, but moving with the room, the artist and the audience.",
  },
];

const traits = ["Premium", "Present", "Dynamic", "Reliable", "Modern", "Elegant"];

function WhyEnkai() {
  return (
    <section className="relative py-32 md:py-44 bg-navy-deep">
      <div className="absolute inset-0 radial-burgundy-glow opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="What Makes Us Different"
          title={<>Why <em className="italic text-parchment/60">Enkai</em>.</>}
        />

        <div className="mt-20 grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -top-8 -left-4 font-heading text-[7rem] leading-none gold-text opacity-25 select-none pointer-events-none"
              >
                {p.n}
              </span>
              <div className="relative">
                <span className="block h-0.5 w-8 bg-burgundy-bright mb-5" />
                <h3 className="font-heading text-2xl text-parchment">{p.title}</h3>
                <p className="justify-pretty mt-4 text-parchment/65 text-[15px] max-w-sm">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center gap-3">
          <span className="font-ui text-[11px] tracking-[0.4em] uppercase text-gold mr-2">
            Brand DNA —
          </span>
          {traits.map((t) => (
            <span
              key={t}
              className="font-ui text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 rounded-full px-4 py-2 hover:bg-gold/15 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ABOUT / CHAPTER ================= */
function ChapterAbout() {
  return (
    <section id="about" className="relative py-40 md:py-56 bg-navy">
      <div className="absolute inset-0 radial-gold-glow opacity-50" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-ui text-[11px] tracking-[0.5em] uppercase text-burgundy-bright"
        >
          Chapter One
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="mt-6 font-heading text-5xl md:text-7xl leading-[1.05] text-parchment"
        >
          About <em className="italic text-parchment/50">Enkai Social</em>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hairline-gold h-px w-40 mx-auto my-10 origin-left"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.55 }}
          className="justify-pretty text-parchment/75 text-lg leading-[1.9] max-w-3xl mx-auto"
        >
          Enkai — from the Japanese <em>宴会</em>, a gathering, a banquet, a celebration
          — is India's Real-Time Event Media Company. We stand at the intersection of
          live production and social storytelling, embedded in the room while the room
          is still alive. From gala nights and press days to campus festivals and
          corporate summits, we translate presence into publishing, and moments into
          motion — before the moment ends.
        </motion.p>
      </div>
    </section>
  );
}

/* ================= PORTFOLIO GLIMPSE ================= */
const glimpses = [
  {
    img: portfolio1,
    tag: "College · Cultural Festival",
    title: "DAV & JIT Live",
    desc: "Two flagship campus festivals covered live end-to-end — stage, backstage and student feeds, publishing in the same breath.",
  },
  {
    img: portfolio2,
    tag: "Leadership · Summit",
    title: "The Boardroom Series",
    desc: "Executive summits transformed into shareable social keynotes — soundbites, stills and reels landing before the session closes.",
  },
];

function PortfolioGlimpse() {
  return (
    <section className="relative py-32 md:py-40 bg-navy-deep">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeading
            kicker="Selected Work"
            title={<>A <em className="italic text-parchment/60">glimpse</em> of the floor.</>}
            align="left"
          />
          <p className="justify-pretty text-parchment/60 max-w-md text-[15px]">
            Two signature moments from our recent live coverage. The full archive —
            events, personalities, campaigns — lives on the portfolio page.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {glimpses.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-xl border border-white/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  className="h-full w-full object-cover transition-all duration-[900ms] ease-out"
                  style={{ filter: "grayscale(30%) brightness(0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "none")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(30%) brightness(0.75)")}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl ring-[1.5px] ring-gold shadow-[0_8px_40px_rgba(212,175,55,0.25)]" />
              <div
                className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(1,34,60,0.85) 45%, rgba(0,0,0,0.9))",
                }}
              >
                <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-gold">
                  {g.tag}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-parchment mt-2">
                  {g.title}
                </h3>
                <p className="justify-pretty mt-2 text-parchment/75 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {g.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/portfolio" className="inline-block">
            <MagneticButton as="a" href="/portfolio">
              View Full Portfolio
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================= PROCESS ================= */
const steps = [
  { n: "01", title: "Planning", body: "Brief, shot-list, publishing calendar — locked before day zero." },
  { n: "02", title: "On-Ground Activation", body: "Crew deployed, gear staged, brand tone rehearsed with the client." },
  { n: "03", title: "Real-Time Content Creation", body: "Reels, stories and stills cut in a live edit bay, on site." },
  { n: "04", title: "Live Publishing", body: "Approvals and posts flow in minutes — not the next morning." },
  { n: "05", title: "Engagement & Analytics", body: "Community managed live, performance reported same-day." },
];

function Process() {
  return (
    <section className="relative py-32 md:py-40 bg-black">
      <div className="absolute inset-0 radial-burgundy-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Method"
          title={<>End-to-end <em className="italic text-parchment/60">live marketing.</em></>}
        />

        <div className="mt-20 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 md:gap-16 min-w-max pr-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-[280px] md:w-[320px] shrink-0"
              >
                <div className="font-heading text-7xl md:text-8xl gold-text leading-none">
                  {s.n}
                </div>
                <div className="mt-4 h-px w-16 bg-gold/50" />
                <h3 className="font-heading text-2xl mt-6 text-parchment">{s.title}</h3>
                <p className="font-ui text-sm text-parchment/60 mt-3 justify-pretty">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traditional vs Enkai comparison */}
        <div className="mt-24 rounded-xl border border-gold/15 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <ComparisonRow
            variant="muted"
            label="Traditional Coverage"
            items={[
              "Shoot today · Edit tomorrow",
              "Approvals over days",
              "Post-event highlight reel",
              "Reactive community management",
            ]}
          />
          <div className="h-px hairline-gold" />
          <ComparisonRow
            variant="enkai"
            label="The Enkai Way"
            items={[
              "Capture, cut, caption — on site",
              "Publish inside minutes",
              "Live reels while the room is live",
              "Real-time engagement, same-day report",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  variant,
  label,
  items,
}: {
  variant: "muted" | "enkai";
  label: string;
  items: string[];
}) {
  const isEnkai = variant === "enkai";
  return (
    <div
      className={`grid gap-6 px-6 md:px-10 py-8 md:grid-cols-[220px_1fr] items-center ${
        isEnkai ? "bg-navy/50" : "bg-transparent"
      }`}
    >
      <div className="font-heading text-xl">
        <span className={isEnkai ? "text-parchment" : "text-parchment/50"}>
          {label}
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                isEnkai
                  ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.9)] animate-gold-pulse"
                  : "bg-burgundy/70"
              }`}
            />
            <span
              className={`font-ui text-[13px] leading-relaxed ${
                isEnkai ? "text-parchment" : "text-parchment/45"
              }`}
            >
              {it}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= SERVICES ================= */
const services = [
  { icon: "◈", title: "Live Event Coverage", body: "Full-crew, multi-cam presence with a live edit bay on site." },
  { icon: "❋", title: "Social Reels Production", body: "Scroll-first vertical storytelling, shot and cut for the algorithm." },
  { icon: "✦", title: "Celebrity & Press Days", body: "Green-room to red-carpet, publishing pack ready before wrap." },
  { icon: "◉", title: "Brand Storytelling", body: "Long-form films that live beyond the event — for websites and campaigns." },
  { icon: "⊛", title: "Real-Time Publishing", body: "Copywriting, approvals and posting — inside minutes, not days." },
  { icon: "✧", title: "Analytics & Reporting", body: "Same-day performance decks with reach, watch-time and sentiment." },
];

function Services() {
  return (
    <section className="relative py-32 md:py-40 bg-navy">
      <div className="absolute inset-0 radial-gold-glow opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="What We Do"
          title={<>Premium <em className="italic text-parchment/60">services.</em></>}
        />
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className="group relative p-8 rounded-xl border border-gold/15 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              style={{
                background: "rgba(1,42,74,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gold/10 border border-gold/30 text-gold text-2xl transition-all duration-500 group-hover:bg-gold/20 group-hover:shadow-[0_0_28px_rgba(212,175,55,0.55)]">
                {s.icon}
              </div>
              <h3 className="font-heading text-2xl text-parchment mt-6">{s.title}</h3>
              <p className="justify-pretty mt-3 text-parchment/65 text-[14px]">
                {s.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-ui text-[11px] tracking-[0.3em] uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Enquire <span>→</span>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= INSIGHTS ================= */
const stats = [
  { value: 240, suffix: "+", label: "Events Covered" },
  { value: 80, suffix: "+", label: "Personalities" },
  { value: 45, suffix: "M+", label: "Total Reach" },
  { value: 18, suffix: "", label: "Cities Active" },
];

function Insights() {
  return (
    <section className="relative py-32 md:py-40 bg-black">
      <div className="absolute inset-0 radial-gold-glow opacity-45" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="The Numbers"
          title={<>Reach that <em className="italic text-parchment/60">shows up.</em></>}
        />
        <div className="mt-20 grid gap-y-16 md:gap-y-0 gap-x-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Counter key={i} {...s} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="relative text-center">
      <div className="absolute inset-0 -z-10 grid place-items-center">
        <div className="h-40 w-40 rounded-full bg-gold/10 blur-3xl animate-gold-pulse" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay }}
        className="font-heading text-7xl md:text-8xl gold-text leading-none"
      >
        {n}
        {suffix}
      </motion.div>
      <div className="mt-4 h-px w-14 mx-auto bg-gold/40" />
      <div className="mt-4 font-ui text-[11px] tracking-[0.35em] uppercase text-parchment/60">
        {label}
      </div>
    </div>
  );
}

/* ================= REELS ================= */
const reels = [
  { title: "Backstage · Gala Night", tag: "Reel", offset: 0 },
  { title: "Runway Walk", tag: "Reel", offset: 30 },
  { title: "Live Keynote", tag: "Reel", offset: 60 },
  { title: "Confetti Drop", tag: "Reel", offset: 20 },
];

function Reels() {
  return (
    <section className="relative py-32 md:py-40 bg-navy-deep overflow-hidden">
      <div className="absolute inset-0 radial-burgundy-glow opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <SectionHeading
              kicker="From the Feed"
              title={<>Live from <em className="italic text-parchment/60">@enkaisocial.</em></>}
              align="left"
            />
            <p className="justify-pretty mt-6 max-w-md text-parchment/70">
              Reels shot, cut and published while the moment was still happening. Follow
              along for a running feed of the events we're inside right now.
            </p>
            <div className="mt-10">
              <MagneticButton as="a" href="https://instagram.com/enkaisocial">
                Follow @enkaisocial
              </MagneticButton>
            </div>
          </div>

          <div className="relative h-[560px]">
            {reels.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                className="absolute rounded-xl overflow-hidden border border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-float"
                style={{
                  width: 180,
                  height: 320,
                  left: `${(i * 24) % 100}%`,
                  top: `${r.offset}px`,
                  transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                <img
                  src={heroImages[i % heroImages.length]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-ui text-[9px] tracking-[0.3em] uppercase text-gold">
                    {r.tag}
                  </p>
                  <p className="font-heading text-sm text-parchment mt-1">
                    {r.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-40 bg-navy">
      <div className="absolute inset-0">
        <img src={hero1} alt="" className="h-full w-full object-cover opacity-30 blur-md" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(1,42,74,0.7), rgba(0,0,0,0.85))",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          kicker="Let's Talk"
          title={<>Bring us your <em className="italic text-parchment/60">next event.</em></>}
        />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-16 grid gap-6 rounded-2xl p-8 md:p-12 border border-gold/20"
          style={{
            background: "rgba(1,34,60,0.55)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Your Name" placeholder="Full name" />
            <Field label="Email" type="email" placeholder="you@company.com" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Event Type" placeholder="Gala · Summit · Festival · Wedding…" />
            <Field label="Date & City" placeholder="March 2027 · Delhi" />
          </div>
          <div>
            <label className="font-ui text-[11px] tracking-[0.3em] uppercase text-gold">
              Tell us about it
            </label>
            <textarea
              rows={4}
              placeholder="Scale, vibe, expectations…"
              className="mt-3 w-full bg-transparent border-b border-gold/30 focus:border-gold outline-none py-3 text-parchment placeholder:text-parchment/30 resize-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <MagneticButton>Send Enquiry</MagneticButton>
            <div className="flex items-center gap-4 text-parchment/60">
              <a href="mailto:hello@enkaisocial.in" className="hover:text-gold transition-colors font-ui text-xs tracking-widest">Email</a>
              <span className="h-3 w-px bg-gold/30" />
              <a href="https://wa.me/" className="hover:text-gold transition-colors font-ui text-xs tracking-widest">WhatsApp</a>
              <span className="h-3 w-px bg-gold/30" />
              <a href="https://instagram.com/enkaisocial" className="hover:text-gold transition-colors font-ui text-xs tracking-widest">Instagram</a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-ui text-[11px] tracking-[0.3em] uppercase text-gold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-gold/30 focus:border-gold outline-none py-3 text-parchment placeholder:text-parchment/30 transition-colors"
      />
    </div>
  );
}

/* ================= SHARED ================= */
function SectionHeading({
  kicker,
  title,
  align = "center",
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-6 ${alignCls}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-burgundy-bright" />
        <span className="font-ui text-[11px] tracking-[0.4em] uppercase text-burgundy-bright">
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-heading text-4xl md:text-6xl leading-[1.05] text-parchment max-w-3xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
