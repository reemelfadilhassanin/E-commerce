import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { Home, SignIn, SignUp, NotFoundPage, Admin,Notifications,AddProduct } from "./pages/exporting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AccessDenied from "./pages/AccessDenied";
import ProtectAdmin from "./middleware/protectAdmin";
import MainAdmin from "./pages/MainAdmin";
import {ProductManagement,OrderManagement,UserManagement} from "./pages/exporting";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Home />,
    // children:[
    //   {},
    // ]
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/accessDenied",
    element: <AccessDenied />,
  },
  {
    path: "/admin",
    element: <ProtectAdmin />,
    children: [
      {
        path: "",
        element: <Admin />,
        children:[
          {
            path:"",
            element:<MainAdmin/>
          },
          {
            path:'ProductManagement',
            element:<ProductManagement/>
          },
          {
            path:'OrderManagement',
            element:<OrderManagement/>
          },
          {
            path:'UserManagement',
            element:<UserManagement/>
          },{
            path:"addProduct",
            element:<AddProduct/>
          },{
            path:"notifications",
            element:<Notifications/>
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
