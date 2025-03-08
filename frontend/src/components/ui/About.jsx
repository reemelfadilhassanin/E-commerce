import React from "react";
import {
  about,
  ellipse,
  chevronLeft,
  arrowright,
  rectangle,
  rectangle3,
  rectangle1,

} from "/public/Assets/exporting";

const About = () => {
  return (
    <>
      <div className=" mb-10 min-h-screen pr-20 pl-20 pt-5">
        <nav className="flex items-center space-x-1 text-gray-500 text-sm">
          <a href="/" className="hover:text-black transition">
            الرئيسية
          </a>

          <img className="w-4 h-4" src={chevronLeft} alt="chevronLeft" />

          <span className="text-black font-medium">حول التطبيق</span>
        </nav>
        {/* Header Section */}
        <div className="grid justify-center  p-10">
          <div>
            <img
              src={ellipse}
              alt="ellipse"
              className=" text-[#F3EAF3] absolute  w-12 h-12 "
            />
            <h1 className=" h-10 relative text-4xl mr-5 mb-5">
              تسوق بسهولة واختر بثقة!{" "}
            </h1>
            <h2 className=" text-center  text-gray-700  ">
              نوفر لك خيارات مريحة وتوصيل سريع!
            </h2>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center ">
          <div>
            <div>
              <img
                src={ellipse}
                alt="ellipse"
                className=" text-[#F3EAF3] absolute  w-12 h-12 "
              />
              <h2 className="text-3xl  h-12 content-center font-semibold relative  mr-5  text-gray-800">
                نبذة
              </h2>
            </div>
            <p className="w-130 text-gray-600 mt-4 leading-relaxed">
              سوق بلس وجهتك المثالية للتسوق الإلكتروني، حيث نقدم لك مجموعة
              متنوعة من المنتجات التي تلبي جميع احتياجاتك، من الملابس
              والإلكترونيات إلى الأدوات المنزلية والمزيد.
              <br />
              نوفر لك تجربة تسوق سهلة وآمنة مع خيارات دفع مرنة وتوصيل سريع إلى
              باب منزلك.
              <br />
              استمتع الآن بتجربة تسوق فريدة ومريحة بضغطة زر!
            </p>
            <div>
              <button className=" h-12 w-70 mt-6 px-8 py-3 bg-[#7F2881] text-white  rounded-xl shadow-lg  transition">
                <div className="flex justify-center items-center">
                  <p> ابدأ التسوق </p>
                  <img
                    className="text-white mr-4  w-6 h-5 "
                    src={arrowright}
                    alt="arrowright"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="">
            <img src={about} alt="Shopping Online" className="h-100 w-full" />
          </div>
        </div>
        <div className="border-b-1 border-[#F3EAF3] mt-10"></div>

        {/* Our Mission Section */}
        <div className="grid gap-70 md:grid-cols-2 items-center mt-10">
          <img className="w-120 h-120" src={rectangle} alt="rectangle" />
          <div>
            <div>
              <img
                src={ellipse}
                alt="ellipse"
                className=" text-[#F3EAF3] absolute  w-5 h-12 "
              />
              <h2 className=" text-3xl w-30 font-semibold text-gray-800 relative ">
                مهمتنا
              </h2>
              <ul className="mt-6 space-y-3 text-gray-700 text-lg w-115">
                <div className="flex items-center ">
                  <img
                    className="w-7 h-2 ml-2"
                    src={rectangle3}
                    alt="rectangle3"
                  />
                  <li> توفير منتجات عالية الجودة لتلبية احتياجات عملائنا.</li>
                </div>
                <div className="flex items-center ">
                  <img
                    className="w-7 h-2 ml-2"
                    src={rectangle3}
                    alt="rectangle3"
                  />
                  <li> تقديم تجربة تسوق مريحة وآمنة من أي مكان وفي أي وقت.</li>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-7 h-2 ml-2"
                    src={rectangle3}
                    alt="rectangle3"
                  />
                  <li> دعم العملاء من خلال خدمة استشارية وسريعة.</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid gap-70 md:grid-cols-2 items-center mt-10">
          <div className="w-150">
            <img
              src={ellipse}
              alt="ellipse"
              className=" text-[#F3EAF3] absolute  w-6 h-10 "
            />
            <h2 className=" mr-2 text-3xl relative font-semibold text-gray-800 ">
              لماذا تختارنا؟
            </h2>
            <ul className=" mt-6 space-y-3 text-gray-700 text-lg mb-5 ">
              <div className="flex items-center">
                <img
                  className="w-7 h-2 ml-2"
                  src={rectangle3}
                  alt="rectangle3"
                />
                <li>
                  {" "}
                  منتجات متنوعة تشمل الملابس، الإلكترونيات، الكتب، الإكسسوارات،
                  وغيرها.
                </li>
              </div>
              <div className="flex items-center">
                <img
                  className="w-7 h-2 ml-2"
                  src={rectangle3}
                  alt="rectangle3"
                />
                <li>
                  {" "}
                  تجربة تسوق آمنة تدعم عدة وسائل دفع مثل البطاقات البنكية
                  وPayPal.
                </li>
              </div>
              <div className="flex items-center">
                <img
                  className="w-7 h-2 ml-2"
                  src={rectangle3}
                  alt="rectangle3"
                />
                <li> شحن سريع إلى مختلف المناطق.</li>
              </div>
              <div className="flex items-center">
                <img
                  className="w-7 h-2 ml-2"
                  src={rectangle3}
                  alt="rectangle3"
                />
                <li> دعم فني متاح دائمًا للإجابة على استفساراتكم.</li>
              </div>
            </ul>
          </div>
          <img className="w-120 h-120 " src={rectangle1} alt="rectangle" />
        </div>
      </div>
    </>
  );
};

export default About;
