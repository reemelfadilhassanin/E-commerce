import { useDispatch } from "react-redux";
import { signout } from "../../store/slices/signin.js";
import { useLocation } from "react-router";
import { Link } from "react-router";
function HeaderAdmin() {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  console.log(location);
  return (
    <div className=" sticky top-0 left-0 bg-white  p-2  shadow-md pl-8">
      <div className="flex justify-end items-center text-[#7F2881] gap-4  w-full">
        <Link to="notifications">
          <i className=" text-xl cursor-pointer fa-regular fa-bell"></i>
        </Link>
        <i className=" text-xl cursor-pointer fa-solid fa-magnifying-glass"></i>
        <button
          className="border-[.5px] border-[#7F2881] p-2 rounded-md cursor-pointer"
          onClick={() => {
            dispatch(signout());
          }}
        >
          مستخدم
        </button>
      </div>
      <div className="w-full flex mt-4 justify-between items-center">
        <p>
          {location === "/admin"
            ? "لوحة التحكم"
            : location === "/admin/ProductManagement"
            ? "إدارة المنتجات _ كل المنتجات"
            : location === "/admin/OrderManagement"
            ? "إدارة الطلبات"
            : ""}
        </p>
        <Link
          to="addProduct"
          className="bg-[#7F2881] flex justify-center gap-2 items-center p-2 rounded-xl text-white w-[180px]"
        >
          <p>إضافة منتج</p>
          <span className="flex justify-center items-center w-[25px] h-[25px] border-[2px] border-white rounded-full">
            <i className="fa-solid fa-plus"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default HeaderAdmin;
