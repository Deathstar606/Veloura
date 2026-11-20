import React from "react";
import { Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { FaXmark, FaArrowRight, FaTrashCan } from "react-icons/fa6";
import ProductVisual from "./ProductVisual";

export const OrderBar = (props) => {
  const ordersList = props.orders?.orders || [];
  const total = ordersList.reduce((sum, order) => sum + order.price * order.quantity, 0);

  return (
    <motion.div
      onClick={props.handleOrdPage}
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.aside
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="liquid-glass"
        style={{
          background: "rgba(250, 249, 247, 0.92)",
          width: "min(88vw, 440px)",
          height: "100vh",
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(255, 255, 255, 0.7)",
        }}
      >
        {/* Header */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3"
          style={{ borderBottom: "1px solid var(--hairline)" }}
        >
          <div>
            <span className="eyebrow-label" style={{ fontSize: "0.62rem" }}>
              Shopping Bag
            </span>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Your Selection ({ordersList.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={props.handleOrdPage}
            aria-label="Close bag"
            className="nav-cart-btn"
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow-1 overflow-auto px-4 py-3">
          {ordersList.length > 0 ? (
            <div className="d-flex flex-column" style={{ gap: "1rem" }}>
              {ordersList.map((order, index) => (
                <div
                  key={order.cart_id || index}
                  className="p-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.75)",
                    borderRadius: "18px",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <RouterLink
                        to={`/home/${encodeURIComponent(order.category)}/${order._id}`}
                        onClick={props.handleOrdPage}
                        className="d-block"
                        style={{ aspectRatio: "4 / 5", borderRadius: "12px", overflow: "hidden" }}
                      >
                        <ProductVisual
                          src={order.image}
                          alt={order.name}
                          colorHint={order.color}
                          compact
                        />
                      </RouterLink>
                    </Col>

                    <Col xs={8}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.15rem",
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        {order.name}
                      </div>

                      <div className="small text-muted mt-1">
                        Size: <strong className="text-dark">{order.size}</strong> &middot; Qty:{" "}
                        <strong className="text-dark">{order.quantity}</strong>
                      </div>

                      <div className="d-flex align-items-center mt-1" style={{ gap: "0.45rem" }}>
                        <span className="small text-muted">Color:</span>
                        <span
                          className="color-box"
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: (order.color || "").trim(),
                            cursor: "default",
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="tabular-price font-weight-bold" style={{ color: "var(--accent)" }}>
                          {(order.price * order.quantity).toLocaleString()} TK
                        </span>

                        <button
                          type="button"
                          onClick={() => props.removeOrder(order.cart_id)}
                          className="border-0 bg-transparent text-muted d-inline-flex align-items-center"
                          style={{ fontSize: "0.75rem", cursor: "pointer", gap: "0.3rem" }}
                        >
                          <FaTrashCan size={11} /> Remove
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 my-4">
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.65rem" }}>
                Your bag is empty
              </h4>
              <p className="text-muted small mb-0">
                Explore our tailored shirts, knit polos, and summer edits to begin.
              </p>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {ordersList.length > 0 && (
          <div
            className="p-4"
            style={{
              borderTop: "1px solid var(--hairline)",
              background: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <span className="text-muted small text-uppercase" style={{ letterSpacing: "0.14em" }}>
                Subtotal
              </span>
              <span className="tabular-price" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                {total.toLocaleString()} TK
              </span>
            </div>

            <RouterLink to="/home/orders" className="text-decoration-none">
              <button
                type="button"
                onClick={props.handleOrdPage}
                className="butt-glass w-100"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight size={12} />
              </button>
            </RouterLink>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
};
