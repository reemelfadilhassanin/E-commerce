<<<<<<< HEAD
import { Link } from "react-router"
// import { Header } from "./exporting"
// import Footer from "../components/ui/Footer"
function Home() {
  return (
    <div className="flex flex-col">
        <Link to="signin">signIn</Link>
        <Link to="signup">sinUp</Link>
        {/* <Header/> */}
    </div>
=======
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function OriginHome() {
  return (
    <Swiper
    spaceBetween={50}
    slidesPerView={1.5}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
    
  </Swiper>
>>>>>>> FRontEnd-Mustafa
  )
}

export default OriginHome