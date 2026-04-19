"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SpeakerHigh,
  SpeakerSlash,
  Play,
  Pause,
  X,
} from "@phosphor-icons/react";

type VideoStage =
  | "explainer"
  | "promptPodcast"
  | "podcast"
  | "promptExplainer";

type Mode = "inline" | "mini";

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
};

export default function MobileVideo() {
  const slotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<VideoStage>("explainer");
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState<Mode>("inline");
  const [isPaused, setIsPaused] = useState(false);
  const [slotRect, setSlotRect] = useState<Rect | null>(null);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track slot position via rAF-throttled scroll/resize listener
  useEffect(() => {
    if (!isMobile || !slotRef.current) return;
    const slot = slotRef.current;
    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const r = slot.getBoundingClientRect();
      setSlotRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        bottom: r.bottom,
      });
    };
    const schedule = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(slot);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Auto-switch between inline and mini based on slot visibility, with
  // hysteresis so we don't flicker near the transition boundary. Trigger
  // early — when the slot is mostly (but not fully) scrolled off — so the
  // bar arrives before the video fully disappears and feels like a handoff.
  // setTransitioning AND setMode must flip in the same effect so React 19
  // batches them into one render — otherwise framer sees the new target on
  // the render before the new transition and snaps instantly.
  useEffect(() => {
    if (!slotRect) return;
    if (mode === "inline" && slotRect.bottom < 80) {
      setTransitioning(true);
      setMode("mini");
    } else if (mode === "mini" && slotRect.bottom > 220) {
      setTransitioning(true);
      setMode("inline");
    }
  }, [slotRect, mode]);

  // Restore video when user scrolls back to the slot area
  useEffect(() => {
    if (!dismissed || !slotRect) return;
    if (slotRect.top > 0 && slotRect.bottom < vh) {
      setDismissed(false);
    }
  }, [dismissed, slotRect, vh]);

  useEffect(() => {
    if (!isMobile) return;
    if (
      (stage === "explainer" || stage === "podcast") &&
      videoRef.current &&
      !isPaused
    ) {
      videoRef.current.play().catch(() => {});
    }
  }, [stage, isMobile, isPaused]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPaused(false);
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  const handleEnded = () => {
    if (stage === "explainer") setStage("promptPodcast");
    else if (stage === "podcast") setStage("promptExplainer");
  };

  const playNext = () => {
    const old = videoRef.current;
    if (old) old.pause();
    setLoading(true);
    setVideoReady(false);
    if (stage === "promptPodcast") {
      setMuted(false);
      setStage("podcast");
    } else if (stage === "promptExplainer") {
      setStage("explainer");
    }
  };

  const scrollBackToInline = () => {
    slotRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const showingPodcastSrc = stage === "podcast" || stage === "promptExplainer";
  const videoSrc = showingPodcastSrc
    ? "/videos/podcast-mobile.mp4"
    : "/videos/explainer-vertical-mobile.mp4";
  const promptVisible =
    stage === "promptPodcast" || stage === "promptExplainer";
  const promptLabel = stage === "promptPodcast" ? "Up next" : "Start over";
  const promptTitle =
    stage === "promptPodcast"
      ? "Meet Dr.\u00a0Shurbaji &\nDr.\u00a0Jawad"
      : "Watch the explainer again";
  const promptCta =
    stage === "promptPodcast" ? "Play podcast" : "Replay explainer";

  // Geometry per mode. Mini is an explicit bottom bar; inline mirrors the
  // slot placeholder's bounding rect.
  const miniHeight = 72;
  const miniPad = 16;
  const containerAnim =
    mode === "mini" && vw > 0 && vh > 0
      ? {
          top: vh - miniHeight - miniPad,
          left: miniPad,
          width: vw - miniPad * 2,
          height: miniHeight,
          borderRadius: 20,
        }
      : slotRect
      ? {
          top: slotRect.top,
          left: slotRect.left,
          width: slotRect.width,
          height: slotRect.height,
          borderRadius: 28,
        }
      : {
          top: -9999,
          left: 0,
          width: 0,
          height: 0,
          borderRadius: 28,
        };

  const videoWrapAnim =
    mode === "mini"
      ? {
          top: 10,
          left: 10,
          width: 52,
          height: 52,
          borderRadius: 12,
        }
      : {
          top: 0,
          left: 0,
          width: containerAnim.width,
          height: containerAnim.height,
          borderRadius: 0,
        };

  // Graceful ease-out-cubic for the morph; zero-duration during inline
  // scroll tracking so the card stays pinned to the slot without any
  // interpolation lag.
  const transition = transitioning
    ? {
        type: "tween" as const,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }
    : { duration: 0 };

  const shouldRenderPlayer = isMobile && slotRect && !dismissed;

  return (
    <>
      {/* Slot placeholder — always rendered so scroll tracking works */}
      <div
        ref={slotRef}
        className="mx-auto w-[min(78%,340px)] aspect-[4/5]"
      />

      {/* Actual player — fixed-position, morphs between inline card and
          mini bottom bar. Keeps a single <video> element so playback state
          persists across mode changes. */}
      <AnimatePresence>
      {shouldRenderPlayer && (
        <motion.div
          animate={containerAnim}
          exit={
            mode === "mini"
              ? {
                  y: 80,
                  opacity: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }
              : {
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }
          }
          transition={transition}
          onAnimationComplete={() => setTransitioning(false)}
          className="fixed z-40 bg-ink shadow-[0_40px_70px_-30px_rgba(20,25,35,0.45)] overflow-hidden lg:hidden"
        >
          <motion.div
            animate={videoWrapAnim}
            transition={transition}
            className="absolute overflow-hidden bg-ink"
          >
            <video
              ref={videoRef}
              key={videoSrc}
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              onEnded={handleEnded}
              onLoadedData={() => setLoading(false)}
              onPlaying={() => { setLoading(false); setVideoReady(true); }}
              className={`w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
              style={{
                objectPosition: showingPodcastSrc
                  ? "center 28%"
                  : "center 18%",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>

          {loading && !promptVisible && mode === "inline" && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink pointer-events-none">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cream" />
                <span className="w-1.5 h-1.5 rounded-full bg-cream" />
                <span className="w-1.5 h-1.5 rounded-full bg-cream" />
              </motion.div>
            </div>
          )}

          <AnimatePresence>
            {mode === "inline" && (
              <motion.div
                key="inline-chrome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="pointer-events-auto absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="w-10 h-10 rounded-full bg-ink/60 text-cream backdrop-blur-sm flex items-center justify-center transition-colors duration-300 active:bg-ink/80"
                  >
                    {muted ? (
                      <SpeakerSlash size={18} weight="fill" />
                    ) : (
                      <SpeakerHigh size={18} weight="fill" />
                    )}
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    aria-label="Close video"
                    className="w-10 h-10 rounded-full bg-ink/60 text-cream backdrop-blur-sm flex items-center justify-center transition-colors duration-300 active:bg-ink/80"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>

                {promptVisible && (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pointer-events-auto absolute inset-0 bg-ink/85 backdrop-blur-sm flex flex-col items-center justify-center text-cream p-6 text-center"
                  >
                    <p className="text-[10px] tracking-[0.22em] uppercase text-cream/60 mb-3">
                      {promptLabel}
                    </p>
                    <p className="font-serif text-xl leading-snug mb-6 max-w-[240px] whitespace-pre-line">
                      {promptTitle}
                    </p>
                    <button
                      onClick={playNext}
                      className="inline-flex items-center gap-2 bg-cream text-ink px-5 py-2.5 rounded-full text-[11px] tracking-wide uppercase active:bg-salmon active:text-cream transition-colors duration-300"
                    >
                      <Play size={12} weight="fill" />
                      {promptCta}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mode === "mini" && (
              <motion.div
                key="mini-chrome"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{
                  duration: 0.45,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={scrollBackToInline}
                className="absolute inset-0 flex items-center pl-[72px] pr-3 gap-2 cursor-pointer select-none"
              >
                <div className="flex-1 min-w-0 mr-2 text-left">
                  <p
                    className={`text-[10px] tracking-[0.18em] uppercase mb-0.5 truncate ${
                      promptVisible ? "text-salmon-light" : "text-cream/50"
                    }`}
                  >
                    {promptVisible ? promptLabel : "Now watching"}
                  </p>
                  <p className="text-cream text-[13px] font-medium truncate">
                    {promptVisible ? promptTitle : "Meet bloom360"}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (promptVisible) {
                      playNext();
                      slotRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    } else {
                      togglePlayPause();
                    }
                  }}
                  aria-label={
                    promptVisible
                      ? "Play next video"
                      : isPaused
                      ? "Play"
                      : "Pause"
                  }
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    promptVisible
                      ? "bg-salmon text-cream active:bg-salmon-dark"
                      : "bg-cream text-ink active:bg-salmon-light"
                  }`}
                >
                  {promptVisible || isPaused ? (
                    <Play size={13} weight="fill" />
                  ) : (
                    <Pause size={13} weight="fill" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDismissed(true);
                  }}
                  aria-label="Close video"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-cream/15 flex items-center justify-center text-cream active:bg-cream/25 transition-colors"
                >
                  <X size={13} weight="bold" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
