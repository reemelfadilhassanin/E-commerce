import { Link } from "react-router"

function GoBack() {
  return (
    <Link to="/" className="flex justify-center items-center flex-row bg-[#7F2881] text-white w-[200px] mt-10 py-3 rounded-md gap-2 cursor-pointer">
            <i className="fa-solid fa-arrow-right block"></i>
            <p className="block">الرجوع</p>
        </Link>
  )
}

export default GoBack