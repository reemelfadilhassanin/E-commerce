import  {line1,line2} from "../../../public/Assets/exporting"
function BgAuth({Bg}) {
  return (
    <>
    {/* الخطوط */}
    <div className="flex-1 relative h-full overflow-hidden">
      <img
        src={line1}
        alt="Vector 1"
        className="absolute object-cover w-full h-full inset-0 max-w-none -translate-x-10"
      />
      <img
        src={line2}
        alt="Vector 2"
        className="absolute object-cover w-full h-full inset-0 max-w-none"
      />
    </div>
    {/* الصورة */}
    <div className="flex-1 flex items-center justify-center m-4 max-md:hidden">
      <div className="w-full h-[90%] max-w-[600px] rounded-md overflow-hidden">
        <img
          src={Bg}
          alt="img-signin"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </>
  )
}

export default BgAuth