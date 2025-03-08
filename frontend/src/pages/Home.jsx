import { Link } from 'react-router';
import Slider from '../components/ui/Slider';
import {
  homing1,
  homing2,
  homing3,
  homing4,
  homing5,
} from "../../public/Assets/exporting";
import Product from "../components/ui/Product";
import Filter from "../components/ui/Filter";
import SectionTitle from "../components/ui/SectionTitle";
import { useEffect, useState } from "react";
import SmallDeviceFilter from "../components/ui/SmallDeviceFilter";
import UseGetElementForHomePage from "../components/hooks/UseGetElementForHomePage";
import ErrorHandler from "../components/ui/useError";
import SkeletonLoadnig from "../components/ui/SkeletonLoadnig";
import SkeleyonFilterLoading from "../components/ui/skeleyonFilterLoading";
function OriginHome() {
  const [filtaringData,setFiltaringData] = useState({type:"any",price:"any"});

  console.log(filtaringData)
  const { data, isLoading, error, onError } = UseGetElementForHomePage(filtaringData);
    const [dataAfterFetch, setDataAfterFetch] = useState([]);

    useEffect(() => {
      if (data) {
        setDataAfterFetch(data); 
      }
    }, [data]); 
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="relative">
      {/* {error && <ErrorHandler error={error} />}  */}
      <Slider />
      <div className="container border-t-[1px] border-[#F3EAF3]">
        <div className="z-[100] bg-white p-2 flex max-sm:justify-between justify-center items-center ">
          <p
            onClick={() => {
              if (isLoading) {
                setOpenFilter(true);
              }
            }}
            className="w-[30px] hidden max-sm:block cursor-pointer bg-red-900"
          >
            filter
          </p>
          <div
            className={`${
              openFilter ? '' : 'hidden'
            } min-sm:hidden max-sm:absolute`}
          >
            <SmallDeviceFilter close={setOpenFilter} GetDataFromFilter = {setFiltaringData} />
          </div>
          <SectionTitle title="الأكثر مبيعاً" />
          <div className="w-[30px] h-full"></div>
        </div>

        {/* Show skeleton loading when isLoading is true */}
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 animate-pulse">
            <SkeleyonFilterLoading />
            <div className="grid col-span-3 grid-cols-3 max-lg:grid-cols-2 gap-4 max-lg:col-span-2 max-md:grid-cols-1 max-sm:col-span-3 max-sm:grid-cols-2">
              {Array(6)
                .fill(1)
                .map((_, index) => (
                  <SkeletonLoadnig key={index} />
                ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3">
            <div className="relative max-sm:hidden">
              <Filter GetDataFromFilter={setFiltaringData} />
            </div>
            <div className="grid col-span-3 grid-cols-3 max-lg:grid-cols-2 gap-4 max-lg:col-span-2 max-md:grid-cols-1 max-sm:col-span-3 max-sm:grid-cols-2">
              {/* {dataAfterFetch.map((item, index) => (
                <Product id={item.id} img={item} key={index} />
              ))} */}
            </div>
          </div>
        )}
        <SectionTitle title={'منتجات مميزة'} />
        <div className="flex h-auto gap-2 max-sm:flex-col max-sm:h-auto">
          {/* Column 1 */}
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

          {/* Central image */}
          <div className="flex-1 relative">
            <img
              src={homing1}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Column 3 */}
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
