import { accessDenied } from "../../public/Assets/exporting"
import GoBack from "../components/ui/GoBack"
function AccessDenied() {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden flex-col">
    <img src={accessDenied} alt="Error" className="w-[30rem]"/>
    <div className="text-[#636B6A] flex justify-center items-center flex-col text-center mx-4">
        <p className="text-[#636B6A] mt-10 text-center mx-2">عذرًا، لا يمكنك الوصول إلى هذه الصفحة. يبدو أنك لا تملك الصلاحيات الكافية.</p>
        <GoBack/>
    </div>
    </div>
  )
}

export default AccessDenied