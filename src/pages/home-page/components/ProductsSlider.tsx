import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import ProductCard from '@/components/common/ProductCard';



export function ProductsSlider({category}) {
  const {isLoading,data,isError,error, refetch}=useGetReactQueryHelp(`${PRODUCT_URL}?category=${category._id}&page=1&limit=50`,category._id)

  return (
    <Swiper
      style={{ width: '80%', height: '300px',padding:"10px" }}
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={3}
      pagination={{ clickable: true }}
      navigation
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="rounded-3xl" // Adding border-radius to the entire Swiper
    >
      {data.data.products.map((pro, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={pro}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

