import { useMutation } from "@tanstack/react-query";
import signUp from "../../Api/signup";

export const UseSignUp = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn: signUp,
        onSuccess:()=>{
            if(onSuccess){
                onSuccess('تم تسجيلك بنجاح')
            }
        },
        onError:(error)=>{
            if (onError) {
                onError(`حدث خطأ: ${error.message}`); 
              }
        }

    })
  
}