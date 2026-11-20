import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Container, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "./BreadCrumb";
import axios from "axios";
import { baseUrl } from "../Redux/shared/baseurl";
import { motion } from "framer-motion";
import pp from "../images/Pay logo/1 (1).png";
import ProductVisual from "./ProductVisual";

const steps = [
  { number: 1, label: "Cart" },
  { number: 2, label: "Order" },
  { number: 3, label: "Payment" },
];

function Order(props) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [deliveryZone, setDeliveryZone] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [error, setError] = useState("");

  const [agreeTerm, setagreeTerm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [Vloading, setVLoading] = useState(false);

  const navigate = useNavigate();

  const finalTotal = total - discount;

  const removeOrder = (orderid) => {
    setDiscount(0);
    setVoucherApplied(false);
    props.removeExistingOrder(orderid);
  };

  const handleChangeTerm = () => {
    setagreeTerm(!agreeTerm);
  };

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
    setError("");
    setVoucherApplied(false);
    setDiscount(0);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlezone = (zone) => {
    setDeliveryZone(zone);
    if (zone === "outside") {
      setDeliveryFee(120);
    } else if (zone === "inside") {
      setDeliveryFee(70);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    address: "",
    email: "",
    delivery: deliveryFee,
    total: finalTotal,
    items: [],
  });

  useEffect(() => {
    const calculatedTotal = props.orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [props.orders]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("VelouraFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData((prevData) => ({
        ...prevData,
        firstName: parsedData.firstName || "",
        phoneNumber: parsedData.phoneNumber || "",
        address: parsedData.address || "",
        email: parsedData.email || "",
      }));
    }
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      delivery: deliveryFee,
      total: finalTotal + deliveryFee,
      items: props.orders,
    }));
  }, [finalTotal, discount, deliveryFee, props.orders]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitVoucher = async () => {
    setVLoading(true);
    try {
      const response = await axios.post(`${baseUrl}voucher`, { name: voucher });
      const value = response.data.value;

      setDiscount((total * value) / 100);
      setVoucherApplied(true);
      setVLoading(false);
      setError("");
    } catch (err) {
      setVoucherApplied(false);
      setDiscount(0);
      setVLoading(false);
      setError("Invalid or expired voucher.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    localStorage.setItem("VelouraFormData", JSON.stringify(formData));

    const orderToSubmit = {
      ...formData,
      order_stat: paymentMethod,
    };

    if (paymentMethod === "online") {
      orderToSubmit.total = (finalTotal + deliveryFee) * 0.95;
    }

    if (formData.firstName === "") {
      setLoading(false);
      return alert("Please type your first name");
    }
    if (formData.phoneNumber === "") {
      setLoading(false);
      return alert("Please type your phone number");
    }
    if (formData.address === "") {
      setLoading(false);
      return alert("Please type your address");
    }
    if (formData.email === "") {
      setLoading(false);
      return alert("Please enter a valid email address");
    }
    if (formData.total <= 0) {
      setLoading(false);
      return alert("Please add items to your cart first");
    }
    if (deliveryZone === null) {
      setLoading(false);
      return alert("Select a delivery zone first");
    }
    if (!agreeTerm) {
      setLoading(false);
      return alert("You must agree to terms and conditions");
    }

    try {
      const endpoint =
        paymentMethod === "cod" ? `${baseUrl}orders/cod` : `${baseUrl}orders`;

      const response = await axios.post(endpoint, orderToSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (paymentMethod !== "cod") {
        window.open(response.data.url);
      } else {
        navigate("/home/cod");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong.");
      } else if (err.request) {
        setError("No response from server.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pb-5"
    >
      <Container style={{ maxWidth: "1320px" }} className="pt-3">
        <Breadcrumb
          items={[
            { link: "/home", active: false },
            {
              name: <strong style={{ color: "var(--accent)" }}>Checkout</strong>,
              link: "",
              active: true,
            },
          ]}
        />

        {/* Stepper */}
        <Row className="justify-content-center my-4">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <Col xs={4} sm={3} key={step.number} className="d-flex flex-column align-items-center">
                <div
                  className="mb-2 d-flex justify-content-center align-items-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: isLast ? "transparent" : "var(--accent)",
                    border: isLast ? "1.5px solid var(--text-primary)" : "none",
                    color: isLast ? "var(--text-primary)" : "#ffffff",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {step.number}
                </div>
                <div className="small font-weight-bold text-uppercase" style={{ letterSpacing: "0.1em" }}>
                  {step.label}
                </div>
              </Col>
            );
          })}
        </Row>

        <Row className="g-4 mt-2 align-items-start">
          {/* Customer Form & Delivery Zone */}
          <Col lg={6} className="mb-4">
            <div
              className="p-4 p-md-5"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid var(--hairline)",
              }}
            >
              <span className="eyebrow-label mb-1">Step 01</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-4">
                Customer Details
              </h2>

              <Form>
                <FormGroup>
                  <Label className="small font-weight-bold">Recipient Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Full Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", padding: "0.7rem 1rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="small font-weight-bold">Recipient Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", padding: "0.7rem 1rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="small font-weight-bold">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", padding: "0.7rem 1rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="small font-weight-bold">Shipping Address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="House, Road, Area, City"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", padding: "0.7rem 1rem" }}
                  />
                </FormGroup>
              </Form>

              <h3
                style={{ fontFamily: "var(--font-display)", fontSize: "1.65rem", fontWeight: 600 }}
                className="mt-4 mb-3"
              >
                Select Delivery Zone
              </h3>

              <div className="d-flex flex-column" style={{ gap: "0.85rem" }}>
                {[
                  {
                    id: "inside",
                    title: "Inside Khulna — 70 TK",
                    eta: "Estimated delivery within 24 hours",
                  },
                  {
                    id: "outside",
                    title: "Outside Khulna — 120 TK",
                    eta: "Estimated delivery within 72 hours after processing",
                  },
                ].map((zone) => {
                  const selected = deliveryZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => handlezone(zone.id)}
                      className="p-3 p-md-4"
                      style={{
                        borderRadius: "18px",
                        border: selected
                          ? "2px solid var(--accent)"
                          : "1px solid var(--hairline)",
                        backgroundColor: selected ? "var(--accent-soft)" : "var(--bg-canvas)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong style={{ fontSize: "0.95rem" }}>{zone.title}</strong>
                        {selected && (
                          <span
                            className="badge text-white px-2 py-1"
                            style={{ backgroundColor: "var(--accent)", borderRadius: "999px" }}
                          >
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="small text-muted mt-1">{zone.eta}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* Summary & Payment */}
          <Col lg={6}>
            <div className="liquid-glass p-4 p-md-5" style={{ borderRadius: "24px" }}>
              <span className="eyebrow-label mb-1">Step 02</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-3">
                Order Summary
              </h2>

              {props.orders.length > 0 ? (
                <div className="d-flex flex-column mb-4" style={{ gap: "0.85rem" }}>
                  {props.orders.map((order, index) => (
                    <div
                      key={order.cart_id || index}
                      className="p-3"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.75)",
                        borderRadius: "16px",
                        border: "1px solid var(--hairline)",
                      }}
                    >
                      <Row className="align-items-center">
                        <Col xs={3}>
                          <div
                            style={{
                              aspectRatio: "4 / 5",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <ProductVisual
                              src={order.image}
                              alt={order.name}
                              colorHint={order.color}
                              compact
                            />
                          </div>
                        </Col>
                        <Col xs={9}>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600 }}>
                            {order.name}
                          </div>
                          <div className="small text-muted">
                            Size <strong>{order.size}</strong> &middot; Qty <strong>{order.quantity}</strong>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="tabular-price font-weight-bold">
                              {(order.price * order.quantity).toLocaleString()} TK
                            </span>
                            <button
                              type="button"
                              className="border-0 bg-transparent text-danger small font-weight-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeOrder(order.cart_id)}
                            >
                              Remove
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted">No items in cart</div>
              )}

              {/* Voucher */}
              <FormGroup className="mb-3">
                <Label for="voucher" className="small font-weight-bold">
                  Voucher Code
                </Label>
                <div className="voucher">
                  <Input
                    type="text"
                    id="voucher"
                    name="voucher"
                    value={voucher}
                    onChange={handleVoucherChange}
                    placeholder="Enter promo code"
                    style={{ borderRadius: "999px", padding: "0.6rem 1rem" }}
                  />
                  <button
                    type="button"
                    disabled={Vloading}
                    className="butt"
                    onClick={submitVoucher}
                    style={{ padding: "0.6rem 1.4rem" }}
                  >
                    {Vloading ? "Applying..." : "Apply"}
                  </button>
                </div>
              </FormGroup>

              {voucherApplied && (
                <Alert color="success" className="mt-2">
                  Voucher applied successfully! You saved {discount.toFixed(2)} Tk.
                </Alert>
              )}

              {error && (
                <Alert color="danger" className="mt-2">
                  {error}
                </Alert>
              )}

              <div className="py-3 my-3" style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>Delivery Fee</span>
                  <span className="tabular-price">{deliveryFee} TK</span>
                </div>
                <div className="d-flex justify-content-between align-items-baseline mt-2">
                  <span className="font-weight-bold">Total</span>
                  <span className="tabular-price" style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--accent)" }}>
                    {paymentMethod === "online"
                      ? ((finalTotal + deliveryFee) * 0.95).toFixed(2)
                      : (finalTotal + deliveryFee).toFixed(2)}{" "}
                    TK
                  </span>
                </div>
                {paymentMethod === "online" && (
                  <div className="small text-success text-right">5% Online Payment Discount Applied</div>
                )}
              </div>

              {/* Payment Method */}
              <div className="d-flex flex-wrap mb-2" style={{ gap: "1rem" }}>
                {[
                  { id: "cod", label: "Cash on Delivery" },
                  { id: "online", label: "Online Payment (5% Off)" },
                  { id: "partialcod", label: "Partial Payment" },
                ].map((m) => (
                  <FormGroup check key={m.id}>
                    <Label check className="small font-weight-bold">
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={handlePaymentChange}
                      />
                      {m.label}
                    </Label>
                  </FormGroup>
                ))}
              </div>

              <p className="small text-muted mb-3">
                {paymentMethod === "cod" && "Make full payment after product has been delivered."}
                {paymentMethod === "online" && "Make the full payment online and receive an instant 5% discount."}
                {paymentMethod === "partialcod" && "Pay only the delivery fee online and settle the product price upon arrival."}
              </p>

              <Label className="small d-block mb-3">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={agreeTerm}
                  onChange={handleChangeTerm}
                />
                I agree to the{" "}
                <Link className="text-dark font-weight-bold" to="/home/terms" target="_blank">
                  Terms &amp; Conditions
                </Link>
                ,{" "}
                <Link className="text-dark font-weight-bold" to="/home/privacy" target="_blank">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link className="text-dark font-weight-bold" to="/home/refund" target="_blank">
                  Return &amp; Refund Policy
                </Link>
                .
              </Label>

              <button
                type="button"
                className="butt-glass w-100"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Processing Order..." : "Confirm Order"}
              </button>

              <div className="mt-4 pt-3 text-center" style={{ borderTop: "1px solid var(--hairline)" }}>
                <div className="small text-muted mb-2">Pay securely with</div>
                <img style={{ maxWidth: "130px" }} src={pp} alt="SSLCommerz" />
                <p className="small text-muted mt-2 mb-0">
                  Supports bKash, Nagad, Visa, MasterCard &amp; mobile banking.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Order;
