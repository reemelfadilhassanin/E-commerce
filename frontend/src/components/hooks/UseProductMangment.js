import {useMutation} from "@tanstack/react-query"
import ProductMangment from "../../Api/ProductMangment"
 const UseProductMangment = ({onError,onSuccess}) => {
    const message = "تم جلب البيانات بنجاح";
    return useMutation({
        mutationFn:ProductMangment,
        onSuccess:(data) => {
            console.log(data);
            onSuccess(data,message)
        },
        onError:(error)=>{
            console.log(error)
            onError(error)
        }
    })
}

export default UseProductMangment