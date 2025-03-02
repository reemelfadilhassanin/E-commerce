import { useMutation } from "@tanstack/react-query";
import DeleteItem from "../../Api/DeleteItem";

const UseDeleteItem = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn:DeleteItem,
        onSuccess:(data) => {
            console.log(data);
            if (onSuccess) {
                onSuccess("تم الحذف بنجاح"); 
              }
        },
        onError:(error) => {
            console.log(error)
            if(error){
                onError(`حدث خطأ: ${error.message}`)
            }
        }
    })
}

export default UseDeleteItem