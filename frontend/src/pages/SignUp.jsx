import { useState } from "react";
import BgAuth from "../components/ui/bgAuth";
import { signup, Google, facebook } from "../../public/Assets/exporting";
import { Link } from "react-router";
import { UseSignUp } from "../components/hooks/UseSignUp";
import {
  ValidateEmail,
  ValidatePassword,
  ValidateName,
} from "../components/hooks/useValidationEmail";
import UseLoading from "../components/ui/useLoading";
import UseError from "../components/ui/useError";
import UseSuccess from "../components/ui/useSuccess";

function SignUp() {
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordVerifier: "",
  });
  const [validateEmail, setValidateEmail] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [validateName, setValidateName] = useState("");
  const [success, setSuccess] = useState(false);

  const passWordHandler = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isLoading, isError, error } = UseSignUp({
    onSuccess: () => setSuccess(true),
  });

  const resetInputs = () => {
    setValidateEmail("");
    setValidatePassword("");
    setValidateName("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDisable(!disable);

    const validateName = ValidateName(formData.name);
    if (!validateName.isValid) {
      setValidateName(validateName.error);
      return;
    }

    const emailValidation = ValidateEmail(formData.email);
    if (!emailValidation.isValid) {
      setValidateEmail(emailValidation.error);
      return;
    }

    const passwordValidation = ValidatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setValidatePassword(passwordValidation.error);
      return;
    }

    if (formData.password != formData.passwordVerifier) {
      setValidatePassword(
        "يبدو أن كلمة المرور وتأكيدها غير متطابقين، يرجى المحاولة مرة أخرى."
      );
      return;
    }
    resetInputs();
    mutate(formData);
    if (success) {
      setDisable(!disable);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {
        <>
          {isLoading && <UseLoading />}
          {success && <UseSuccess signworld="التسجيل" />}
          {isError && <UseError error={error} />}
        </>
      }
      <BgAuth Bg={signup} />
      <div className=" absolute z-10 w-[500px] h-fit bg-white top-[50%] translate-[-50%] left-[60%] rounded-md py-8 px-18 max-sm:px-8 max-md:left-[50%] max-md:translate-x-[-50%] max-sm:w-[360px] shadow-xl   border-[.1px] border-[#DFDFDF]">
        <div className=" relative flex justify-center items-center gap-4">
          <div className="w-[50px] h-[50px] rotate-45 left-[56%] max-sm:left-[57%] bg-[#7F28811A] rounded-xl absolute"></div>
          <i className="fa-solid fa-shop text-2xl  text-[#7F2881]"></i>
          <p className="font-almarai">سوق-بلس </p>
        </div>
        <form
          className="flex flex-col  gap-4 mt-8"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <label className="text-sm font-almarai">الاسم</label>
            <input
              type="text"
              className="bg-[#F8F8F8] border-[0.5px] rounded-md border-[#DFDFDF] p-2 w-full focus:outline-[#7F2881] mt-1"
              placeholder="أدخل الاسم الكامل"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {validateName && (
              <div className="text-red-400 text-sm mt-1">{validateName}</div>
            )}
          </div>
          <div>
            <div>
              <label className="text-sm font-almarai">البريد الألكتروني</label>
              <input
                type="text"
                className="bg-[#F8F8F8] border-[0.5px] rounded-md border-[#DFDFDF] p-2 w-full focus:outline-[#7F2881] mt-1"
                placeholder="أدخل البريد الالكتروني"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {validateEmail && (
                <div className="text-red-400 text-sm mt-1">{validateEmail}</div>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-almarai">كلمة المرور</label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                placeholder="ادخل كلمة السر"
                className="bg-[#F8F8F8] border-[0.5px] rounded-md border-[#DFDFDF] p-2 w-full focus:outline-[#7F2881]"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {show ? (
                <i
                  className="fa-solid fa-eye-slash absolute top-[50%] translate-y-[-50%] left-4 text-[#636B6A] cursor-pointer"
                  onClick={passWordHandler}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye absolute top-[50%] translate-y-[-50%] left-4 text-[#636B6A] cursor-pointer"
                  onClick={passWordHandler}
                ></i>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-almarai">تأكيد كلمة المرور</label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                placeholder="ادخل كلمة السر"
                className="bg-[#F8F8F8] border-[0.5px] rounded-md border-[#DFDFDF] p-2 w-full focus:outline-[#7F2881]"
                name="passwordVerifier"
                value={formData.passwordVerifier}
                onChange={handleInputChange}
              />
              {show ? (
                <i
                  className="fa-solid fa-eye-slash absolute top-[50%] translate-y-[-50%] left-4 text-[#636B6A] cursor-pointer"
                  onClick={passWordHandler}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye absolute top-[50%] translate-y-[-50%] left-4 text-[#636B6A] cursor-pointer"
                  onClick={passWordHandler}
                ></i>
              )}
            </div>
            {validatePassword && (
              <div className="text-red-400 text-[12px] mt-2 text-base/4 font-bold">
                {validatePassword}
              </div>
            )}
            <p className="text-sm mt-1 text-[#7F2881]">نسيت كلمة المرور؟</p>
          </div>

          <input
            type="submit"
            className="font-almarai bg-[#7F2881] p-2 text-white rounded-md mt-10 cursor-pointer"
            value="التسجيل"
            disabled={disable}
          />
        </form>
        <div className="flex justify-center items-center w-full mt-10">
          <div className="flex-1 bg-[#DFDFDF] h-[1px]"></div>
          <p className="text-[#636B6A] text-sm px-4">أو التسجيل من خلال</p>
          <div className="flex-1 bg-[#DFDFDF] h-[1px]"></div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <div
            className="w-full flex justify-center items-center bg-[#7F28811A] p-2 rounded-md cursor-pointer"
            disabled={disable}
          >
            <img src={Google} alt="signWithGoogle" />
          </div>
          <div
            className="w-full flex justify-center items-center bg-[#7F28811A] p-2 rounded-md cursor-pointer"
            disabled={disable}
          >
            <img src={facebook} alt="signWithFacebook" />
          </div>
        </div>
        <div className="flex justify-center items-center text-sm mt-4">
          <p> لديك حساب؟</p>
          <Link to="/signin" className="text-[#7F2881]" disabled={disable}>
            {" "}
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
