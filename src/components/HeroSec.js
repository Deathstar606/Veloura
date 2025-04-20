import React, {useEffect, useState} from "react";
import { Row, Col, CardImg, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import demo from "../images/demo.mp4"
import MediaQuery from "react-responsive";
import glass from "../images/Hero/sunglass.png"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";

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
                <div className="butt" style={{ display: "inline-block" }}>
                  Check out
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default HeroSec;