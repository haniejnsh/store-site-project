import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Thumbs } from 'swiper/modules';

export function ProductPicturesSlider({ pictures }) {
  const thumbsSwiperRef = useRef(null);
  const mainSwiperRef = useRef(null);

  return (
    <div>
      {/* اسلایدر اصلی */}
      <Swiper
        ref={mainSwiperRef}
        style={{ width: '100%', height: '100%', padding: "10px 1px" }}
        modules={[Navigation, Thumbs]}
        spaceBetween={60}
        slidesPerView={1}
        // navigation
        loop={false}
        thumbs={{ swiper: thumbsSwiperRef.current }}
        className="rounded-xs"
      >
        {pictures.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className='flex border border-bl2 rounded-lg px-5 h-[450px] justify-center items-center w-full'>
                <img
              src={`http://${pic}`}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر تصاویر کوچک (thumbnails) */}
      <Swiper
        onInit={(swiper) => {
          thumbsSwiperRef.current = swiper;
        }}
        spaceBetween={10}
        slidesPerView={7}
        freeMode={true}
        watchSlidesProgress={true}
        className="mt-4"
        style={{ height: '80px',display:"flex",justifyContent:"center" }} // تغییر ارتفاع اسلایدر کوچک
      >
        {pictures.map((pic, index) => (
          <SwiperSlide key={index}>
            <div className='flex border w-16 h-16 justify-center items-center rounded-lg border-bl2 hover:border-blue-300 transition'>
                <img
                src={`http://${pic}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-12 cursor-pointer" // می‌توانید اینجا h-20 یا h-16 بگذارید برای کوچکتر کردن
                onClick={() => mainSwiperRef.current.swiper.slideTo(index)} 
                style={{ height: '50px'}} // تنظیم ارتفاع عکس‌های کوچک
                />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


