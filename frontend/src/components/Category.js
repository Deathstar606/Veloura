import React, { useMemo, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaXmark } from "react-icons/fa6";
import { StaggeredText } from "./Animations";
import "./card.css";

import imgShirts from "../images/category/editorial-shirts.jpg";
import imgFullShirt from "../images/category/editorial-fullshirt.jpg";
import imgPolo from "../images/category/editorial-polo.jpg";
import imgLuxury from "../images/category/editorial-luxury.jpg";
import imgLuxPolo from "../images/category/editorial-luxpolo.jpg";
import imgSummer from "../images/category/editorial-summer.jpg";

// Verified Pexels editorial image for Summer Polo + graceful local fallback
const SUMMER_POLO_WEB_IMG =
  "https://images.pexels.com/photos/5191435/pexels-photo-5191435.jpeg?auto=compress&cs=tinysrgb&w=900";

const PILLAR_COLLECTIONS = [
  {
    id: "shirts",
    index: "01",
    name: "Tailored Shirts",
    tagline: "Crisp weaves & architectural collars for effortless daily tailoring.",
    img: imgShirts,
    subcategories: [
      { label: "Half Sleeve", route: "/home/shirt", apiKey: "shirt" },
      { label: "Full Sleeve", route: "/home/full shirt", apiKey: "full shirt" },
    ],
  },
  {
    id: "polo",
    index: "02",
    name: "Signature Polos",
    tagline: "Breathable knit plackets engineered for refined smart-casual poise.",
    img: imgPolo,
    subcategories: [
      { label: "Polo Shirt", route: "/home/polo", apiKey: "polo" },
      { label: "Luxury Polo", route: "/home/luxury polo", apiKey: "luxury polo" },
    ],
  },
  {
    id: "luxury",
    index: "03",
    name: "The Luxury Edit",
    tagline: "Elevated evening textiles, deep tones, and structured drape.",
    img: imgLuxury,
    subcategories: [
      { label: "Luxury Shirt", route: "/home/luxury shirt", apiKey: "luxury shirt" },
      { label: "Luxury Polo", route: "/home/luxury polo", apiKey: "luxury polo" },
    ],
  },
  {
    id: "summer",
    index: "04",
    name: "Summer Capsule",
    tagline: "Airy resort textures and sun-washed prints built for warm days.",
    img: imgSummer,
    subcategories: [
      { label: "Summer Shirt", route: "/home/summer shirt", apiKey: "summer shirt" },
      { label: "Summer Polo", route: "/home/summer polo", apiKey: "summer polo" },
    ],
  },
];

const EXPANDED_SUBCATEGORIES = [
  {
    title: "Half Sleeve Shirts",
    subtitle: "Relaxed resort & clean-cut poplin",
    route: "/home/shirt",
    apiKey: "shirt",
    img: imgShirts,
  },
  {
    title: "Full Sleeve Shirts",
    subtitle: "Boardroom to evening button-downs",
    route: "/home/full shirt",
    apiKey: "full shirt",
    img: imgFullShirt,
  },
  {
    title: "Polo Shirts",
    subtitle: "Structured pique & knit essentials",
    route: "/home/polo",
    apiKey: "polo",
    img: imgPolo,
  },
  {
    title: "Luxury Shirts",
    subtitle: "Silk-blend & statement evening weaves",
    route: "/home/luxury shirt",
    apiKey: "luxury shirt",
    img: imgLuxury,
  },
  {
    title: "Luxury Polos",
    subtitle: "Fine-gauge Johnny collars & merino knits",
    route: "/home/luxury polo",
    apiKey: "luxury polo",
    img: imgLuxPolo,
  },
  {
    title: "Summer Shirts",
    subtitle: "Botanical prints & featherweight cotton",
    route: "/home/summer shirt",
    apiKey: "summer shirt",
    img: imgSummer,
  },
  {
    title: "Summer Polos",
    subtitle: "Sun-ready breathable knitwear",
    route: "/home/summer polo",
    apiKey: "summer polo",
    img: SUMMER_POLO_WEB_IMG,
    fallbackImg: imgPolo,
  },
];

const UPCOMING_LINES = [
  { title: "Womenswear", note: "Tailored Capsule · Coming Soon" },
  { title: "Kidswear", note: "Mini Atelier · Coming Soon" },
  { title: "Accessories", note: "Leather & Eyewear · Coming Soon" },
];

/**
 * CollectionPair
 * Renders 2 signature collection cards per row on desktop/tablet (md={6})
 * and 1 per row on smaller screens (xs={12}), inside the preserved 1360px container.
 * - pair="top": First 2 pillars shown right below Best Deals
 * - pair="bottom": Remaining 2 pillars shown right above New Arrivals
 */
