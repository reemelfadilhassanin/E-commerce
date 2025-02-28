

function AddProduct() {
  return (
    <div className=" w-full h-full grid grid-cols-5 max-sm:grid-cols-1 gap-4 ">
      <div className="p-4 w-full h-full rounded-xl  sm:col-span-2 bg-blue-900 "></div>
      <div className="p-4 w-full h-full  rounded-xl sm:col-span-3  bg-red-900"></div>
    </div>
  )
}

export default AddProduct