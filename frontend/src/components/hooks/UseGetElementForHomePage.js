import { useMutation } from "@tanstack/react-query";
import GetElementForHomePage from "../../Api/GetElementForHomePage";

function UseGetElementForHomePage({ onError = () => {} }) { // Default empty function
  return useMutation({
    mutationFn: GetElementForHomePage,
    onError: (error) => {
      onError(error); // Call the default or provided onError function
      console.log(error);
    },
  });
}

export default UseGetElementForHomePage;

