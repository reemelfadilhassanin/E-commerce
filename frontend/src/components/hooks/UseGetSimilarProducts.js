import {useQuery} from "@tanstack/react-query"
import GetSimilarProducts from "../../Api/GetSimilarProducts"
const UseGetSimilarProducts = (type) => {
  return useQuery({
    queryKey:["get similar products",type],
    queryFn:()=>GetSimilarProducts(type),
  })
}

export default UseGetSimilarProducts