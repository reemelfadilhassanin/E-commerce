import { useState } from 'react';
import { Link } from 'react-router';
import {
  line1,
  line2,
  signin,
  Google,
  facebook,
} from '../../public/Assets/exporting';
import { UseSignIn } from '../components/hooks/UseSignIn';
import {
  ValidateEmail,
  ValidatePassword,
} from '../components/hooks/useValidationEmail';
import UseLoading from '../components/ui/useLoading';
import UseError from '../components/ui/useError';
import UseSuccess from '../components/ui/useSuccess';
import { signIn } from '../store/slices/signin.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [validateEmail, setValidateEmail] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signin.email);
  const role = useSelector((state) => state.signin.role);

  const passWordHandler = () => {
    setShow(!show);
  };

  const { mutate, isLoading, isError, error } = UseSignIn({
    onSuccess: () => setSuccess(true),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

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

    mutate(formData);
    if (success) {
      dispatch(signIn(formData.email));
      console.log(email);
      console.log(role);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row overflow-hidden relative">
      <>
        {isLoading && <UseLoading />}
        {success && <UseSuccess signworld="تسجيل دخولك" />}
        {isError && <UseError error={error} />}
      </>

      {/* Background Images */}
      <div className="flex-1 relative h-full overflow-hidden">
        <img
          src={line1}
          alt="Vector 1"
          className="absolute object-cover w-full h-full inset-0 max-w-none -translate-x-10"
        />
        <img
          src={line2}
          alt="Vector 2"
          className="absolute object-cover w-full h-full inset-0 max-w-none"
        />
      </div>

      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center m-4 max-md:hidden">
        <div className="w-full h-[90%] max-w-[600px] rounded-md overflow-hidden">
          <img
            src={signin}
            alt="img-signin"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* The Form */}
      <div className="absolute z-10 w-[500px] h-fit bg-white top-[50%] translate-[-50%] left-[60%] rounded-md py-8 px-18 max-sm:px-8 max-md:left-[50%] max-md:translate-x-[-50%] max-sm:w-[360px] shadow-xl border-[.1px] border-[#DFDFDF]">
        <div className="flex justify-center items-center gap-4">
          <i className="fa-solid fa-shop text-2xl text-[#7F2881]"></i>
          <p className="font-almarai">سوق-بلس </p>
        </div>

        <form className="flex flex-col gap-4 mt-8" onSubmit={submitHandler}>
          {/* Email Input */}
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

          {/* Password Input */}
          <div>
            <label className="text-sm font-almarai">كلمة المرور</label>
            <div className="relative mt-1">
              <input
                type={show ? 'text' : 'password'}
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
            {validatePassword && (
              <div className="text-red-400 text-[12px] mt-2 text-base/4 font-bold">
                {validatePassword}
              </div>
            )}
            <p className="text-sm mt-1 text-[#7F2881]">نسيت كلمة المرور؟</p>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="font-almarai bg-[#7F2881] p-2 text-white rounded-md mt-10 cursor-pointer"
            value="تسجيل الدخول"
          />
        </form>

        {/* Social Media Login Options */}
        <div className="flex justify-center items-center w-full mt-10">
          <div className="flex-1 bg-[#DFDFDF] h-[1px]"></div>
          <p className="text-[#636B6A] text-sm px-4">أو تسجيل الدخول من خلال</p>
          <div className="flex-1 bg-[#DFDFDF] h-[1px]"></div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="w-full flex justify-center items-center bg-[#F6F9F9] p-2 rounded-md cursor-pointer">
            <img src={Google} alt="signWithGoogle" />
          </div>
          <div className="w-full flex justify-center items-center bg-[#F6F9F9] p-2 rounded-md cursor-pointer">
            <img src={facebook} alt="signWithFacebook" />
          </div>
        </div>

        {/* SignUp Link */}
        <div className="flex justify-center items-center text-sm mt-4">
          <p>ليس لديك حساب؟</p>
          <Link to="/signup" className="text-[#7F2881]">
            {' '}
            أنشئ حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
