import React from 'react'
import { Facebook1, FaStore, Instagram, LikedIn, X } from '../../../public/Assets/exporting'

const Footer = () => {
  return (
    <>
     <footer className=" mt-5 bg-purple-100 text-gray-700 p-8 px-20">
      <div className=" md:text-center container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
        {/* معلومات المتجر */}
        <div className=' md:text-right'>
            <img className=' w-7 h-9 m-2' src={FaStore} alt="FaStore"></img>
          <h2 className="font-bold text-lg  ">سوق بلس</h2>
          <p className="w-60 leading-relaxed">
            نوفر لك منتجات عالية الجودة بأسعار تنافسية مع دعم لوجستي سريع لتجربة تسوق سهلة وسريعة!"
          </p>
          <div className=' md:w-1/2:border-t:w-full:pt-4:mx-auto'>
          <div className="flex justify-start space-x-3 mt-4 rtl:space-x-reverse text-2xl">
            <a href="#" className="text-gray-500 hover:scale-120 bg-[#7F288133] rounded-full p-1"><img className=' w-5 h-5 m-2' src={Instagram} alt="FaStore"></img></a>
            <a href="#" className="text-gray-500 hover:scale-120 bg-[#7F288133] rounded-full p-1"><img className=' w-5 h-5 m-2' src={X} alt="FaStore"></img></a>
            <a href="#" className="text-gray-500 hover:scale-120 bg-[#7F288133] rounded-full p-1"><img className=' w-5 h-5 m-2' src={LikedIn} alt="FaStore"></img></a>
            <a href="#" className="text-gray-500 hover:scale-120 bg-[#7F288133] rounded-full p-1"><img className=' w-5 h-5 m-2' src={Facebook1} alt="FaStore"></img></a>
          </div>
          </div> 
        </div>
        
        {/* روابط سريعة */}
        <div className="text-center md:text-right border-t border-[#0000001A] md:border-0 pt-4 md:pt-0">
          <h3 className=" font-semibold text-md mb-4">روابط سريعة</h3>
          <ul className="space-y-7">
            <li><a href="#" className="hover:text-[#7F2881]">الرئيسية</a></li>
            <li><a href="#" className="hover:text-[#7F2881]">الأقسام</a></li>
            <li><a href="#" className="hover:text-[#7F2881]">العروض</a></li>
            <li><a href="#" className="hover:text-[#7F2881]">حول التطبيق</a></li>
          </ul>
        </div>
        
        {/* خدمة العملاء */}
        <div className="text-center md:text-right border-t md:border-0 border-[#0000001A] pt-4 md:pt-0">
          <h3 className=" font-semibold text-md mb-4">خدمة عملاء</h3>
          <ul className="space-y-7">
            <li><a href="#" className="hover:text-[#7F2881]">اتصل بنا</a></li>
            <li><a href="#" className="hover:text-[#7F2881]">الدعم الفني</a></li>
            <li><a href="#" className="hover:text-[#7F2881]">الأسئلة المتكررة</a></li>
          </ul>
        </div>
        
        {/* طرق الدفع */}
        <div className="text-center md:text-right border-t md:border-0 border-[#0000001A] pt-4 md:pt-0" >
          <h3 className=" font-semibold text-md mb-4">طرق الدفع</h3>
          <ul className="space-y-7">
            <li>تحويل بنكي</li>
            <li>Paypal</li>
          </ul>
        </div>
      </div>
      
      <div className=" container  text-center text-gray-500 mt-6 border-t border-[#0000001A] md:w-350 pt-3 ">
        &copy; 2025 جميع الحقوق محفوظة - سوق بلس
      </div>
    </footer>
    </>
  )
}

export default Footer