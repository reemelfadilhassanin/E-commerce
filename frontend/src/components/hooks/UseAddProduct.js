import { useMutation } from "@tanstack/react-query";
import AddProduct from "../../Api/AddProduct";

export const useAddProduct = ({onSuccess,onError}) => {
    return useMutation ({
        mutationFn:AddProduct,
        onSuccess:(data)=>{
            console.log(data);
            if(onSuccess){
                onSuccess("تم اضافة المنتج",data)
            }
        },
        onError:(error)=>{
            console.log(error);
            if(onError){
                onError("لم يتم اضافة المنتج",error.message)
            }
        }

    })
}