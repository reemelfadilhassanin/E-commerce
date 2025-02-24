import { Link } from "react-router"
import {errorNotFound} from "../../public/Assets/exporting.js"
function NotFoundPage() {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
        <img src={errorNotFound} alt="Error" className="w-[30rem]"/>
        <h1 className="text-[#191C1F] text-4xl max-md:text-2xl">404 الصفحة غير متوفرة</h1>
        <p className="text-[#636B6A] mt-10 text-center mx-2">يبدو أننا لم نعثر على الصفحة المطلوبة. ربما تم نقلها أو لم تعد متاحة. يمكنك العودة <br/> إلى الصفحة الرئيسية والمحاولة مرة أخرى.</p>
        <Link to="/" className="flex justify-center items-center flex-row bg-[#7F2881] text-white w-[200px] mt-10 py-3 rounded-md gap-2 cursor-pointer">
            <i className="fa-solid fa-arrow-right block"></i>
            <p className="block">الرجوع</p>
        </Link>
    </div>
  )
}

export default NotFoundPage