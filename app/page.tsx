"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import interactLogo from "@/public/images/vvit-event-logo.png";
import { ArrowRight, MapPin, Calendar, X, Phone } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { categories, marqueeItems } from "@/data/homeData";
import ParticlesBackground from "@/components/ParticlesBackground";

/* ─────────────────────────────────────────────
    COUNT-UP HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatItem({
  to,
  label,
  prefix = "",
  suffix = "+",
}: {
  to: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(to);
  return (
    <div className="flex flex-col gap-1">
      <span
        ref={ref}
        className="font-display text-5xl md:text-6xl font-extrabold leading-none"
        style={{ color: "hsl(var(--secondary))" }}
      >
        {prefix}
        {count}
        {suffix}
      </span>
      <span
        className="text-xs uppercase tracking-[0.22em] font-semibold"
        style={{ color: "hsl(var(--muted))" }}
      >
        {label}
      </span>
    </div>
  );
}

function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="overflow-hidden py-3 border-y"
      style={{
        borderColor: "hsl(var(--border))",
        background: "hsl(var(--secondary) / 0.05)",
      }}
    >
      <ParticlesBackground />
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 26s linear infinite;
          display: flex;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-6">
            <span
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
            >
              {item}
            </span>
            <span style={{ color: "hsl(var(--secondary))", fontSize: 9 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Events scheduled for INNOVATE IGNITE '26 (from the official plan)
type LineupEvent = {
  name: string;
  venue: string;
  time: string;
  staff: string[];
  coordinators: { name: string; phone: string }[];
  rules: string[];
};

const eventsByDay: { day: string; date: string; events: LineupEvent[] }[] = [
  {
    day: "DAY 1",
    date: "04 Dec 2026",
    events: [
      {
        name: "Ice Breaker",
        venue: "Seminar Hall 1 & 2",
        time: "9:30 AM – 11:00 AM",
        staff: ["Prof. Kousar", "Prof. Masoom Bi"],
        coordinators: [
          { name: "Abitha M", phone: "9902338513" },
          { name: "Shruthi M", phone: "9384620736" },
        ],
        rules: [
          "All the team members must actively participate in the ice breaker.",
          "There will be only one round.",
          "Each team will be given 5–7 mins to complete their task.",
          "Any required props must be arranged beforehand.",
          "Marks will be deducted if it exceeds the time limit.",
        ],
      },
      {
        name: "Techninja (Quiz)",
        venue: "Seminar Hall 1",
        time: "11:00 AM – 1:00 PM",
        staff: ["Prof. Kousar"],
        coordinators: [
          { name: "Arif", phone: "8971663835" },
          { name: "Pratham", phone: "9743476288" },
          { name: "Jaison", phone: "8217756591" },
        ],
        rules: [
          "Number of participants: 2.",
          "There will be three rounds: Preliminary, Second and Final/Stage round.",
          "The participants shall not be allowed to use mobile or other electronic instruments during quiz time.",
        ],
      },
      {
        name: "Code Conflux",
        venue: "002 & 004",
        time: "11:00 AM – 1:00 PM",
        staff: ["Prof. Kusuma"],
        coordinators: [
          { name: "Aditya Raj", phone: "9341606324" },
          { name: "Anushka", phone: "8197197536" },
          { name: "Ashwini", phone: "" },
          { name: "Sushma C", phone: "" },
        ],
        rules: [
          "Number of participants: 2.",
          "Contest is based on OOP & Python programming and bugs.",
          "3 rounds are conducted - ROUND 1: Debugging, ROUND 2: Coding, ROUND 3: Solving with problem definition.",
          "Judge's decision will be final.",
        ],
      },
      {
        name: "Symposium (Group Discussion)",
        venue: "Placement Cell & 304",
        time: "11:00 AM – 1:00 PM",
        staff: ["Prof. Selva Agnes"],
        coordinators: [
          { name: "Varsha S", phone: "7019388708" },
          { name: "Netra S", phone: "8088371640" },
          { name: "Likitha", phone: "9739788564" },
          { name: "Ravikiran", phone: "9742700324" },
        ],
        rules: [
          "Number of participants: 2.",
          "Topics will be provided one day prior.",
          "Time limit: 20 min.",
          "Skills required: Topic knowledge, fluency, relevance.",
          "Do not debate; express the thoughts and keep the discussion going.",
          "Give chance for others to talk. Present your ideas rather than personal attack.",
          "Negative marking for violating the rules.",
        ],
      },
      {
        name: "Collage (Best Out of Waste)",
        venue: "Sports Room",
        time: "2:00 PM – 3:15 PM",
        staff: ["Prof. Sushma B"],
        coordinators: [
          { name: "Sandhya", phone: "9482173354" },
          { name: "Deekshitha", phone: "7676079332" },
        ],
        rules: [
          "Team members: 2.",
          "Teams should bring newspapers/magazines/cello tape/scissors/drawing sheets and so on.",
          "Time limit: 45 minutes.",
          "Each team has to explain about the collage at the end.",
        ],
      },
      {
        name: "Crucial Beats (Singing)",
        venue: "Seminar Hall 2",
        time: "2:00 PM – 3:15 PM",
        staff: ["Prof. Shushma R"],
        coordinators: [
          { name: "Netra S", phone: "8088371640" },
          { name: "Arpitha", phone: "9380724144" },
        ],
        rules: [
          "Participant will not be allowed to refer to the lyrics.",
          "Time limit for the competition is 4 minutes.",
          "Choice of song should be in Kannada, Hindi and English.",
          "Participants should bring their own musical instrument.",
          "The song should not be derogatory language.",
          "Participants will be judged on song selection, voice clarity and rhythm.",
        ],
      },
    ],
  },
  {
    day: "DAY 2",
    date: "05 Dec 2026",
    events: [
      {
        name: "VV-Care",
        venue: "Seminar Hall 1 & 204",
        time: "9:30 AM – 11:00 AM",
        staff: ["Prof. Rajani"],
        coordinators: [
          { name: "Sam Goldwin", phone: "9739431299" },
          { name: "Charan", phone: "6362348311" },
          { name: "Arshad Faraz", phone: "" },
        ],
        rules: [
          "Set an objective for the video content.",
          "Capture a video with vendors and interview them well in advance.",
          "2 students can display the same video in the competition and analyse the issues of vendors and give solutions to the vendor problems.",
          "Time limit for the competition is 6 mins.",
        ],
      },
      {
        name: "Cooking Without Fire",
        venue: "304 & 305",
        time: "10:00 AM – 11:15 AM",
        staff: ["Prof. Sushma B"],
        coordinators: [
          { name: "Arpitha", phone: "9380724144" },
          { name: "Bhaskar", phone: "7975194351" },
        ],
        rules: [
          "Bring your own materials.",
          "No pre-cooked items and chopped items.",
          "Prepare a menu.",
          "At least one nutritious food should be prepared and the benefits should be presented to judges.",
          "Only 2 participants are allowed.",
          "Time divided into 50 mins for cooking, 10 mins for organising the food, 15 min for judgement.",
        ],
      },
      {
        name: "Dance Elite",
        venue: "Seminar Hall 2",
        time: "10:00 AM – 12:00 PM",
        staff: ["Prof. Masoom Bi"],
        coordinators: [
          { name: "K Kavya", phone: "7483563139" },
          { name: "Lavanya K", phone: "8618691906" },
        ],
        rules: [
          "Students should enroll before 2nd December.",
          "Competition includes all forms of dance.",
          "Each performance had 10 mins time limit.",
          "Competitors must submit their music or sound tracks on or before 4th Dec (format mp3, WAV).",
          "Competition format: Solo, pair and groups (max 5).",
        ],
      },
      {
        name: "Talent Mania",
        venue: "Seminar Hall 1",
        time: "11:30 AM – 1:15 PM",
        staff: ["Prof. Pavan Kumar"],
        coordinators: [
          { name: "Akshitha", phone: "8618502663" },
          { name: "Likitha", phone: "9739788564" },
        ],
        rules: [
          "Free style.",
          "Minimum 3 mins, max 5 mins.",
        ],
      },
      {
        name: "Dumb Charades",
        venue: "Seminar Hall 2",
        time: "2:00 PM – 3:45 PM",
        staff: ["Prof. Shushma R"],
        coordinators: [
          { name: "Arpitha", phone: "9380724144" },
          { name: "Deekshitha", phone: "7676079332" },
        ],
        rules: [
          "5 members in each group.",
          "Titles will be given on the spot.",
          "2 mins will be given to guess each title.",
          "If one group doesn't guess the title it will be passed to the next group.",
          "Players should not speak; they have to use hand signals, body language and facial expressions.",
          "Titles will be based on movies, songs, things (Kannada, Hindi, English).",
        ],
      },
      {
        name: "BGMI & Free Fire",
        venue: "004",
        time: "2:00 PM – 4:00 PM",
        staff: ["Prof. Pavan Kumar"],
        coordinators: [
          { name: "Akshitha", phone: "8618502663" },
          { name: "Sushanth", phone: "8603977964" },
          { name: "Anbarasu", phone: "" },
        ],
        rules: [
          "4 player squad.",
          "Both Free Fire and BGMI.",
          "Registration ₹50 for BGMI.",
          "Registration ₹50 for Free Fire.",
          "Map shall be revealed at the time of play.",
          "Cash prize for winner and runner-up with certificates.",
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────
    PAGE
───────────────────────────────────────────── */
export default function Home() {
  const [activeEvent, setActiveEvent] = useState<LineupEvent | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeEvent]);

  useEffect(() => {
    if (!activeEvent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveEvent(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeEvent]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-32"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 60% 35%, hsl(var(--primary) / 0.09) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 5% 85%,  hsl(var(--secondary) / 0.07) 0%, transparent 55%),
            hsl(var(--background))
          `,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-100" />

        {/* ghost year watermark */}
        <div
          className="absolute top-[28%] select-none pointer-events-none transition-all duration-500 max-[550px]:left-1/2 max-[550px]:-translate-x-1/2 max-[550px]:opacity-[0.05] min-[551px]:right-[2%] min-[551px]:opacity-[0.9]"
          style={{ width: "clamp(280px, 40vw, 700px)" }}
          aria-hidden
        >
          <Image
            src={interactLogo}
            alt="Interact Logo Watermark"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 w-full">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="pill-badge mb-8 inline-flex">
              Vijaya Vittala Institute of Technology Presents
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            className="font-display leading-[0.92] mb-5"
            style={{
              // Reduced from clamp(2.5rem, 8vw, 6.5rem)
              fontSize: "clamp(2rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span style={{ color: "hsl(var(--primary))" }}>INTER-COLLEGIATE</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1.5px hsl(var(--secondary))", // Slightly thinner stroke for smaller text
                color: "transparent",
              }}
            >
              EVENTS 2026
            </span>
          </motion.h1>

          {/* tagline */}
          <motion.p
            className="font-mono-jb text-sm uppercase tracking-[0.28em] mb-12"
            style={{ color: "hsl(var(--muted))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Inter-collegiate Event <br /> Registration Portal
          </motion.p>

          {/* stats */}
          <motion.div
            className="stats-row flex flex-wrap gap-y-8 mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatItem to={eventsByDay.reduce((acc, d) => acc + d.events.length, 0)} label="Events" />
            <StatItem to={eventsByDay.length} label="Days" />
            <StatItem to={1000} label="Participants" />
            {/* <div className="flex flex-col gap-1">
              <span
                className="font-display text-5xl md:text-4xl font-extrabold leading-none"
                style={{ color: "hsl(var(--secondary))" }}
              >
                ₹2L+
              </span>
              <span
                className="text-xs uppercase tracking-[0.22em] font-semibold"
                style={{ color: "hsl(var(--muted))" }}
              >
                Prize Pool
              </span>
            </div> */}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.52 }}
          >
            <Link href="/events" className="btn-primary">
              Explore Events <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* meta */}
          <motion.div
            className="flex flex-wrap items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.68 }}
          >
            <span
              className="font-mono-jb text-xs flex items-center gap-2"
              style={{ color: "hsl(var(--muted))" }}
            >
              <Calendar size={12} />
              Dec 4–5, 2026
            </span>
            <span
              className="w-px h-3"
              style={{ background: "hsl(var(--border))" }}
            />
            <span
              className="font-mono-jb text-xs flex items-center gap-2"
              style={{ color: "hsl(var(--muted))" }}
            >
              <MapPin size={12} />
              VVIT Campus, Bengaluru
            </span>
          </motion.div>
        </div>

        {/* diagonal cut to next section */}
        <div className="hero-cut" />
      </section>

      {/* ══ MARQUEE ══════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ══ EVENTS (from INNOVATE IGNITE plan) ═══════════════════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "hsl(var(--card))", fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="eyebrow">All Events</span>
              <h2
                className="font-display text-5xl md:text-6xl font-black leading-[0.95]"
                style={{ color: "hsl(var(--foreground))" }}
              >
                EVENT
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>LINEUP</span>
              </h2>
            </div>
            <p
              className="text-base leading-relaxed md:max-w-xs"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Two days, twelve events — from technical face-offs to cultural showcases. Pick your favorites and join the action.
            </p>
          </div>

          {/* day columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eventsByDay.map((day, di) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: di * 0.1, duration: 0.42 }}
                className="flex flex-col gap-4"
              >
                {/* day header */}
                <div
                  className="px-6 py-4 flex items-center justify-between rounded-[var(--radius)] border"
                  style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--secondary) / 0.08)" }}
                >
                  <h3
                    className="font-display text-2xl font-black tracking-tight"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {day.day}
                  </h3>
                  <span
                    className="font-mono-jb text-xs uppercase tracking-[0.18em]"
                    style={{ color: "hsl(var(--muted))" }}
                  >
                    {day.date}
                  </span>
                </div>

                {/* event blocks */}
                {day.events.map((ev, i) => (
                  <motion.div
                    key={ev.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                    onClick={() => setActiveEvent(ev)}
                    className="rounded-[var(--radius)] overflow-hidden border cursor-pointer group"
                    style={{
                      borderColor: "hsl(var(--border))",
                      background: "hsl(var(--background))",
                      transition: "border-color .25s ease, box-shadow .25s ease",
                    }}
                    whileHover={{
                      boxShadow: "0 14px 40px -18px hsl(var(--primary) / 0.35)",
                    }}
                    onHoverStart={() => {
                      const el = document.querySelector(
                        `[data-event-block="${ev.name}"]`
                      ) as HTMLElement;
                      el?.style.setProperty(
                        "border-color",
                        "hsl(var(--primary) / 0.45)"
                      );
                    }}
                    onHoverEnd={() => {
                      const el = document.querySelector(
                        `[data-event-block="${ev.name}"]`
                      ) as HTMLElement;
                      el?.style.removeProperty("border-color");
                    }}
                    data-event-block={ev.name}
                  >
                    {/* event header row */}
                    <div className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="font-display text-lg font-black leading-none mt-0.5"
                          style={{ color: "hsl(var(--secondary))" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="font-display text-lg font-bold tracking-tight"
                            style={{ color: "hsl(var(--foreground))" }}
                          >
                            {ev.name}
                          </p>
                          <p
                            className="font-mono-jb text-xs mt-1"
                            style={{ color: "hsl(var(--muted))" }}
                          >
                            {ev.venue}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-mono-jb text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded-full"
                        style={{
                          color: "hsl(var(--primary))",
                          background: "hsl(var(--primary) / 0.08)",
                        }}
                      >
                        {ev.time}
                      </span>
                    </div>

                    {/* rules list */}
                    <ul
                      className="border-t px-6 py-4 space-y-2"
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      {ev.rules.slice(0, 3).map((rule) => (
                        <li key={rule} className="flex items-start gap-2.5">
                          <span
                            className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "hsl(var(--muted-foreground))" }}
                          >
                            {rule}
                          </span>
                        </li>
                      ))}
                      {ev.rules.length > 3 && (
                        <li
                          className="font-mono-jb text-xs font-semibold uppercase tracking-[0.16em]"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          + {ev.rules.length - 3} more — click to view rules
                        </li>
                      )}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCHEDULE ═════════════════════════════════════════════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "hsl(var(--background))", fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ghost watermark */}
        <div
          className="font-display absolute left-[-2%] bottom-[4%] font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(90px,14vw,170px)",
            color: "hsl(var(--primary) / 0.1)",
            letterSpacing: "-0.02em",
          }}
          aria-hidden
        >
          INNOVATE
        </div>
        {/* ghost watermark */}
        <div
          className="font-display absolute right-[-2%] top-[4%] font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(90px,14vw,170px)",
            color: "hsl(var(--primary) / 0.1)",
            letterSpacing: "-0.02em",
          }}
          aria-hidden
        >
          IGNITE '26
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            {/* left col — sticky */}
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">The Itinerary</span>
              <h2
                className="font-display text-5xl md:text-6xl font-black leading-[0.93] mb-6"
                style={{ color: "hsl(var(--foreground))" }}
              >
                3 DAYS.
                <br />
                {categories.reduce((acc, c) => acc + c.count, 0)}+ EVENTS.
                <br />
                <span style={{ color: "hsl(var(--primary))" }}>YOUR CALL.</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8 max-w-sm"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Plan your days ahead to make the most of INNOVATE IGNITE '26. Every slot is a story — pick yours.
              </p>
              <button
                disabled
                className="btn-primary"
                style={{ opacity: 1, cursor: "not-allowed", pointerEvents: "none" }}
              >
                Full Schedule  ( Coming Soon... )
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 70%),
            hsl(var(--accent))
          `,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <span
            className="font-mono-jb text-xs uppercase tracking-[0.22em] mb-4 block"
            style={{ color: "hsl(var(--secondary))" }}
          >
            Registration are Live Now.
          </span>
          <h2
            className="font-display text-4xl md:text-6xl font-black leading-[0.93] mb-6"
            style={{ color: "hsl(var(--accent-foreground))" }}
          >
            READY TO
            <br />
            <span style={{ color: "hsl(var(--secondary))" }}>INNOVATE IGNITE '26?</span>
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "hsl(var(--accent-foreground) / 0.6)" }}
          >
            Join 1000+ students across {categories.reduce((acc, c) => acc + c.count, 0)}+ events. Just bring your best game.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              disabled
              className="btn-gold"
              style={{ opacity: 1, cursor: "not-allowed", pointerEvents: "none" }}
            >
              Register Now ( Coming Soon... )
            </button>
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                borderRadius: "var(--radius)",
                background: "transparent",
                color: "hsl(var(--accent-foreground) / 0.8)",
                border: "1.5px solid hsl(var(--accent-foreground) / 0.2)",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ══ EVENT DETAIL POPUP ═══════════════════════════════════════════█ */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(2, 10, 30, 0.65)", backdropFilter: "blur(4px)" }}
              onClick={() => setActiveEvent(null)}
            />

            {/* popup card */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[var(--radius)] border"
              style={{
                background: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
                fontFamily: "'Outfit', sans-serif",
              }}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* header */}
              <div className="px-6 py-5 border-b flex items-start justify-between gap-4 sticky top-0 z-10"
                style={{
                  borderColor: "hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
              >
                <div>
                  <span className="eyebrow block mb-1">Event Details</span>
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight leading-tight">
                    {activeEvent.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveEvent(null)}
                  aria-label="Close"
                  className="shrink-0 rounded-full p-2 transition-colors hover:scale-105"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">
                {/* venue / time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)]"
                    style={{ background: "hsl(var(--secondary) / 0.08)" }}
                  >
                    <MapPin size={18} style={{ color: "hsl(var(--primary))" }} />
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold"
                        style={{ color: "hsl(var(--muted))" }}>
                        Venue
                      </p>
                      <p className="text-sm font-semibold mt-0.5">{activeEvent.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius)]"
                    style={{ background: "hsl(var(--secondary) / 0.08)" }}
                  >
                    <Calendar size={18} style={{ color: "hsl(var(--primary))" }} />
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold"
                        style={{ color: "hsl(var(--muted))" }}>
                        Time
                      </p>
                      <p className="text-sm font-semibold mt-0.5">{activeEvent.time}</p>
                    </div>
                  </div>
                </div>

                {/* rules */}
                <div>
                  <h4
                    className="font-display text-lg font-black tracking-tight mb-3 uppercase"
                    style={{ color: "hsl(var(--secondary))" }}
                  >
                    Rules & Guidelines
                  </h4>
                  <ul className="space-y-2.5">
                    {activeEvent.rules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full"
                          style={{ background: "hsl(var(--primary))" }}
                        />
                        <span className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* coordinators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="px-4 py-4 rounded-[var(--radius)] border"
                    style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
                  >
                    <p className="text-xs uppercase tracking-[0.16em] font-semibold mb-2"
                      style={{ color: "hsl(var(--muted))" }}>
                      Staff Coordinators
                    </p>
                    <ul className="space-y-1">
                      {activeEvent.staff.map((s) => (
                        <li key={s} className="text-sm font-medium">{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-4 py-4 rounded-[var(--radius)] border"
                    style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
                  >
                    <p className="text-xs uppercase tracking-[0.16em] font-semibold mb-2"
                      style={{ color: "hsl(var(--muted))" }}>
                      Student Coordinators
                    </p>
                    <ul className="space-y-1">
                      {activeEvent.coordinators.map((c) => (
                        <li key={c.name} className="text-sm font-medium flex items-center gap-1.5">
                          {c.name}
                          {c.phone ? (
                            <a
                              href={`tel:${c.phone}`}
                              className="inline-flex items-center gap-1 transition-colors"
                              style={{ color: "hsl(var(--primary))" }}
                            >
                              <Phone size={12} /> {c.phone}
                            </a>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* register CTA */}
                <div className="pt-1">
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[var(--radius)] font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Register for {activeEvent.name}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}