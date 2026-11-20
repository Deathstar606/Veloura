import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label } from "reactstrap";
import { Product } from "./Card";
import { Breadcrumb } from "./BreadCrumb";
import { BsX, BsSliders } from "react-icons/bs";
import "./filterPanel.css";
import { AnimatePresence, motion } from "framer-motion";
import { Range } from "react-range";

const SORT_OPTIONS = ["Awareness", "Popularity", "High to Low", "Low to High"];

const ProductList = ({ category, products = [] }) => {
  const [criteria, setCriteria] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 4000]);

  const location = useLocation();
  const endpoint = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return decodeURIComponent(segments[segments.length - 1] || category || "");
  }, [location.pathname, category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filteredClothes = useMemo(() => {
    return (products || [])
      .filter((cloth) => cloth.price >= priceRange[0] && cloth.price <= priceRange[1])
      .sort((a, b) => {
        if (criteria === "Low to High") return a.price - b.price;
        if (criteria === "High to Low") return b.price - a.price;
        if (criteria === "Awareness") return new Date(b.createdAt) - new Date(a.createdAt);
        if (criteria === "Popularity") return (b.ordered || 0) - (a.ordered || 0);
        return 0;
      });
  }, [products, priceRange, criteria]);

  const renderFilterControls = () => (
    <Form>
      <FormGroup>
        <Label className="pb-2 small text-uppercase" style={{ letterSpacing: "0.14em" }}>
          Price Range (TK)
        </Label>
        <div className="price-range px-2">
          <Range
            values={priceRange}
            step={50}
            min={0}
            max={4000}
            onChange={setPriceRange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="track"
                style={{ ...props.style, display: "flex", alignItems: "center" }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  backgroundColor: "#ffffff",
                  border: "2px solid var(--accent)",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                }}
              />
            )}
          />
          <div className="price-values tabular-price mt-2">
            <span>{priceRange[0]} TK</span>
            <span>{priceRange[1]} TK</span>
          </div>
        </div>
      </FormGroup>

      <div className="pt-3">
        <div className="small text-uppercase font-weight-bold mb-2" style={{ letterSpacing: "0.14em" }}>
          Sort By
        </div>
        <div className="d-flex flex-wrap" style={{ gap: "0.5rem" }}>
          {SORT_OPTIONS.map((item) => (
            <button
              type="button"
              key={item}
              className={`criteria-option bg-transparent ${criteria === item ? "selected" : ""}`}
              onClick={() => setCriteria(criteria === item ? "" : item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </Form>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: "75vh", paddingBottom: "4rem" }}
    >
      <Container style={{ maxWidth: "1380px" }} className="pt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <Breadcrumb
            items={[
              { link: "/home", active: false },
              {
                name: (
                  <strong style={{ color: "var(--accent)", textTransform: "capitalize" }}>
                    {endpoint}
                  </strong>
                ),
                link: "",
                active: true,
              },
            ]}
          />

          <button
            type="button"
            className="butt d-md-none"
            style={{ padding: "0.45rem 1rem", fontSize: "0.72rem" }}
            onClick={() => setIsFilterOpen(true)}
          >
            <BsSliders className="mr-1" /> Filters
          </button>
        </div>

        <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
          <span className="eyebrow-label mb-1">Veloura Menswear</span>
          <div className="d-flex justify-content-between align-items-baseline flex-wrap">
            <h1 className="section-heading" style={{ textTransform: "capitalize" }}>
              {endpoint}
            </h1>
            <span className="small text-muted tabular-price">
              {filteredClothes.length} {filteredClothes.length === 1 ? "Piece" : "Pieces"}
            </span>
          </div>
        </div>

        <Row>
          {/* Desktop Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <div
              className="liquid-glass p-4"
              style={{ borderRadius: "22px", position: "sticky", top: "92px" }}
            >
              <h5
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.45rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                Refine Selection
              </h5>
              {renderFilterControls()}
            </div>
          </Col>

          {/* Product Grid */}
          <Col md={9} xs={12}>
            {filteredClothes.length > 0 ? (
              <Row className="g-3 g-md-4">
                {filteredClothes.map((cloth) => (
                  <Col lg={4} md={6} xs={6} className="mb-4" key={cloth._id}>
                    <Product category={category} child={cloth} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div
                className="liquid-glass text-center p-5 my-3"
                style={{ borderRadius: "24px" }}
              >
                <span className="eyebrow-label justify-content-center mb-2">Capsule Update</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
                  Curating New Pieces
                </h3>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: "420px" }}>
                  No garments match your current filter or this capsule is currently being restocked.
                </p>
                <Link to="/home" className="butt">
                  Explore Collections
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Mobile Liquid-Glass Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="modal-back d-md-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass p-4"
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "65vh",
                borderRadius: "26px 26px 0 0",
                background: "rgba(250, 249, 247, 0.96)",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", margin: 0 }}>
                  Filter &amp; Sort
                </h4>
                <BsX size={28} onClick={() => setIsFilterOpen(false)} style={{ cursor: "pointer" }} />
              </div>
              {renderFilterControls()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
