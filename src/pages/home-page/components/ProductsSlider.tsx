import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import ProductCard from '@/components/common/ProductCard';
import { ImSad2 } from 'react-icons/im';

export function ProductsSlider({ category }) {
  const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(`${PRODUCT_URL}?category=${category._id}&page=1&limit=50`, category._id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-blue-400 text-xl font-bold">
        در حال بارگزاری . . .
      </div>
    );
  }
  if (isError) {  
    return (
      <div className="flex justify-center my-20 text-red-500 items-center gap-1">
        {/* <ImSad2 /> */}
        <ImSad2/>
        <span>"متاسفانه با خطلا رو به رو شدید"</span>
      </div>
    );
  }

  return (
    <Swiper
      style={{ width: '100%', height: '315px', padding: "12px 50px" }}
      modules={[Navigation]}
      spaceBetween={0} // فاصله بین اسلایدها
      navigation
      loop={false}  // غیرفعال کردن لوپ
      breakpoints={{
        1430: {
          slidesPerView: 5, // برای دسکتاپ بزرگ
        },
        1200: {
          slidesPerView: 4, // برای دسکتاپ بزرگ
        },
        940: {
          slidesPerView: 3, // برای دسکتاپ متوسط
        },
        650: {
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


