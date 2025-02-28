import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import HeaderAdmin from "./HeaderAdmin";
function SideBarInAdmin({ children }) {
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = useState(window.innerWidth > 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 1024;
      setIsSmallScreen(smallScreen);
      setOpenSideBar(!smallScreen);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isSmallScreen) return;

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSmallScreen]);

  const handleLinkClick = () => {
    if (isSmallScreen) setOpenSideBar(false);
  };

  return (
    <div className="flex w-screen h-screen">
      {/* زر فتح السايدبار في الشاشات الصغيرة */}
      {isSmallScreen && !openSideBar && (
        <button
          className="fixed top-[12px]  right-4 flex justify-center items-center text-[#7F2881] text-3xl z-[100] cursor-pointer"
          onClick={() => setOpenSideBar(true)}
        >
          <p>☰</p>
        </button>
      )}

      {/* السايدبار */}
      <div
        ref={sidebarRef}
        className={`bg-[#FAF6FA] rounded-tl-2xl shadow-lg transition-transform duration-500 ease-in-out z-50 h-full
  ${
    isSmallScreen
      ? "fixed top-0 right-0 w-[80%] sm:w-[60%] md:w-[50%] h-screen"
      : "relative w-[22%] max-lg:w-[26%]"
  }
  ${openSideBar ? "opacity-100 translate-x-0" : "translate-x-full"}
  `}
      >
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex gap-4 text-[#7F2881]">
            <i className="fa-solid fa-store text-3xl"></i>
            <p className="font-almarai font-bold text-lg">سوق-بلس</p>
          </div>
          {isSmallScreen && (
            <button
              className="text-3xl text-[#7F2881] cursor-pointer"
              onClick={() => setOpenSideBar(false)}
            >
              ✖
            </button>
          )}
        </div>

        {/* الروابط */}
        <div className="mt-6 flex flex-col gap-3 px-5">
          {[
            { to: "/admin", icon: "fa-bars-progress", label: "لوحة التحكم" },
            {
              to: "/admin/ProductManagement",
              icon: "fa-basket-shopping",
              label: "إدارة المنتجات",
            },
            {
              to: "/admin/OrderManagement",
              icon: "fa-truck-ramp-box",
              label: "إدارة الطلبات",
            },
            {
              to: "/admin/UserManagement",
              icon: "fa-user",
              label: "إدارة المستخدمين",
            },
          ].map((item) => (
            <React.Fragment key={item.to}>
              <Link
                to={item.to}
                onClick={handleLinkClick}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap
                  ${
                    location.pathname === item.to
                      ? "bg-[#7F2881] text-white"
                      : "text-[#636B6A] hover:bg-[#EAE6EA]"
                  }
                  `}
              >
                <i className={`fa-solid ${item.icon} text-2xl`}></i>
                <p className="text-lg">{item.label}</p>
              </Link>
              <div className="w-full h-[1px] bg-[#DFDFDF]"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex-1 w-full h-[85vh]">
        
          <HeaderAdmin />
          <div className="pl-30 max-md:pl-16 p-4 max-sm:pl-4 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SideBarInAdmin;
