import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { home, home1, home2 } from "../../../public/Assets/exporting";

function Slider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // تحديد الشريحة النشطة

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();

      swiper.on("slideChange", () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setActiveIndex(swiper.activeIndex);
      });
    }
  }, []);

  return (
    <div className="relative w-full cursor-grab">
      {/* زر السهم الأيسر */}
      <button
        ref={prevRef}
        className={`w-[40px] h-[40px] flex justify-center items-center absolute left-36 max-md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full cursor-pointer shadow-md transition max-lg:w-[30px] max-lg:h-[30px] max-sm:w-[20px] max-sm:h-[20px] ${
          isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isBeginning}
      >
        <i className="fa-solid fa-arrow-left text-[#3F3F3F]  max-lg:text-sm"></i>
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, A11y]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        initialSlide={1}
        className="mt-2 mb-[20px] h-fit max-md:h-[200px]"
      >
        {[
          {
            type: "الملابس الصيفية",
            percint: "20",
            img: home1,
          },
          {
            type: "الملابس الشتوية",
            percint: "50",
            img: home,
          },
          {
            type: "الاكترونيات",
            percint: "30",
            img: home2,
          },
        ].map((item, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-full relative rounded-xl max-md:rounded-md overflow-hidden"
            style={{
              filter: activeIndex === index ? "none" : "grayscale(100%)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#00000050] rounded-md"></div>
            <img
              src={item.img}
              className="w-full h-full rounded-xl object-cover max-md:rounded-md"
            />
            <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-[400px]:w-[80%] flex flex-col gap-4 text-center lg:text-right">
              <p className="text-3xl max-md:text-lg text-white">
                بمناسبة شهر رمضان
              </p>
              <p className="text-6xl max-md:text-xl font-bold text-white">
                تخفيضات {item.percint}%
              </p>
              <p className="text-3xl max-md:text-lg text-white">
                على {item.type}
              </p>
              <div className="flex flex-row gap-4 mt-8 max-md:mt-4 max-lg:justify-center lg:flex-start ">
                <Link
                  to="/"
                  className="px-8 py-2 bg-white rounded-md text-[#7B1D81] max-md:p-2 max-md:text-xs"
                >
                  اطلب الآن
                </Link>
                <Link
                  to="/"
                  className="px-8 py-2 bg-[#636B6A] rounded-md text-white max-md:p-2 max-md:text-xs"
                >
                  كل العروض
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زر السهم الأيمن */}
      <button
        ref={nextRef}
        className={`w-[40px] h-[40px] flex justify-center items-center absolute right-34 max-md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full cursor-pointer shadow-md transition  max-lg:w-[30px] max-lg:h-[30px] max-sm:w-[20px] max-sm:h-[20px] ${
          isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isEnd}
      >
        <i className="fa-solid fa-arrow-right text-[#3F3F3F]  max-lg:text-sm"></i>
      </button>
    </div>
  );
}

export default Slider;
