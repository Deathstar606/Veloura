import React from "react";
import { Container, Row, Col } from "reactstrap";
import ssl from "../images/Pay logo/1 (1).png";
import ae from "../images/Pay logo/ae.png";
import ak from "../images/Pay logo/ak.png";
import bk from "../images/Pay logo/bk.png";
import ipat from "../images/Pay logo/ipat.png";
import iw from "../images/Pay logo/iw.png";
import masterc from "../images/Pay logo/masterc.png";
import mc from "../images/Pay logo/mc.png";
import nagad from "../images/Pay logo/nagad.png";
import np from "../images/Pay logo/np.png";
import qc from "../images/Pay logo/qc.png";
import rc from "../images/Pay logo/rc.png";
import unip from "../images/Pay logo/unip.png";
import up from "../images/Pay logo/up.png";
import visa from "../images/Pay logo/visa.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export const paymentIcons = [
  ae,
  ak,
  bk,
  ipat,
  iw,
  masterc,
  mc,
  nagad,
  np,
  qc,
  rc,
  unip,
  up,
  visa,
];

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-bone)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <Container style={{ maxWidth: "1360px", padding: "4rem 1.25rem 3rem" }}>
        <Row className="g-4 justify-content-between">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Veloura
            </div>
            <p className="mt-2 mb-3" style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
              Wear your story with confidence. Modern menswear engineered for comfort, precision tailoring, and quiet distinction.
            </p>
            <div className="d-flex align-items-center" style={{ gap: "0.65rem" }}>
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
          </Col>

          <Col lg={2} md={3} xs={6} className="mb-4 mb-md-0">
            <div className="eyebrow-label mb-3">Legal</div>
            <div className="d-flex flex-column" style={{ gap: "0.5rem", fontSize: "0.9rem" }}>
              <Link className="text-dark text-decoration-none" to="/home/privacy">Privacy Policy</Link>
              <Link className="text-dark text-decoration-none" to="/home/payment">Payment Policy</Link>
              <Link className="text-dark text-decoration-none" to="/home/shipping">Shipping Policy</Link>
              <Link className="text-dark text-decoration-none" to="/home/terms">Terms &amp; Conditions</Link>
            </div>
          </Col>

          <Col lg={2} md={3} xs={6} className="mb-4 mb-md-0">
            <div className="eyebrow-label mb-3">Company</div>
            <div className="d-flex flex-column" style={{ gap: "0.5rem", fontSize: "0.9rem" }}>
              <Link className="text-dark text-decoration-none" to="/home/aboutus">About Us</Link>
              <Link className="text-dark text-decoration-none" to="/home/refund">Return &amp; Refund</Link>
              <Link className="text-dark text-decoration-none" to="/home/shirt">Shirts</Link>
              <Link className="text-dark text-decoration-none" to="/home/polo">Polos</Link>
            </div>
          </Col>

          <Col lg={4} md={12}>
            <div className="eyebrow-label mb-3">Contact &amp; Atelier</div>
            <div className="d-flex flex-column" style={{ gap: "0.45rem", fontSize: "0.9rem" }}>
              <a href="tel:01629743377" className="text-dark text-decoration-none">
                Phone: 01629743377
              </a>
              <a href="mailto:velourabd.online@gmail.com" className="text-dark text-decoration-none">
                Email: velourabd.online@gmail.com
              </a>
              <a
                href="https://maps.app.goo.gl/sDs3fmfQAaif4wDU6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "var(--accent)", fontWeight: 600 }}
              >
                View Warehouse on Google Maps &rarr;
              </a>
              <div className="small text-muted mt-1">Trade License Number: 10/458</div>
            </div>
          </Col>
        </Row>

        {/* Payment Partners */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="text-center mb-3">
            <span className="eyebrow-label justify-content-center">Trusted Payment Partners</span>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ gap: "0.5rem" }}>
            {paymentIcons.map((icon, idx) => (
              <div
                key={idx}
                className="liquid-glass d-flex align-items-center justify-content-center p-1"
                style={{ width: "48px", height: "34px", borderRadius: "8px" }}
              >
                <img
                  src={icon}
                  alt="Payment method"
                  loading="lazy"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>

          <div className="d-flex flex-column align-items-center mt-3">
            <span className="small text-muted mb-1">Verified by</span>
            <img style={{ width: "120px" }} src={ssl} alt="SSLCommerz Verified" loading="lazy" />
          </div>
        </div>
      </Container>

      <div
        className="w-100 text-white text-center py-3 px-3"
        style={{ backgroundColor: "var(--bg-obsidian)", fontSize: "0.82rem" }}
      >
        <div>All Rights Reserved &middot; Veloura &copy; 2025</div>
        <div className="small mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
          Developed By{" "}
          <a
            href="https://www.linkedin.com/in/fardin-rahman-2311942bb/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FF9F43", textDecoration: "none", fontWeight: 600 }}
          >
            Fardin Rahman
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
