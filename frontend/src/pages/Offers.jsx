import React, { useState } from "react";
import Slider from "../components/ui/Slider";
import SectionTitle from "../components/ui/SectionTitle";
import Filter from "../components/ui/Filter";
import Product from "../components/ui/Product";
import { ploza } from "../../public/Assets/exporting";
import SmallDeviceFilter from "../components/ui/SmallDeviceFilter";
function Offers() {
  const [openFilter, setOpenFilter] = useState(false);
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
  return (
    <div>
      <Slider />

      <div className="container">
        <div className="flex justify-center items-center max-sm:justify-between  ">
          <p
            onClick={() => setOpenFilter(true)}
            className="w-[30px] hidden max-sm:block cursor-pointer pg-red-900"
          >
            filter
          </p>
          <div
            className={`${
              openFilter ? "" : "hidden"
            } min-sm:hidden max-sm:absolute`}
          >
            <SmallDeviceFilter close={setOpenFilter} />
          </div>
          <SectionTitle title="العروض" />
          <div className="w-[30px] h-full"></div>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
          <div className="max-sm:hidden">
            <Filter />
          </div>
          <div className=" grid gap-4 max-lg:col-span-3 max-md:col-span-2 max-lg:grid-cols-3 max-md:grid-cols-2">
            {data.map((item, index) => (
              <Product img={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