export const CollectionPair = ({ pair = "top" }) => {
  const navigate = useNavigate();
  const [activeDrawer, setActiveDrawer] = useState(null);

  const items =
    pair === "top"
      ? PILLAR_COLLECTIONS.slice(0, 2)
      : PILLAR_COLLECTIONS.slice(2, 4);

  return (
    <section
      style={{
        padding: pair === "top" ? "1.5rem 0 clamp(3rem, 5vw, 4.5rem)" : "clamp(3rem, 5vw, 4.5rem) 0 1.5rem",
        backgroundColor: pair === "top" ? "var(--bg-bone)" : "var(--bg-canvas)",
      }}
    >
      <Container style={{ maxWidth: "1360px" }}>
        {pair === "top" && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 pt-3">
            <div>
              <span className="eyebrow-label mb-2">Shop By Department</span>
              <h2 className="section-heading">
                <StaggeredText text="The Collections" />
              </h2>
            </div>
            <p className="section-subcopy mt-2 mt-md-0 mb-0">
              Signature menswear pillars crafted for everyday distinction.
            </p>
          </div>
        )}

        <Row className="g-3 g-md-4">
          {items.map((pillar, idx) => (
            <Col md={6} xs={12} key={pillar.id} className="mb-3 mb-md-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="collection-split-card"
                onClick={() => setActiveDrawer(pillar)}
              >
                <img
                  src={pillar.img}
                  alt={pillar.name}
                  loading="lazy"
                  className="collection-split-img"
                />
                <div className="collection-split-gradient" />

                <div className="collection-split-overlay">
                  <h3 className="collection-split-title">{pillar.name}</h3>
                  <button
                    type="button"
                    className="butt-glass collection-shop-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDrawer(pillar);
                    }}
                  >
                    <span>Shop Now</span>
                  </button>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Subcategory Liquid-Glass Picker Modal */}
      <AnimatePresence>
        {activeDrawer && (
          <motion.div
            className="modal-back d-flex justify-content-center align-items-center p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDrawer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass p-4 p-md-5 w-100"
              style={{
                maxWidth: "460px",
                borderRadius: "28px",
                background: "rgba(255, 255, 255, 0.92)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="eyebrow-label">Collection {activeDrawer.index}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 600,
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {activeDrawer.name}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveDrawer(null)}
                  className="border-0 bg-transparent p-2"
                  style={{ cursor: "pointer", color: "var(--text-primary)" }}
                >
                  <FaXmark size={18} />
                </button>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {activeDrawer.tagline}
              </p>

              <div className="d-flex flex-column mt-4" style={{ gap: "0.75rem" }}>
                {activeDrawer.subcategories.map((sub) => (
                  <button
                    key={sub.route}
                    type="button"
                    onClick={() => {
                      navigate(sub.route);
                      setActiveDrawer(null);
                    }}
                    className="butt w-100 justify-content-between"
                    style={{ padding: "0.95rem 1.4rem" }}
                  >
                    <span>{sub.label}</span>
                    <FaArrowRight size={12} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/**
 * SilhouetteDirectory
 * Expanded 7-subcategory menswear grid + upcoming lines.
 */
export const SilhouetteDirectory = () => {
  const clothesList = useSelector((state) => state.clothes?.clothes || []);

  const countMap = useMemo(() => {
    const map = {};
    clothesList.forEach((entry) => {
      if (entry?.category) {
        map[entry.category.toLowerCase()] = Array.isArray(entry.items) ? entry.items.length : 0;
      }
    });
    return map;
  }, [clothesList]);

  return (
    <section
      style={{
        padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(3rem, 6vw, 4.5rem)",
        backgroundColor: "var(--bg-bone)",
      }}
    >
      <Container style={{ maxWidth: "1360px" }}>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end mb-4">
          <div>
            <span className="eyebrow-label mb-1">Expanded Directory</span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Explore by Silhouette
            </h3>
          </div>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            7 Menswear Categories
          </span>
        </div>

        <Row className="g-3">
          {EXPANDED_SUBCATEGORIES.map((sub) => {
            const itemCount = countMap[sub.apiKey];
            return (
              <Col lg={3} md={4} sm={6} xs={6} key={sub.route} className="mb-3">
                <Link to={sub.route} className="subcat-editorial-tile h-100">
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4 / 5",
                      overflow: "hidden",
                      backgroundColor: "#eae5dc",
                    }}
                  >
                    <img
                      src={sub.img}
                      alt={sub.title}
                      loading="lazy"
                      onError={(e) => {
                        if (sub.fallbackImg && e.currentTarget.src !== sub.fallbackImg) {
                          e.currentTarget.src = sub.fallbackImg;
                        }
                      }}
                    />
                    {typeof itemCount === "number" && (
                      <span
                        className="liquid-glass-pill position-absolute px-2 py-1"
                        style={{
                          top: "10px",
                          right: "10px",
                          fontSize: "0.66rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color: "#141312",
                        }}
                      >
                        {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "style" : "styles"}` : "Curating"}
                      </span>
                    )}
                  </div>

                  <div className="p-3 d-flex justify-content-between align-items-center">
                    <div style={{ minWidth: 0 }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.18rem",
                          fontWeight: 600,
                          margin: 0,
                          color: "var(--text-primary)",
                        }}
                      >
                        {sub.title}
                      </h4>
                      <p
                        className="mb-0 text-truncate"
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--text-muted)",
                          marginTop: "2px",
                        }}
                      >
                        {sub.subtitle}
                      </p>
                    </div>
                    <span
                      className="d-none d-sm-inline-flex align-items-center justify-content-center flex-shrink-0 ml-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "1px solid var(--hairline)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <FaArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>

        {/* Upcoming Brand Expansions Strip */}
        <div className="mt-4 pt-2">
          <Row className="g-3">
            {UPCOMING_LINES.map((line) => (
              <Col md={4} xs={12} key={line.title} className="mb-2 mb-md-0">
                <div
                  className="liquid-glass d-flex justify-content-between align-items-center px-4 py-3"
                  style={{ borderRadius: "16px" }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {line.title}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                      {line.note}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      background: "var(--accent-soft)",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "999px",
                    }}
                  >
                    Soon
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

function Category() {
  return (
    <>
      <CollectionPair pair="top" />
      <CollectionPair pair="bottom" />
      <SilhouetteDirectory />
    </>
  );
}

export default Category;
