import {
    mustsall,
  } from "../../../public/Assets/exporting";

function SectionTitle({title}) {
  return (
    <div className="relative flex justify-center">
          <div className=" relative">
            <p className="p-4 text-3xl font-bold text-center my-6 w-fit">
              {title}
            </p>
            <img
              src={mustsall}
              className=" absolute  top-[50%] -z-1 right-0 translate-y-[-50%] w-[50px] h-[50px]"
            />
          </div>
        </div>
  )
}

export default SectionTitle