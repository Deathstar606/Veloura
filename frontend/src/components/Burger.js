import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark, FaChevronDown } from "react-icons/fa6";
import "./Burger.css";

const BurgerMenu = () => {
  const location = useLocation();
  const [isMen, setIsMen] = useState(true);
  const [expandedUpcoming, setExpandedUpcoming] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const menuOverlay = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-3%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="menu open"
        >
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Close menu"
            className="border-0 bg-transparent position-absolute"
            style={{ top: "22px", right: "22px", color: "var(--text-primary)", cursor: "pointer" }}
          >
            <FaXmark size={26} />
          </button>

          <div className="w-100 px-4" style={{ maxWidth: "420px", maxHeight: "84vh", overflowY: "auto" }}>
            <div className="text-center mb-4">
              <span className="eyebrow-label justify-content-center">Atelier Directory</span>
            </div>

            {/* Menswear Accordion */}
            <div className="mb-3">
              <button
                type="button"
                onClick={() => setIsMen((prev) => !prev)}
                className="w-100 border-0 bg-transparent d-flex justify-content-between align-items-center py-2"
                style={{ cursor: "pointer" }}
              >
                <span className="burg-menu">Menswear</span>
                <FaChevronDown
                  size={14}
                  style={{
                    transform: isMen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {isMen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden", paddingLeft: "0.75rem" }}
                  >
                    <div className="nav-sub-group mt-2">Shirts</div>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/shirt" onClick={toggleMenu}>
                      Half Sleeve
                    </Link>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/full shirt" onClick={toggleMenu}>
                      Full Sleeve
                    </Link>

                    <div className="nav-sub-group mt-3">Polo</div>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/polo" onClick={toggleMenu}>
                      Polo Shirt
                    </Link>

                    <div className="nav-sub-group mt-3">Luxury Wear</div>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/luxury shirt" onClick={toggleMenu}>
                      Luxury Shirt
                    </Link>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/luxury polo" onClick={toggleMenu}>
                      Luxury Polo
                    </Link>

                    <div className="nav-sub-group mt-3">Summer Collection</div>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/summer polo" onClick={toggleMenu}>
                      Summer Polo
                    </Link>
                    <Link className="d-block py-1 text-dark text-decoration-none" to="/home/summer shirt" onClick={toggleMenu}>
                      Summer Shirt
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {["Womenswear", "Kidswear", "Accessories"].map((section) => (
              <div key={section} className="mb-2" style={{ borderTop: "1px solid var(--hairline)" }}>
                <button
                  type="button"
                  onClick={() => setExpandedUpcoming(expandedUpcoming === section ? null : section)}
                  className="w-100 border-0 bg-transparent d-flex justify-content-between align-items-center py-2"
                  style={{ cursor: "pointer" }}
                >
                  <span className="burg-menu">{section}</span>
                  <span className="eyebrow-label" style={{ fontSize: "0.62rem" }}>
                    Soon
                  </span>
                </button>
                {expandedUpcoming === section && (
                  <p className="small text-muted mb-2">Atelier launch coming soon.</p>
                )}
              </div>
            ))}

            <div className="pt-2" style={{ borderTop: "1px solid var(--hairline)" }}>
              <Link
                to="/home/aboutus"
                onClick={toggleMenu}
                className="d-block py-2 text-decoration-none"
              >
                <span className="burg-menu">About Us</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className="burger-trigger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <div className="burger-icon">
          <div className={`bar ${menuOpen ? "open" : ""}`} />
          <div className={`bar ${menuOpen ? "open" : ""}`} style={{ width: "65%" }} />
        </div>
      </button>
      {typeof document !== "undefined" ? createPortal(menuOverlay, document.body) : null}
    </>
  );
};

export default BurgerMenu;
