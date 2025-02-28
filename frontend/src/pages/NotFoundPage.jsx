import GoBack from "../components/ui/GoBack.jsx"
import {errorNotFound} from "../../public/Assets/exporting.js"
function NotFoundPage() {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
        <img src={errorNotFound} alt="Error" className="w-[30rem]"/>
        <h1 className="text-[#191C1F] text-4xl max-md:text-2xl">404 الصفحة غير متوفرة</h1>
        <p className="text-[#636B6A] mt-10 text-center mx-2">يبدو أننا لم نعثر على الصفحة المطلوبة. ربما تم نقلها أو لم تعد متاحة. يمكنك العودة <br/> إلى الصفحة الرئيسية والمحاولة مرة أخرى.</p>
        <GoBack/>
    </div>
  )
}

export default NotFoundPage