import { Link } from "react-router";
function Product({img, key, id,title,price,description}) {
  return (
    <div className='p-2 shadow rounded-lg flex flex-col gap-2 pb-4' key={key}>
        <Link to={`/${id}`} className="relative">
        <img src={img} className='rounded-md  h-[298px] w-full max-sm:h-[174px] max-lg:h-[220px] max-md:h-[200px]'/>
        <div className=" absolute z-20 max-sm:w-[25px]  max-sm:h-[25px] bg-white flex justify-center items-center hover:bg-[#FF5A5D] duration-200 ease-in-out cursor-pointer top-2 left-2 w-[40px] h-[40px] rounded-full"></div>
        </Link>
        <div className="flex flex-col gap-2 px-2">
            <div className='flex justify-between items-center text-md font-bold'>
                <p>{title || "مشكلة"}</p>
                <p>{price || "لايوجد"}</p> 
            </div>
            <p className='text-[#3F3F3F] text-sm'>{description || "لم يتم جلب البيانات تحن اسفون حاول مرة اخرى"}</p>
            <button className='w-full text-[#000C12] bg-[#F3EAF3] border-[0.5px] border-[#7F2881] hover:bg-[#7F2881] hover:text-white p-2 rounded-lg cursor-pointer duration-200 ease-in-out'>إضافة للسلة</button>
        </div>
    </div>
  )
}

export default Product