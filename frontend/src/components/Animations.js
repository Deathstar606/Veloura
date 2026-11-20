import { motion, useInView as FMotion } from "framer-motion";
import { useInView as InObs } from "react-intersection-observer";
import { useRef } from "react";

export const SectionYPos = ({ children }) => {
  const ref = useRef(null);
  const isInView = FMotion(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          display: "block",
          transform: isInView ? "none" : "translateY(48px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        {children}
      </span>
    </section>
  );
};

export const SectionYNeg = ({ children }) => {
  const ref = useRef(null);
  const isInView = FMotion(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          display: "block",
          transform: isInView ? "none" : "translateY(-40px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        {children}
      </span>
    </section>
  );
};

export const SectionXNeg = ({ children }) => {
  const ref = useRef(null);
  const isInView = FMotion(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          display: "block",
          transform: isInView ? "none" : "translateX(-48px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        {children}
      </span>
    </section>
  );
};

export const SectionXPos = ({ children }) => {
  const ref = useRef(null);
  const isInView = FMotion(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          display: "block",
          transform: isInView ? "none" : "translateX(48px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
        }}
      >
        {children}
      </span>
    </section>
  );
};

export const StaggeredText = ({ text }) => {
  const [ref, inView] = InObs({
    threshold: 0.05,
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.014,
        delayChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={textVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
