import { FaStore } from '/public/Assets/exporting';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";




const navItems = ['الرئيسية', 'العروض', 'الأقسام', 'حول التطبيق', 'تواصل معنا'];
const Header = () => {
  return (
    <>
    <header className=' w-full  m-auto h-20 pt-3 pb-3 pr-20 pl-20 '>
        <div className=' container mx-auto flex justify-between items-center  border-b-1 border-[#F3EAF3]'>
            <div className='flex items-center text-[#7F2881] text-xl font-bold'>
                <img className=' w-7 h-9 m-2' src={FaStore} alt="FaStore"></img> سوق-بلس
            </div>
            <nav className="hidden md:flex space-x-6 ">
            {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="relative group text-[#000C12] focus:text-[#7F2881] py-2 md:py-0"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#7F2881] transition-all duration-300 group-focus:w-full"></span>
            </a>
          ))}
            </nav> 
            <div className="  flex items-center space-x-6">
                <div className=' relative'>
                   <FontAwesomeIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#636B6A] text-lg' icon={faMagnifyingGlass} />
                    <input
                    type="text"
                    placeholder="ابحث عن منتج"
                    className="bg-[#F3EAF3]  p-2 pr-10 rounded-lg focus:outline-none focus:ring-1 "
                    />
                </div>
                <div className=" flex space-x-3  text-xl cursor-pointer ">
                   <FontAwesomeIcon icon={faHeart} />
                   <FontAwesomeIcon icon={faCartShopping} />
                   <FontAwesomeIcon icon={faUser} />
                </div>
            </div> 
        </div>
    </header>
    </>
  )
}

export default Header