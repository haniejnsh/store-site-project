import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import ProductCard from '@/components/common/ProductCard';

export function ProductsSlider({ category }) {
  const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(`${PRODUCT_URL}?category=${category._id}&page=1&limit=50`, category._id);

  return (
    <Swiper
      style={{ width: '100%', height: '300px', padding: "12px 50px" }}
      modules={[Navigation]}
      spaceBetween={50} // فاصله بین اسلایدها
      navigation
      loop={false}  // غیرفعال کردن لوپ
      breakpoints={{
        1200: {
          slidesPerView: 4, // برای دسکتاپ بزرگ
        },
        992: {
          slidesPerView: 3, // برای دسکتاپ متوسط
        },
        768: {
          slidesPerView: 2, // برای تبلت
        },
        640: {
          slidesPerView: 1, // برای موبایل
        },
        480: {
          slidesPerView: 1, // برای موبایل‌های کوچک
        },
        320: {
          slidesPerView: 1, // برای بسیار کوچک
        },
      }}
      className="rounded-xs "
    >
      {data?.data.products?.map((pro, index) => (
        <SwiperSlide 
          key={index}
           // اضافه کردن پدینگ چپ و راست به اسلایدها
        >
          <ProductCard product={pro} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
