"use client";
import Bike from "./Bike";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const PopularBikeCarousel = ({ bikes }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="popular-bike-slider mb-8"
    >
      {bikes.map((bike) => {
        return (
          <SwiperSlide key={bike._id}>
            <Bike bike={bike} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PopularBikeCarousel;
