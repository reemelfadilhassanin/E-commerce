import Slider from "../components/ui/Slider";
import {
  ploza,
  homing1,
  homing2,
  homing3,
  homing4,
  homing5,
<<<<<<< HEAD
=======
  home,
  home1,
  home2,
>>>>>>> b05a7d8ed3b3f6515ab40119e9f97b9f71a2a385
} from "../../public/Assets/exporting";
import Product from "../components/ui/Product";
import Filter from "../components/ui/Filter";
import SectionTitle from "../components/ui/SectionTitle";
import { useState } from "react";
import SmallDeviceFilter from "../components/ui/SmallDeviceFilter";
function OriginHome() {
  const data = [
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
    ploza,
  ];
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="relative">
<<<<<<< HEAD
      <Slider />
      <div className="container border-t-[1px] border-[#F3EAF3]">
        <div
       
          className="z-[100] bg-white p-2 flex max-sm:justify-between justify-center items-center "
        >
          <p
             onClick={() => setOpenFilter(true)} className="w-[30px] hidden max-sm:block cursor-pointer bg-red-900">filter</p>
          <div className={`${openFilter ? "" : "hidden"} min-sm:hidden max-sm:absolute`}> 
=======
      <Slider img1={home1} img2={home} img3={home2} />
      <div className="container border-t-[1px] border-[#F3EAF3]">
        <div className="z-[100] bg-white p-2 flex max-sm:justify-between justify-center items-center ">
          <p
            onClick={() => setOpenFilter(true)}
            className="w-[30px] hidden max-sm:block cursor-pointer bg-red-900"
          >
            filter
          </p>
          <div
            className={`${
              openFilter ? "" : "hidden"
            } min-sm:hidden max-sm:absolute`}
          >
>>>>>>> b05a7d8ed3b3f6515ab40119e9f97b9f71a2a385
            <SmallDeviceFilter close={setOpenFilter} />
          </div>
          <SectionTitle title="الأكثر مبيعاً" />
          <div className="w-[30px] h-full"></div>
        </div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3">
          <div className="relative max-sm:hidden">
            <Filter />
          </div>
          <div className="grid col-span-3 grid-cols-3 max-lg:grid-cols-2 gap-4 max-lg:col-span-2 max-md:grid-cols-1 max-sm:col-span-3 max-sm:grid-cols-2">
            {data.map((item, index) => (
              <Product img={item} key={index} />
            ))}
          </div>
        </div>
        <SectionTitle title={"منتجات مميزة"} />
        <div className="flex h-auto gap-2 max-sm:flex-col max-sm:h-auto">
          {/* العمود الأول */}
          <div className="flex flex-col gap-2 w-1/5 max-sm:w-full max-sm:flex-row">
            <div className="relative flex-1">
              <img
                src={homing2}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="relative flex-1">
              <img
                src={homing3}
                className="w-full min-h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* الصورة المركزية */}
          <div className="flex-1 relative">
            <img
              src={homing1}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* العمود الأخير */}
          <div className="flex flex-col gap-2 w-1/5 max-sm:w-full max-sm:flex-row">
            <div className="relative flex-1">
              <img
                src={homing4}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="relative flex-1">
              <img
                src={homing5}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OriginHome;
