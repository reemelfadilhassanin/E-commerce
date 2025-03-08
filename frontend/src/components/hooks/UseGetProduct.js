import { useQuery } from "@tanstack/react-query"
import GetProduct from "../../Api/GetProduct"
const UseGetProduct = (id) => {
    return useQuery({
        queryKey:["Get Product for product page",id],
        queryFn:() => GetProduct(id),        
    })
}

export default UseGetProduct