import Slider from "../components/ui/Slider";
import { mustsall } from "../../public/Assets/exporting";
import { ploza } from "../../public/Assets/exporting";
import Product from "../components/ui/Product";
import Filter from "../components/ui/Filter"
function OriginHome() {
  const data = [
    ploza, ploza, ploza, ploza,
    ploza, ploza, ploza, ploza,
    ploza, ploza, ploza, ploza,
    ploza, ploza, ploza,

  ];
  return (
    <>
      <Slider />
      <div className="container border-t-[1px] border-[#F3EAF3]">
        <div className="relative flex justify-center">
          <div className=" relative">
          <p className="p-4 text-3xl font-bold text-center my-6 w-fit">
            الأكثر مبيعا
          </p>
          <img
            src={mustsall}
            className=" absolute  top-[50%] -z-1 right-0 translate-y-[-50%] w-[50px] h-[50px]"
          />
          </div>
        </div>  
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3">
        <div className="relative max-sm:hidden">
        <Filter/>
        </div>
        <div className="grid col-span-3 grid-cols-3 max-lg:grid-cols-2 gap-4 max-lg:col-span-2 max-md:grid-cols-1 max-sm:col-span-3 max-sm:grid-cols-2" >
        {data.map((item, index) => (
            <Product img={item} key={index} />
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default OriginHome;
