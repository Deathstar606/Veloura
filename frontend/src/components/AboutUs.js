import React, { useEffect } from "react";
import aboutPic from "../images/about_real.jpg";
import { motion } from "framer-motion";
import { Col, Container, Row } from "reactstrap";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa6";
import { Breadcrumb } from "./BreadCrumb";

const BRAND_PILLARS = [
  {
    title: "Quality Assurance",
    text: "Sourced from vetted ateliers with crisp weave inspection and lasting comfort.",
  },
  {
    title: "Dedicated Support",
    text: "Personal sizing guidance and responsive post-order care from our Dhaka & Khulna team.",
  },
  {
    title: "Encrypted Checkout",
    text: "SSLCommerz verified payments, Cash on Delivery, and transparent delivery timelines.",
  },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      style={{ padding: "1.5rem 0 4.5rem" }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container style={{ maxWidth: "1260px" }}>
        <Breadcrumb
          items={[
            { link: "/home", active: false },
            {
              name: <strong style={{ color: "var(--accent)" }}>About Us</strong>,
              link: "",
              active: true,
            },
          ]}
        />

        <Row className="align-items-center mt-4 g-4 g-lg-5">
          <Col lg={5} md={6} className="mb-4 mb-md-0">
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                aspectRatio: "3 / 4",
                boxShadow: "0 20px 50px rgba(15, 14, 12, 0.12)",
              }}
            >
              <img
                src={aboutPic}
                alt="Veloura Brand Editorial"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                className="liquid-glass-dark position-absolute px-3 py-2"
                style={{
                  bottom: "16px",
                  left: "16px",
                  borderRadius: "999px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Established 2025 · Bangladesh
              </span>
            </div>
          </Col>

          <Col lg={7} md={6}>
            <span className="eyebrow-label mb-2">Our Atelier</span>
            <h1 className="section-heading mb-3">Wear Your Story with Confidence.</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.75 }}>
              <strong>VELOURA</strong> is a contemporary menswear destination built around the idea that great style should feel effortless, expressive, and enduring. From refined staples to statement silhouettes, every garment is crafted with care, comfort, and precision.
            </p>

            <Row className="g-3 mt-3 mb-4">
              {BRAND_PILLARS.map((pillar) => (
                <Col sm={4} xs={12} key={pillar.title} className="mb-2 mb-sm-0">
                  <div
                    className="liquid-glass h-100 p-3"
                    style={{ borderRadius: "18px" }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}
                    >
                      {pillar.text}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>

            <div
              className="p-3 p-md-4"
              style={{
                borderRadius: "20px",
                backgroundColor: "var(--bg-bone)",
                border: "1px solid var(--hairline)",
              }}
            >
              <div className="eyebrow-label mb-2">Connect With Us</div>
              <p className="mb-3" style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Reach out for sizing assistance, bespoke inquiries, or order updates.
              </p>
              <div className="d-flex flex-wrap align-items-center" style={{ gap: "0.75rem" }}>
                <a
                  href="mailto:velourabd.online@gmail.com"
                  className="butt"
                  style={{ padding: "0.55rem 1.15rem", fontSize: "0.72rem" }}
                >
                  <FaEnvelope size={12} /> Email Us
                </a>
                <a
                  href="tel:01629743377"
                  className="butt"
                  style={{ padding: "0.55rem 1.15rem", fontSize: "0.72rem" }}
                >
                  <FaPhone size={12} /> 01629743377
                </a>
                <a
                  href="https://www.facebook.com/velourabd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Veloura Facebook"
                  className="nav-cart-btn"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/velourabd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Veloura Instagram"
                  className="nav-cart-btn"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default About;
