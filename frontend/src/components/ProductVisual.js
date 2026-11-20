import React, { useState, useEffect } from "react";

// Cache known broken remote image URLs so switching swatches or routes never flickers
const failedImageCache = new Set();

/**
 * ProductVisual
 * Attempts to display the product image cleanly; when images are unavailable
 * or fail to load, renders a bespoke editorial placeholder displaying the
 * product alt text and a clear studio notice ("Images will be available soon").
 */
const ProductVisual = ({
  src,
  alt = "Veloura Garment",
  className = "",
  style = {},
  colorHint = "",
  subLabel = "",
  compact = false,
  onClick,
}) => {
  const initialFailed = !src || failedImageCache.has(src);
  const [failed, setFailed] = useState(initialFailed);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src || failedImageCache.has(src)) {
      setFailed(true);
      setLoaded(false);
    } else {
      setFailed(false);
      setLoaded(false);
    }
  }, [src]);

  const handleError = () => {
    if (src) failedImageCache.add(src);
    setFailed(true);
    setLoaded(false);
  };

  const handleLoad = () => {
    setLoaded(true);
    setFailed(false);
  };

  const cleanSwatch = (colorHint || "").trim();

  return (
    <div
      onClick={onClick}
      className={`product-visual-frame ${compact ? "is-compact" : ""} ${className}`}
      style={style}
      role="img"
      aria-label={`${alt} — Product images will be available soon`}
    >
      {/* Styled Editorial Placeholder (always underneath until/unless image loads) */}
      {(!loaded || failed) && (
        <div className="product-placeholder-canvas">
          {/* Subtle color atmosphere halo */}
          {cleanSwatch && (
            <span
              className="product-placeholder-aura"
              style={{ backgroundColor: cleanSwatch }}
              aria-hidden="true"
            />
          )}

          {/* Architectural hairline frame */}
          <div className="product-placeholder-inner">
            {!compact && (
              <div className="product-placeholder-top" style={{ justifyContent: "flex-end" }}>
                {subLabel && (
                  <span className="product-placeholder-view">{subLabel}</span>
                )}
              </div>
            )}

            <div className="product-placeholder-center">
              {!compact && (
                <span className="product-placeholder-brand">VELOURA ATELIER</span>
              )}
              {/* Minimalist garment silhouette emblem */}
              <svg
                width={compact ? "22" : "34"}
                height={compact ? "22" : "34"}
                viewBox="0 0 36 36"
                fill="none"
                aria-hidden="true"
                className="product-placeholder-icon"
              >
                <path
                  d="M18 6C16.3 6 15 7.2 15 8.8C15 10.1 16 11 17.5 11.4V13L5.8 19.6C4.8 20.2 5.2 21.8 6.4 21.8H29.6C30.8 21.8 31.2 20.2 30.2 19.6L18.5 13V11.4"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 21.8V28.5C10 29.3 10.7 30 11.5 30H24.5C25.3 30 26 29.3 26 28.5V21.8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Product alt text rendered as curated editorial label */}
              <span className="product-placeholder-alt">{alt}</span>
            </div>

            <div className="product-placeholder-notice liquid-glass-pill">
              <span className="notice-dot" aria-hidden="true" />
              <span>
                {compact ? "Images soon" : "Images will be available soon"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Real image element if available */}
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className="product-visual-img"
          style={{
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
};

export default ProductVisual;
