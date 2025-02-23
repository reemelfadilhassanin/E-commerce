import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../Api/auth";

export const UseSignIn = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log("نجح تسجيل الدخول", data);
      if (onSuccess) {
        onSuccess("تم تسجيل الدخول بنجاح"); // استدعاء دالة onSuccess من المكون الأب
      }
    },
    onError: (error) => {
      console.error("حدث خطأ:", error.message);
      if (onError) {
        onError(`حدث خطأ: ${error.message}`); // استدعاء دالة onError من المكون الأب
      }
    },
  });
};
