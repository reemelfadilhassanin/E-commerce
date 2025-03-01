import { useNavigate } from "react-router";
import { errorimg } from "../../../public/Assets/exporting";

const ErrorHandler = ({ error, x}) => {
const navigate = useNavigate()
  if(x){
  setTimeout(() => {
    window.location.reload();
  }, 3000);
  }else{
    setTimeout(() => {
      navigate("/admin")
    }, 1500);
  }
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0002] z-[1000000] flex justify-center items-center">
      <div className="w-fit h-fit pb-4 px-10 bg-white rounded-md shadow-2xl">
        <div className="w-full flex justify-center items-center my-4">
          <img src={errorimg} alt="check" className="w-[5rem]" />
        </div>
        <div className="text-center">
          <h1>خطأ</h1>
          <p>{JSON.stringify(error)}</p> 
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
