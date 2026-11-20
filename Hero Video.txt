import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import demo from "../images/demo.mp4"

const TextCycle = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: { opacity: 0, y: 50 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000); // 4 seconds per text animation cycle
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={texts[currentIndex]} // Key ensures re-render for each text change
      style={{
        marginRight: "auto",
        color: "#DD6410",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Aligns text vertically in the parent container
        textAlign: "center", // Ensures text is centered
        flexWrap: "wrap", // Handles long text wrapping gracefully
      }}
    >
      {texts[currentIndex].split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: "inline-block",
            marginRight: "0.5em",
          }}
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              variants={letterVariants}
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const HeroSec = () => {
  const text = "Wear Your Story...";
  const words = text.split(" ");
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const location = useLocation();

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000); // 1 second per word
      return () => clearInterval(interval);
    }, [words.length]);

    const scrollTarget = (tid) => {
      const element = document.getElementById(tid);
      if (element) {
        const offset = 100; // Set your desired offset here
        const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get element position
        const offsetPosition = elementPosition - offset; // Adjust for offset
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    
    useEffect(() => {
      if (location.state?.scrollTo) {
        // Give the page a little time to render the target element
        setTimeout(() => {
          scrollTarget(location.state.scrollTo);
        }, 300);
      }
    }, [location]);

    const textArray = [
        "Style",
        "Class",
        "Desire",
      ];

      return (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlayThrough={() => setVideoLoaded(true)} // detect when video can play
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -2,
            }}
          >
            <source src={demo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!videoLoaded && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#000", // fallback background
                color: "#fff",
                zIndex: -2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              Loading video...
            </div>
          )}
        
          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to top, rgba(255,255,255,0) 40%, rgba(255,255,255,1) 100%)",
              zIndex: -1,
            }}
          />

          {/* Content */}
          <div className="hero_layout">
            <div>
              <h1 className="d-flex justify-content-center pl-3">
                We represent <span className="pl-2"><TextCycle texts={textArray} /></span>
              </h1>
              <div className="d-flex justify-content-center pt-2">
                <div  onClick={() => scrollTarget("deal")} className="butt" style={{ display: "inline-block" }}>
                  Check out
                </div>
              </div>
              <div className="hero_mar" style={{ display: "flex", justifyContent: "center", gap: "0.8em", opacity: 0.7 }}>
                {words.map((word, index) => (
                  <span
                    key={index}
                    style={{
                      color: index === activeIndex ? "#DD6410" : "gray",
                      transition: "color 0.5s ease-in-out",
                      fontSize: "clamp(2.5rem, 4vw, 3rem)",
                      fontWeight: "bold",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
};

export default HeroSec;