import { useState, useEffect } from "react";
import UseProductManagement from "../components/hooks/UseProductMangment.js";
import ErrorHandler from "../components/ui/useError";
import UseDeleteItem from "../components/hooks/UseDeleteItem.js";
import UseLoading from "../components/ui/useLoading.jsx";
import SkeletonLoadnig from "../components/ui/skeletonLoadnig.jsx";

function ProductManagement() {
  const [erroring, setErroring] = useState(null);
  const [erroring1, setErroring1] = useState(null);
  const [data, setData] = useState([]);

  const { mutate, isLoading, isError } = UseProductManagement({
    onSuccess: (data) => {
      setData(data);
    },
    onError: (error) => {
      setErroring(error.message);
    },
  });
  const { mutate1, isLoading1, isError1 } = UseDeleteItem({
    onSuccess: () => {
    },
    onError: (error) => {
      setErroring1(error.message);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);


  return (
    <>
      {isError && <ErrorHandler error={erroring} x={false} />}
      {isLoading1 && <UseLoading/>}
      {isError1 && <ErrorHandler error={erroring1} x={false} /> }
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-6">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, index) => (
                <SkeletonLoadnig key={index}/>
              ))
          : data.map((item, index) => (
              <div
                className="w-full h-[260px] rounded-md bg-[#FAF6FA] flex justify-center items-center flex-col gap-2 p-2"
                key={index}
              >
                <div className="w-full h-full flex gap-4 text-sm items-center justify-start">
                  <img
                    src={item.img}
                    className="w-[30%] bg-white aspect-square rounded-xl object-cover"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-[#3F3F3F]">اسم المنتج: {item.name}</p>
                    <p className="text-[#64696e]">الصنف: {item.type}</p>
                    <p className="text-[#3F3F3F]">السعر: {item.price}$</p>
                  </div>
                </div>
                <div className="w-full h-full">
                  <h3 className="text-[#3F3F3F]">الوصف:</h3>
                  <p className="break-all text-[#3F3F3F]">{item.discripe}</p>
                </div>
                <div className="w-full h-full">
                  <div className="flex justify-between items-center p-2 h-full">
                    <div className="flex justify-between border-b-[0.5px] gap-2">
                      <p>مباع</p>
                      <p>{item.done}</p>
                      <div>
                        <i className="fa-solid fa-arrow-up text-green-400"></i>
                      </div>
                    </div>
                    <div className="h-full flex justify-between items-center gap-2">
                      <div className="bg-[#dfdfdf] p-2 rounded-full flex justify-center items-center w-[30px] h-[30px] cursor-pointer">
                        <i className="fa-solid fa-pen text-[#3f3f3f]"></i>
                      </div>
                      <div
                        className="bg-[#dfdfdf] p-2 rounded-full flex justify-center items-center w-[30px] h-[30px] cursor-pointer"
                        onClick={()=>{mutate1(item.id)}}
                      >
                        <i className="fa-solid fa-trash-can text-[#FF5646]"></i>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
            ))}
        {isLoading ? "" : <p>10</p>}
      </div>
    </>
  );
}
export default ProductManagement;
