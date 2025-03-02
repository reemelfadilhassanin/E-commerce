function SkeletonLoadnig() {
  return (
    <div
    className="w-full h-[260px] rounded-md bg-[#FAF6FA] flex justify-center items-center flex-col gap-2 p-2 animate-pulse"
  >
    <div className="w-full h-full flex gap-4 text-sm items-center justify-start">
      <div className="w-[30%] aspect-square bg-gray-300 rounded-xl"></div>
      <div className="w-full">
        <div className="w-full h-[10px] bg-gray-300 mb-2"></div>
        <div className="w-full h-[10px] bg-gray-300 mb-2"></div>
        <div className="w-full h-[10px] bg-gray-300"></div>
      </div>
    </div>
    <div className="w-full h-full">
      <div className="w-[50%] h-[15px] bg-gray-300 mb-2"></div>
      <div className="w-full h-[50px] bg-gray-300"></div>
    </div>
    <div className="w-full h-full flex justify-between items-center p-2">
      <div className="w-[60px] h-[30px] bg-gray-300"></div>
      <div className="h-full flex justify-between items-center gap-2">
        <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
        <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
  )
}

export default SkeletonLoadnig