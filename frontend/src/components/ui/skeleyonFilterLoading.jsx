function SkeleyonFilterLoading() {
  return (
    <div className="relative max-sm:hidden">
      <div className="shadow rounded-md sticky top-4 flex justify-center gap-2 flex-col pb-3">
        <div className="px-4 flex justify-center flex-col gap-1">
          <div className="border-[#0000001A] py-2 mb-2 h-[35px] bg-gray-200 rounded-md mt-3"></div>

          {[
            {
              name: 1,
              pro: [1, 2, 3, 4, 5],
            },
            {
              name: 1,
            },
            {
              name: 1,
            },
            {
              name: 1,
            },
          ].map((item, index) => (
            <div
              className="border-b-[1px] border-[#0000001A] pb-2 mb-2 cursor-pointer"
              key={index}
            >
              {/* العنوان الرئيسي */}
              <div className="bg-[#F3EAF3] rounded-md p-2 h-[35px]"></div>

              <div
                className={`mt-2 transition-all duration-500 ease-in-out  overflow-hidden`}
              >
                {item.pro?.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="min-h-fit flex bg-gray-200 mb-[4px] rounded-md gap-2 items-center p-2 cursor-pointer"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#7B1D81]"></div>
        <div className="bg-[#F3EAF3] h-[35px] rounded-md p-2 mx-4 mt-1"></div>
        <div className="px-4">
          {[
            {
              pro: [1, 2, 3, 4, 5],
            },
          ].map((item) =>
            item.pro.map((price, priceIndex) => (
              <div
                key={priceIndex}
                className="min-h-fit flex gap-2 items-center p-2 cursor-pointer bg-gray-200 mb-[4px] rounded-md"
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SkeleyonFilterLoading;
