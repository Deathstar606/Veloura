import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Test from "../images/TestiPic.jpg";

function Testi() {
  const swiperRef = React.useRef(null);

  const Content = () => {
    return (
        <div className="d-flex justify-content-center" style={{paddingTop: "7%", paddingBottom: "7%"}}>
            <h2>Header</h2>
        </div>
    )
  }

  return (
    <div style={{ backgroundImage: `url(${Test})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Swiper className="mySwiper" ref={swiperRef}>
        <SwiperSlide><Content /></SwiperSlide>
        <SwiperSlide><Content /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Testi;
