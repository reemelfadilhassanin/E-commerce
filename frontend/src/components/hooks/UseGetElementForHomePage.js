import { useMutation } from "@tanstack/react-query";
import GetElementForHomePage from "../../Api/GetElementForHomePage";
function UseGetElementForHomePage({ onError }) {
  return useMutation({
    mutationFn: GetElementForHomePage,

    onError: onError((error) => {
      console.log(error);
      if (error) {
        onError(error);
      }
    }),
  });
}

export default UseGetElementForHomePage;
