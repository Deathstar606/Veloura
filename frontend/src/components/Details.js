import React, { useState, useEffect } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Breadcrumb } from "./BreadCrumb";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./details.css";
import { FaPhone, FaWhatsapp, FaXmark } from "react-icons/fa6";
import ProductVisual from "./ProductVisual";

const Deats = (props) => {
  const [mainImage, setMainImage] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [colors, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.deats && Array.isArray(props.deats.color) && props.deats.color.length > 0) {
      const activeColor =
        colors && props.deats.color.includes(colors) ? colors : props.deats.color[0];
      if (activeColor !== colors) {
        setColor(activeColor);
      }
      const imageUrl = props.deats.images?.[activeColor]?.[0] || "";
      setMainImage(imageUrl);
    } else {
      setColor("");
      setMainImage("");
    }
  }, [props.deats, colors]);

  if (props.isLoading) {
    return <Loading fullScreen />;
  }

  if (props.errMess) {
    return (
      <Container className="py-5 text-center">
        <h4>{props.errMess}</h4>
      </Container>
    );
  }

  if (!props.deats) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: "65vh" }}>
        <span className="eyebrow-label justify-content-center mb-2">Veloura Atelier</span>
        <h2 className="section-heading mb-3">Piece Not Found</h2>
        <p className="text-muted mb-4">
          This garment may have been moved or sold out.
        </p>
        <Link to="/home" className="butt">
          Return Home
        </Link>
      </Container>
    );
  }

  const maxQuantity = props.deats?.size?.[selectedSize] || 1;
  const discountedPrice = props.deats?.discount
    ? Math.round(props.deats.price - props.deats.price * (props.deats.discount / 100))
    : null;

  const updateQuantity = (val) => {
    if (selectedSize === "") {
      alert("Please select a size first");
      return;
    }
    if (!isNaN(val) && val >= 0 && val <= maxQuantity) {
      setQuantity(val);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    if ((props.deats?.size?.[size] || 0) > 0) {
      setQuantity(1);
    } else {
      setQuantity(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSize === "") return alert("Please select a size");
    if (quantity === 0) return alert("This size is out of stock");

    props.addNewOrder({
      cart_id: Math.floor(100000 + Math.random() * 900000),
      _id: props.deats._id,
      category: category,
      name: props.deats.name,
      price: discountedPrice ? discountedPrice : props.deats.price,
      color: colors,
      image: props.deats.images?.[colors]?.[0] || "",
      size: selectedSize,
      quantity: quantity,
    });
    props.toggleCart();
  };

  const activeGallery = props.deats.images?.[colors] || [];

  return (
    <>
      <div
        className="w-100 text-white text-center py-2 mb-3"
        style={{
          backgroundColor: "var(--bg-obsidian)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        5% off on all online payments
      </div>

      <Container style={{ maxWidth: "1360px" }} className="pb-5">
        <div className="mb-3">
          <Breadcrumb
            items={[
              { name: "Home", link: "/home", active: false },
              {
                name: category,
                link: `/home/${encodeURIComponent(category)}`,
                active: false,
              },
              {
                name: (
                  <strong style={{ color: "var(--accent)" }}>
                    {props.deats.name}
                  </strong>
                ),
                link: "",
                active: true,
              },
            ]}
          />
        </div>

        <Row className="g-4 align-items-start">
          {/* Desktop Thumbnails */}
          <Col md={2} className="d-none d-md-flex justify-content-end">
            <div className="image-previews w-100" style={{ maxWidth: "110px" }}>
              {activeGallery.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 5",
                    borderRadius: "14px",
                    overflow: "hidden",
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                    border:
                      mainImage === img
                        ? "2px solid var(--accent)"
                        : "1px solid var(--hairline)",
                  }}
                >
                  <ProductVisual
                    src={img}
                    alt={`${props.deats.name} view ${index + 1}`}
                    colorHint={colors}
                    compact
                  />
                </div>
              ))}
            </div>
          </Col>

          {/* Desktop Main Visual */}
          <Col md={5} className="d-none d-md-block">
            <div
              onClick={() => setFullscreenImage(mainImage || "placeholder")}
              style={{
                aspectRatio: "4 / 5",
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                cursor: "zoom-in",
                boxShadow: "0 18px 46px rgba(15, 14, 12, 0.1)",
              }}
            >
              <ProductVisual
                src={mainImage}
                alt={props.deats.name}
                colorHint={colors}
                subLabel="Studio View"
              />
            </div>
          </Col>

          {/* Mobile Swiper Gallery */}
          <Col xs={12} className="d-md-none mb-2">
            <Swiper
              className="mb-2"
              slidesPerView={1}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {(activeGallery.length > 0 ? activeGallery : [""]).map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => setFullscreenImage(img || "placeholder")}
                    style={{
                      aspectRatio: "4 / 5",
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <ProductVisual
                      src={img}
                      alt={props.deats.name}
                      colorHint={colors}
                      subLabel={`Look ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          {/* Product Details & Purchase Panel */}
          <Col md={5} xs={12}>
            <div
              className="liquid-glass p-4 p-lg-5"
              style={{ borderRadius: "24px" }}
            >
              <span className="eyebrow-label mb-2">{category}</span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.9rem, 3vw, 2.65rem)",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                {props.deats.name}
              </h1>

              {/* Price + Discount */}
              <div className="d-flex align-items-center mb-3 tabular-price" style={{ gap: "0.75rem" }}>
                {discountedPrice ? (
                  <>
                    <span
                      className="text-muted"
                      style={{ textDecoration: "line-through", fontSize: "1.05rem" }}
                    >
                      {props.deats.price} TK
                    </span>
                    <span
                      style={{
                        color: "var(--accent)",
                        fontSize: "1.45rem",
                        fontWeight: 700,
                      }}
                    >
                      {discountedPrice} TK
                    </span>
                    <span className="badge bg-danger text-white px-2 py-1">
                      {props.deats.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: "1.45rem", fontWeight: 700 }}>
                    {props.deats.price} TK
                  </span>
                )}
              </div>

              {/* Colors */}
              <div className="mb-3">
                <div className="small text-uppercase font-weight-bold mb-2" style={{ letterSpacing: "0.12em" }}>
                  Color: <span className="text-muted">{colors}</span>
                </div>
                <div className="color-options d-flex align-items-center">
                  {(props.deats.color || []).map((col, index) => (
                    <button
                      type="button"
                      key={index}
                      aria-label={`Choose color ${col}`}
                      className={`color-box ${colors === col ? "active-swatch" : ""}`}
                      style={{
                        backgroundColor: col.trim(),
                        width: "26px",
                        height: "26px",
                        marginRight: "10px",
                      }}
                      onClick={() => setColor(col)}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-3">
                <div className="small text-uppercase font-weight-bold mb-2" style={{ letterSpacing: "0.12em" }}>
                  Select Size
                </div>
                <ButtonGroup className="flex-wrap" style={{ gap: "0.4rem" }}>
                  {Object.entries(props.deats?.size || {}).map(([size]) => (
                    <Button
                      key={size}
                      outline
                      color="dark"
                      onClick={() => handleSizeChange(size)}
                      active={selectedSize === size}
                      style={{
                        borderRadius: "999px",
                        minWidth: "48px",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              {selectedSize && (props.deats.size?.[selectedSize] || 0) < 5 && (
                <div className="small mb-2" style={{ color: "var(--accent)", fontWeight: 600 }}>
                  Stock remaining: {props.deats.size[selectedSize]}
                </div>
              )}

              {selectedSize && (props.deats.size?.[selectedSize] || 0) > 0 && (
                <div className="mt-3 mb-4">
                  <div className="small text-uppercase font-weight-bold mb-2" style={{ letterSpacing: "0.12em" }}>
                    Quantity
                  </div>
                  <div className="d-flex align-items-center">
                    <Button outline color="dark" onClick={() => updateQuantity(quantity - 1)}>
                      −
                    </Button>
                    <input
                      type="text"
                      className="form-control text-center mx-2 tabular-price"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        updateQuantity(val);
                      }}
                      style={{
                        width: "54px",
                        border: "1.5px solid var(--accent)",
                        borderRadius: "999px",
                      }}
                    />
                    <Button outline color="dark" onClick={() => updateQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <button type="button" onClick={handleSubmit} className="butt-glass w-100">
                  Buy Now
                </button>
              </div>

              <div className="d-flex align-items-center mt-4 pt-3" style={{ gap: "0.85rem", borderTop: "1px solid var(--hairline)" }}>
                <span className="small text-muted">Need sizing help?</span>
                <a
                  href="https://wa.me/+8801924223600"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp support"
                >
                  <FaWhatsapp color="#198754" size={24} />
                </a>
                <a href="tel:01629743377" aria-label="Phone support">
                  <FaPhone color="#141312" size={19} />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Fullscreen Modal */}
        {fullscreenImage && (
          <motion.div
            className="fullscreen-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage("")}
          >
            <button
              type="button"
              onClick={() => setFullscreenImage("")}
              aria-label="Close fullscreen preview"
              className="nav-cart-btn position-absolute"
              style={{ top: "20px", right: "20px", zIndex: 10 }}
            >
              <FaXmark size={18} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(90vw, 520px)",
                aspectRatio: "4 / 5",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <ProductVisual
                src={fullscreenImage === "placeholder" ? "" : fullscreenImage}
                alt={props.deats.name}
                colorHint={colors}
                subLabel="Full Screen Preview"
              />
            </div>
          </motion.div>
        )}

        {/* Description & Size Chart */}
        <Row className="mt-5 justify-content-center">
          <Col lg={8} md={10}>
            <div
              className="p-4 p-md-5"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid var(--hairline)",
              }}
            >
              <span className="eyebrow-label mb-2">Details &amp; Craft</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 600 }}>
                Description
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.75, whiteSpace: "pre-line" }}>
                {props.deats.description}
              </p>

              <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--hairline)" }}>
                <h4
                  className="text-center mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 600 }}
                >
                  Size Chart
                </h4>
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <table className="table table-bordered text-center mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Measurement Points (Inch)</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-price">
                      <tr>
                        <td>Length Standard (Inch)</td>
                        <td>38</td>
                        <td>40</td>
                        <td>42</td>
                        <td>44</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Deats;
