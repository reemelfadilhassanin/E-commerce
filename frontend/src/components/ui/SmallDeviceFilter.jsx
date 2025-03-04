import { useState } from "react";

function SmallDeviceFilter({ close }) {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleClose = (e) => {
    e.stopPropagation();
    close(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#000000B2] z-50"
        onClick={handleClose}
      />

      {/* زر الإغلاق */}
      <div
        className="absolute top-[-20px] right-[6%] w-[40px] h-[40px] rounded-md z-[100] bg-[#F3EAF3] cursor-pointer flex items-center justify-center text-[#636B6A]"
        onClick={handleClose}
      >
        ✕
      </div>

      {/* محتوى الفلتر */}
      <div className="shadow w-[200px] rounded-md absolute z-[100] bg-white top-[40px] right-[6%] flex justify-center gap-2 flex-col py-4  text-[#636B6A]">
        <div className="px-4 flex justify-center flex-col gap-1">
          {[
            {
              name: "أزياء",
              pro: ["الكل", "رجالي", "نسائي", "حقائب وأحذية", "هدايا وعطورات"],
            },
            {
              name: "الكترونيات",
              pro: ["الكل", "لابتوبات", "جوالات", "ملحقات", "أجهزة منزلية"],
            },
            {
              name: "كتب",
              pro: ["الكل", "روايات", "قصص", "علمية", "تاريخية"],
            },
            {
              name: "مستلزمات منزلية",
              pro: ["الكل", "أثاث", "مطبخ", "حمام", "ديكور"],
            },
          ].map((item, index) => (
            <div
              className="border-b-[1px] border-[#0000001A] pb-2 mb-2 cursor-pointer relative"
              key={index}
            >
              <div
                className="bg-[#F3EAF3] rounded-md p-2"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <p>{item.name}</p>
              </div>

              <div
                className={`mt-2 w-[150px] absolute top-0 left-[-105%] bg-white  rounded-md h-fit ${
                  openIndex === index ? "h-fit" : "hidden"
                } overflow-hidden`}
              >
                {item.pro.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex gap-2 items-center px-4 py-2"
                  >
                    <input
                      type="radio"
                      id={`${item.name}-${subItem}`}
                      name={item.name}
                      className="hidden"
                      defaultChecked={subIndex === 0}
                    />
                    <label
                      htmlFor={`${item.name}-${subItem}`}
                      className={`"text-gray-700 text-sm border-b-[0.5px] border-[#0000001A] w-full p-2 cursor-pointer ${
                        subIndex === 4 ? "border-b-[0px]" : ""
                      }`}
                    >
                      {subItem}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#7B1D81]"></div>
        <div className="bg-[#F3EAF3] rounded-md p-2 mx-4 mt-1">
          <p>السعر</p>
        </div>
        <div>
          {[
            {
              pro: ["الكل", "أقل من 100$", "من 100$ إلى 300$", "أكثر من 300$"],
            },
          ].map((item) =>
            item.pro.map((price, priceIndex) => (
              <div
                key={priceIndex}
                className="min-h-fit flex gap-2 items-center p-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`price-${priceIndex}`}
                  name="price"
                  className="appearance-none w-5 h-5 border-4 border-gray-400 rounded-full checked:border-[#7B1D81]"
                  defaultChecked={priceIndex === 0}
                />
                <label
                  htmlFor={`price-${priceIndex}`}
                  className="text-gray-700 text-sm"
                >
                  {price}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default SmallDeviceFilter;
