import { useNavigate } from "react-router";
import {checked} from "../../../public/Assets/exporting"
const SuccessHandler = ({signworld}) => {
    const navigate = useNavigate()
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
    return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-[#0002] z-[1000000] flex justify-center items-center">
        <div className="w-fit h-fit pb-4 px-10 bg-white rounded-md shadow-2xl">
          <div className="w-full flex justify-center items-center my-4">
            <img src={checked} alt="check" className="w-[5rem] " />
          </div>
          <div className="text-center">
            <h1>تم {signworld} بنجاح</h1>
            <p>يمكنك الان استخدام التطبيق بحرية</p>
          </div>
        </div>
      </div>
    );
  };

  export default SuccessHandler