import React, { useMemo, useState } from "react";
import { Container } from "reactstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { StaggeredText } from "./Animations";
import { Product } from "./Card";
import { ProductGridSkeleton } from "./LoadingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./card.css";

function BestD({ clothes }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const bestItems = useMemo(() => {
    if (!Array.isArray(clothes?.clothes)) return [];
    return clothes.clothes.flatMap((cat) =>
      (cat.items || [])
        .filter((item) => item.best)
        .map((cloth) => ({
          category: cat.category,
          cloth,
        }))
    );
  }, [clothes]);

  const totalSlides = bestItems.length;

  return (
    <section
      id="deal"
      style={{
        padding: "clamp(3.2rem, 6vw, 5.5rem) 0",
        overflow: "hidden",
      }}
    >
      <Container style={{ maxWidth: "1360px" }}>
        {/* Editorial Section Header with Liquid-Glass Carousel Controls */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 pb-2">
          <div>
            <span className="eyebrow-label mb-2">Curated Offers</span>
            <h2 className="section-heading">
              <StaggeredText text="Best Deals" />
            </h2>
            <p className="section-subcopy mt-2 mb-0">
              Handpicked signature pieces with limited seasonal pricing.
            </p>
          </div>

          {!clothes.isLoading && totalSlides > 0 && (
            <div className="d-flex align-items-center mt-3 mt-md-0" style={{ gap: "0.75rem" }}>
              <span
                className="liquid-glass-pill px-3 py-2 tabular-price"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "var(--text-primary)",
                }}
              >
                {String(activeSlide).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>

              <button
                ref={setPrevEl}
                type="button"
                aria-label="Previous deal"
                className="veloura-swiper-nav liquid-glass"
              >
                <FaArrowLeft size={14} />
              </button>
              <button
                ref={setNextEl}
                type="button"
                aria-label="Next deal"
                className="veloura-swiper-nav liquid-glass"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Loading Skeleton vs Active Animated Swiper */}
        {clothes.isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : totalSlides > 0 ? (
          <Swiper
            className="best-deals-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ prevEl, nextEl }}
            pagination={{ type: "progressbar" }}
            autoplay={{
              delay: 3600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={750}
            grabCursor={true}
            loop={totalSlides > 4}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex + 1)}
            slidesPerView={1.22}
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 1.65, spaceBetween: 18 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 26 },
            }}
          >
            {bestItems.map(({ category, cloth }) => (
              <SwiperSlide key={cloth._id || `${category}-${cloth.name}`}>
                <Product category={category} child={cloth} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-5 text-muted">
            {clothes.errMess
              ? "Unable to load featured offers right now. Please refresh shortly."
              : "Seasonal offers are being curated."}
          </div>
        )}
      </Container>
    </section>
  );
}

export default BestD;
