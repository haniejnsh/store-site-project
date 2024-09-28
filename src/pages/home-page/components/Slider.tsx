import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import slide1 from '../../../assets/images/sliders/s1.jpg';
import slide2 from '../../../assets/images/sliders/s2.jpg';
import slide3 from '../../../assets/images/sliders/s3.jpg';
import slide4 from '../../../assets/images/sliders/s4.jpg';
import slide5 from '../../../assets/images/sliders/s5.jpg';

export function Slider() {
  const slides = [slide1, slide2, slide3, slide4, slide5];

  return (
    <Swiper
      style={{ width: '80%', height: '500px' }}
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="rounded-3xl" // Adding border-radius to the entire Swiper
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-fill rounded-3xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

