"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SpeakerHigh, SpeakerSlash, Play } from "@phosphor-icons/react";

type VideoStage =
  | "explainer"
  | "promptPodcast"
  | "podcast"
  | "promptExplainer";

export default function FloatingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<VideoStage>("explainer");
  const [muted, setMuted] = useState(true);
  const [dims, setDims] = useState({ vw: 0, vh: 0 });
  const [ctaOffset, setCtaOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop(e.matches);
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const update = () =>
      setDims({ vw: window.innerWidth, vh: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    if ((stage === "podcast" || stage === "explainer") && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [stage, isDesktop]);

  // Preload the podcast in the background so it's cached when the user
  // finishes the explainer and clicks "Play podcast". Desktop only — we
  // don't want to burn mobile bandwidth on a video that will never show.
  useEffect(() => {
    if (!isDesktop) return;
    const controller = new AbortController();
    const t = setTimeout(() => {
      fetch("/videos/podcast.mp4", {
        signal: controller.signal,
        cache: "force-cache",
      }).catch(() => {});
    }, 2000);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const cta = document.getElementById("join");
    if (!cta) return;
    const measure = () => {
      const rect = cta.getBoundingClientRect();
      setCtaOffset(rect.top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t);
    };
  }, [isDesktop]);

  const { scrollY } = useScroll();

  // Animate from "hero card" to "end card" over first 70% of viewport height
  const end = Math.max(400, dims.vh * 0.7);

  // Max-width container (matches sections) — video stays inside this container
  const containerMaxW = 1400;
  const marginR = dims.vw > containerMaxW ? (dims.vw - containerMaxW) / 2 : 0;

  // Cap video width: 38vw but never wider than 38% of the 1400 container = ~532
  const widthCap = Math.min(dims.vw * 0.38, containerMaxW * 0.38);
  const widthCapStart = Math.min(dims.vw * 0.34, containerMaxW * 0.34);

  // Hero-slot geometry (rounded card on the right of container)
  const startTop = 140;
  const startRight = marginR + 40;
  const startWidth = widthCapStart > 0 ? widthCapStart : 476;
  const startHeight = dims.vh > 0 ? dims.vh * 0.7 : 640;
  const startRadius = 28;

  // End-state geometry (slightly larger, still inside container)
  const endTop = 104;
  const endRight = marginR + 40;
  const endWidth = widthCap > 0 ? widthCap : 532;
  const endHeight = dims.vh > 0 ? dims.vh * 0.82 : 740;
  const endRadius = 28;

  const rawTop = useTransform(scrollY, [0, end], [startTop, endTop]);
  const rawRight = useTransform(scrollY, [0, end], [startRight, endRight]);
  const rawWidth = useTransform(scrollY, [0, end], [startWidth, endWidth]);
  const rawHeight = useTransform(scrollY, [0, end], [startHeight, endHeight]);
  const rawRadius = useTransform(scrollY, [0, end], [startRadius, endRadius]);

  const spring = { stiffness: 140, damping: 24, mass: 0.6 };
  const top = useSpring(rawTop, spring);
  const right = useSpring(rawRight, spring);
  const width = useSpring(rawWidth, spring);
  const height = useSpring(rawHeight, spring);
  const borderRadius = useSpring(rawRadius, spring);

  // Shadow fades smoothly as video approaches the landing point (CTA section).
  // The sticky element releases when scrollY > ctaOffset - viewportHeight.
  const landingScroll = Math.max(0, ctaOffset - dims.vh);
  const fadeStart = Math.max(0, landingScroll - 320);
  const fadeEnd = landingScroll + 40;
  const shadowFactor = useTransform(
    scrollY,
    [fadeStart, Math.max(fadeStart + 1, fadeEnd)],
    [1, 0],
    { clamp: true }
  );
  const shadowAlpha = useTransform(shadowFactor, (v) => v * 0.28);
  const shadowBlur = useTransform(shadowFactor, (v) => v * 50);
  const shadowSpread = useTransform(shadowFactor, (v) => v * -12);
  const shadowOffsetY = useTransform(shadowFactor, (v) => v * 25);
  const boxShadow = useMotionTemplate`0px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${shadowAlpha})`;

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleEnded = () => {
    if (stage === "explainer") {
      setStage("promptPodcast");
    } else if (stage === "podcast") {
      setStage("promptExplainer");
    }
  };

  const playNext = () => {
    const old = videoRef.current;
    if (old) {
      old.pause();
    }
    setLoading(true);
    if (stage === "promptPodcast") {
      setMuted(false);
      setStage("podcast");
    } else if (stage === "promptExplainer") {
      setStage("explainer");
    }
  };

  if (!isDesktop) return null;

  const showingPodcastSrc = stage === "podcast" || stage === "promptExplainer";
  const videoSrc = showingPodcastSrc
    ? "/videos/podcast.mp4"
    : "/videos/explainer-vertical.mp4";
  const promptVisible =
    stage === "promptPodcast" || stage === "promptExplainer";
  const promptLabel =
    stage === "promptPodcast" ? "Up next" : "Start over";
  const promptTitle =
    stage === "promptPodcast"
      ? "Meet Dr. Shurbaji & Dr. Jawad"
      : "Watch the explainer again";
  const promptCta =
    stage === "promptPodcast" ? "Play podcast" : "Replay explainer";

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none z-40">
      <div className="sticky top-0 h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            top,
            right,
            width,
            height,
            borderRadius,
            boxShadow,
            position: "absolute",
          }}
          className="pointer-events-auto overflow-hidden bg-ink"
        >
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        muted={muted}
        playsInline
        onEnded={handleEnded}
        onLoadedMetadata={() => setLoading(false)}
        onLoadedData={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onPlaying={() => setLoading(false)}
        className="w-full h-full object-cover"
        style={{
          objectPosition: showingPodcastSrc ? "center 28%" : "center 18%",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Loading indicator */}
      {loading && !promptVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span className="w-1.5 h-1.5 rounded-full bg-cream" />
          </motion.div>
        </div>
      )}

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-ink/60 hover:bg-ink/80 text-cream backdrop-blur-sm flex items-center justify-center transition-colors duration-300"
      >
        {muted ? (
          <SpeakerSlash size={20} weight="fill" />
        ) : (
          <SpeakerHigh size={20} weight="fill" />
        )}
      </button>

      {/* End-of-video prompt */}
      {promptVisible && (
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-ink/80 backdrop-blur-sm flex flex-col items-center justify-center text-cream p-8 text-center"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-cream/60 mb-4">
            {promptLabel}
          </p>
          <p className="font-serif text-2xl md:text-3xl leading-snug mb-8">
            {promptTitle}
          </p>
          <button
            onClick={playNext}
            className="group inline-flex items-center gap-2 bg-cream text-ink px-6 py-3 rounded-full text-xs tracking-wide uppercase hover:bg-salmon hover:text-cream transition-colors duration-300"
          >
            <Play size={14} weight="fill" />
            {promptCta}
          </button>
        </motion.div>
      )}
        </motion.div>
      </div>
    </div>
  );
}
