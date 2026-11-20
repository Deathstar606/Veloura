import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import about from "../images/about.jpg";

const VelouraCol = () => {
  return (
    <section
      id="aboutus"
      style={{
        position: "relative",
        minHeight: "68vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#241913",
        backgroundImage: `url(${about})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Atmospheric gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(14, 13, 12, 0.72) 0%, rgba(14, 13, 12, 0.35) 55%, rgba(14, 13, 12, 0.6) 100%)",
          zIndex: 1,
        }}
      />

      <Container style={{ maxWidth: "1360px", position: "relative", zIndex: 2, padding: "4rem 1.25rem" }}>
        <Row className="justify-content-center">
          <Col lg={7} md={9}>
            <div
              className="liquid-glass-dark text-center p-4 p-md-5"
              style={{ borderRadius: "28px" }}
            >
              <span
                className="eyebrow-label justify-content-center mb-2"
                style={{ color: "#FFB067" }}
              >
                Signature Capsule
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "1rem",
                }}
              >
                Veloura Collection
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)",
                  color: "rgba(255, 255, 255, 0.86)",
                  lineHeight: 1.7,
                  marginBottom: "1.6rem",
                }}
              >
                Elevate your everyday look. Discover the perfect blend of tailored structure and breathable comfort — from timeless staples to bold contemporary statements crafted to help you wear your story with confidence.
              </p>
              <Link
                to="/home/aboutus"
                className="butt-glass"
                style={{ textDecoration: "none" }}
              >
                <span>Our Story</span>
                <FaArrowRight size={12} />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VelouraCol;
