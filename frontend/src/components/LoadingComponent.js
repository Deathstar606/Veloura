import React from "react";
import { motion } from "framer-motion";

export const Loading = ({ fullScreen = false, message = "Curating Collection" }) => {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: fullScreen ? "72vh" : "240px",
        padding: "2.5rem 1rem",
      }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass d-flex flex-column align-items-center"
        style={{
          padding: "2rem 2.75rem",
          borderRadius: "28px",
          gap: "1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer rotating editorial ring */}
          <motion.svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(20, 19, 18, 0.1)"
              strokeWidth="1.5"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#DD6410"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="48 110"
            />
          </motion.svg>

          {/* Inner counter-rotating monogram mark */}
          <motion.span
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: 600,
              color: "#141312",
              letterSpacing: "0.02em",
            }}
          >
            V
          </motion.span>
        </div>

        <div className="text-center">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              fontWeight: 600,
              letterSpacing: "0.24em",
              color: "#141312",
            }}
          >
            VELOURA
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6C6760",
              marginTop: "0.3rem",
            }}
          >
            {message}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 4 }) => (
  <div className="row g-3 g-md-4 w-100 mx-0">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="col-6 col-md-4 col-lg-3 mb-4">
        <div
          className="skeleton-shimmer w-100"
          style={{ aspectRatio: "4 / 5", borderRadius: "18px" }}
        />
        <div
          className="skeleton-shimmer mx-auto mt-3"
          style={{ height: "14px", width: "68%", borderRadius: "999px" }}
        />
        <div
          className="skeleton-shimmer mx-auto mt-2"
          style={{ height: "12px", width: "42%", borderRadius: "999px" }}
        />
      </div>
    ))}
  </div>
);
