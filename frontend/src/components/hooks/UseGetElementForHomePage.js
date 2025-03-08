import { useQuery } from "@tanstack/react-query";
import GetElementForHomePage from "../../Api/GetElementForHomePage";

function UseGetElementForHomePage(filter) {
  return useQuery({
    queryKey: ['Get Filter Data', filter], 
    queryFn: () => GetElementForHomePage(filter),
  });
}


export default UseGetElementForHomePage;

