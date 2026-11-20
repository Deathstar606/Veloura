import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import demo from "../images/demo.mp4";

const CYCLING_WORDS = ["Style", "Class", "Desire"];
const STORY_WORDS = ["Wear", "Your", "Story..."];

const TextCycle = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="hero-cycle-wrap" style={{ display: "inline-grid", placeItems: "center start" }}>
      <AnimatePresence initial={false}>
        <motion.span
          key={texts[currentIndex]}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.28, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            y: -14,
            transition: { duration: 0.14, ease: "easeIn" },
          }}
          style={{ gridArea: "1 / 1", display: "inline-block" }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const HeroSec = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STORY_WORDS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const scrollTarget = useCallback((tid) => {
    const element = document.getElementById(tid);
    if (element) {
      const offset = 92;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        scrollTarget(location.state.scrollTo);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [location, scrollTarget]);

  return (
    <section className="hero-stage" aria-label="Veloura Hero Showcase">
      {/* Full-bleed Ambient Video Background covering top to bottom */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        style={{ opacity: videoReady ? 1 : 0 }}
      >
        <source src={demo} type="video/mp4" />
      </video>

      {/* Subtle architectural dark scrim for crisp contrast */}
      <div className="hero-scrim-top" aria-hidden="true" />

      {/* Preserved white gradient dissolve from bottom into page canvas */}
      <div className="hero-white-fade" aria-hidden="true" />

      {/* Clean Minimal Foreground Content */}
      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hero-center-block"
        >
          <div className="d-flex flex-column align-items-center" style={{ gap: "0.75rem" }}>
            <h1 className="hero-headline">
              <span>We represent</span>
              <TextCycle texts={CYCLING_WORDS} />
            </h1>
            <p className="hero-subline mb-0">
              Effortless silhouettes tailored for everyday distinction.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollTarget("deal")}
            className="butt-glass"
          >
            <span>Check Out</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-flex" }}
            >
              <FaArrowDown size={13} />
            </motion.span>
          </button>
        </motion.div>

        {/* Minimal "Wear Your Story..." kinetic text floating over bottom white gradient */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="hero-story-stage"
          aria-label="Wear Your Story"
        >
          {STORY_WORDS.map((word, index) => {
            const isActive = index === activeIndex;
            return (
              <span
                key={word}
                className="hero-story-word"
                style={{
                  color: isActive ? "#DD6410" : "rgba(20, 19, 18, 0.62)",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {word}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSec;
