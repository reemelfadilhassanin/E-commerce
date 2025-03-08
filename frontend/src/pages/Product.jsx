// import { useParams } from "react-router";
// import UseGetProduct from "../components/hooks/UseGetProduct";
// import { useEffect, useState } from "react";
// import UseLoading from "../components/ui/useLoading";
// import ErrorHandler from "../components/ui/useError";
// import ProductUI from "../components/ui/Product";
// import UseGetSimilarProducts from "../components/hooks/UseGetSimilarProducts"


// const Product = () => {

//   const { id } = useParams();
//   const { data, isLoading, error } = UseGetProduct(id);
//   const { SimilarProducts, isLoading1, error1 } = UseGetSimilarProducts(data?.type);
//   const [dataAfterFetch, setDataAfterFetch] = useState([]);
//   const [dataAfterFetchSimilarProducts, setDataAfterFetchSimilarProducts] = useState([]);
//   const [counter, setCounter] = useState(1);

//   useEffect(() => {
//     setDataAfterFetch(data);
//     setDataAfterFetchSimilarProducts(SimilarProducts);
//     console.log(data);
//   }, [data,SimilarProducts]);

//   const handleCounter = (num) => {
//     setCounter((prevCounter) => Math.max(1, Math.min(12, prevCounter + num)));
//   };

//   if (isLoading) {
//     return <UseLoading />;
//   }

//   if (error) {
//     return <ErrorHandler error={error} />;
//   }

//   return (
//     <div className="container ">
//       <div className="w-full grid grid-cols-2 gap-4 max-md:grid-cols-1 pb-8 border-b-[1px] border-[#F3EAF3]">
//         <div className="w-full flex flex-col">
//           <img
//             src={dataAfterFetch.img}
//             className="w-full max-h-[500px] object-cover rounded-lg"
//           />
//           <div className="w-full mt-3 grid grid-cols-3 gap-2">
//             <img
//               src={dataAfterFetch.img}
//               className="w-full h-[200px] object-cover rounded-md cursor-pointer"
//             />
//             <img
//               src={dataAfterFetch.img}
//               className="w-full h-[200px] object-cover rounded-md cursor-pointer"
//             />
//             <img
//               src={dataAfterFetch.img}
//               className="w-full h-[200px] object-cover rounded-md cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="w-full h-full border-[.1px] border-gray-50 p-4 rounded-md shadow-2xl">
//           <div className="flex flex-col   gap-4">
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold">{dataAfterFetch.title}</h1>
//               <div className="w-[45px] h-[45px] rounded-full shadow-2xl bg-red-900 cursor-pointer"></div>
//             </div>
//             <h3 className="font-bold text-3xl text-[#7F2881] ">{dataAfterFetch.price}</h3>
//             <h4 className="text-[#636B6A] line-clamp-4 text-[16px] leading-8 w-[70%]">
//              {dataAfterFetch.description}
//             </h4>

//             <div>
//               <p className="font-bold text-xl mb-4">اللون</p>
//               <div className="flex font-bold justify-start items-center h-fit gap-4">
//                 {["red", "cyan", "amber", "pink"].map((item, index) => (
//                   <div
//                     key={index}
//                     className={`w-[50px] h-[50px] rounded-full bg-${item}-500  border-[.5px] border-gray-300 cursor-pointer`}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <p className="font-bold text-xl mb-4">القياس</p>
//               <div className="flex font-bold justify-start gap-4  items-center h-fit">
//                 {["sm", "md", "lg", "xl"].map((item, index) => (
//                   <div
//                     key={index}
//                     className="px-8 py-2 rounded-full bg-[#F3EAF3] cursor-pointer active:shadow-2xl uppercase max-lg:px-4"
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4 h-full lg:mt-[100px]">
//               <div className="flex justify-center items-center text-xl text-white col-span-2 bg-[#7F2881] rounded-md cursor-pointer">
//                 <p>الأضافة للسلة</p>
//               </div>
//               <div className="flex justify-center items-center">
//                 <div
//                   onClick={() => handleCounter(1)}
//                   className={`w-[50px] h-[50px] bg-[#F3EAF3] flex justify-center items-center rounded-r-md text-3xl cursor-pointer ${
//                     counter === 12 ? "opacity-50" : ""
//                   }`}
//                 >
//                   <button>+</button>
//                 </div>
//                 <div className="w-[50px] h-[50px] bg-[#F3EAF3] flex justify-center items-center text-2xl">
//                   <p>{counter}</p>
//                 </div>
//                 <div
//                   onClick={() => handleCounter(-1)}
//                   className={`w-[50px] h-[50px] bg-[#F3EAF3] flex justify-center items-center rounded-l-md text-3xl cursor-pointer ${
//                     counter === 1 ? "opacity-50" : ""
//                   }`}
//                 >
//                   <button>-</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//           <div className="">
//             <p className="mt-8 mb-2 text-2xl font-bold">منتجات مشابهة</p>
//             <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
//             {/* {dataAfterFetchSimilarProducts.map((item,index)=>(
//               // <ProductUI img={item.img} id={item.id} title={item.title} price={item.price} description={item.description} key={index}/>
//             ))} */}
              
//             </div>
//           </div>
//     </div>
//   );
// };

// export default Product;
