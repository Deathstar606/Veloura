import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import ProductVisual from "./ProductVisual";
import "./card.css";

export const Product = memo(({ category, child }) => {
  const colorList = Array.isArray(child.color) && child.color.length > 0 ? child.color : ["Default"];
  const [defCol, setDefCol] = useState(colorList[0]);

  const colorImages = child.images?.[defCol] || Object.values(child.images || {})[0] || [];
  const dem1 = colorImages[0] || "";
  const dem2 = colorImages[1] || dem1;

  const hasDiscount = Boolean(child.discount && Number(child.discount) > 0);
  const discountedPrice = hasDiscount
    ? Math.round(child.price - child.price * (child.discount / 100))
    : null;

  return (
    <article className="product-card-luxury">
      <div className="curd">
        {hasDiscount && (
          <span className="badge discount-glass-badge liquid-glass-pill">
            <span>{child.discount}%</span> OFF
          </span>
        )}

        <Link to={`/home/${encodeURIComponent(category)}/${child._id}`} aria-label={`View ${child.name}`}>
          <div className="pro-img-container">
            <div className="pro-layer primary">
              <ProductVisual
                src={dem1}
                alt={child.name}
                colorHint={defCol}
                subLabel="Front Look"
              />
            </div>
            <div className="pro-layer secondary">
              <ProductVisual
                src={dem2}
                alt={child.name}
                colorHint={defCol}
                subLabel="Detail View"
              />
            </div>

            <div className="pro-img-butt d-none d-sm-block">
              <span className="butt-glass" style={{ padding: "0.55rem 1.35rem", fontSize: "0.7rem" }}>
                Quick View <FaArrowRight size={10} />
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="product-card-meta">
        <span className="product-card-category-tag">{category}</span>
        <Link
          to={`/home/${encodeURIComponent(category)}/${child._id}`}
          style={{ textDecoration: "none", color: "inherit", maxWidth: "100%" }}
        >
          <h3 className="product-card-title">{child.name}</h3>
        </Link>

        {/* Color Swatches */}
        <div className="color-options d-flex justify-content-center align-items-center gap-2 mb-2">
          {colorList.map((col, index) => {
            const isSelected = defCol === col;
            return (
              <button
                key={`${col}-${index}`}
                type="button"
                aria-label={`Select color ${col.trim()}`}
                className={`color-box ${isSelected ? "active-swatch" : ""}`}
                style={{
                  backgroundColor: col.trim(),
                  marginRight: index < colorList.length - 1 ? "8px" : "0",
                }}
                onClick={() => setDefCol(col)}
              />
            );
          })}
        </div>

        {/* Price */}
        <div className="d-flex justify-content-center align-items-baseline gap-2 tabular-price">
          {hasDiscount ? (
            <>
              <span
                className="text-muted mr-2"
                style={{ textDecoration: "line-through", fontSize: "0.86rem" }}
              >
                {Number(child.price).toLocaleString()} TK
              </span>
              <span
                style={{
                  color: "var(--accent)",
                  fontWeight: 700,
                  fontSize: "1.02rem",
                }}
              >
                {Number(discountedPrice).toLocaleString()} TK
              </span>
            </>
          ) : (
            <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)" }}>
              {Number(child.price).toLocaleString()} TK
            </span>
          )}
        </div>

        {/* Mobile Quick Link */}
        <Link
          to={`/home/${encodeURIComponent(category)}/${child._id}`}
          className="d-inline-flex d-sm-none align-items-center mt-2"
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            textDecoration: "none",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "2px",
          }}
        >
          View Piece
        </Link>
      </div>
    </article>
  );
});
