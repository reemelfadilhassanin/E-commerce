import { useState } from "react";

const Filter = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  return (
    <div className="shadow rounded-md sticky top-4 flex justify-center gap-2 flex-col pb-3">
      <div className="px-4 flex justify-center flex-col gap-1">
        <div className="flex justify-between items-center border-b-[1px] border-[#0000001A] py-2 mb-2">
          <p>فلترة</p>
          <p>ic</p>
        </div>
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
            className="border-b-[1px] border-[#0000001A] pb-2 mb-2 cursor-pointer"
            key={index}
          >
            {/* العنوان الرئيسي */}
            <div
              className="bg-[#F3EAF3] rounded-md p-2"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p>{item.name}</p>
            </div>

            <div
              className={`mt-2 transition-all duration-500 ease-in-out 
              ${
                openIndex === index ? "max-h-[200px]" : "max-h-0"
              } overflow-hidden`}
            >
              {item.pro.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="min-h-fit flex gap-2 items-center p-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`${item.name}-${subItem}`}
                    name={item.name}
                    className="appearance-none w-5 h-5 border-4 border-gray-400 rounded-full checked:border-[#7B1D81]"
                    defaultChecked={subIndex === 0} 
                  />
                  <label
                    htmlFor={`${item.name}-${subItem}`}
                    className="text-gray-700 text-sm"
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
  );
};

export default Filter;
