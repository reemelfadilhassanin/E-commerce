import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router"
import './index.css'
import {Home,SignIn,SignUp,NotFoundPage,Header} from './pages/exporting'
// import Outleting from './routers/Outleting'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from './store/store'
import { Provider } from 'react-redux'
import Footer from './components/ui/Footer'


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
path:'*',
element:<NotFoundPage/>
  },
  {
    path:'/',
    element:<Home/>,
    // children:[
    //   {},
    //   {}
    // ]
  },
  {
   path:'/signIn',
    element:<SignIn/>,
  },
  {
   path:'/signup',
    element: <SignUp/>,
  },
  {
    path:'/header',
     element:<Header/>,
   },
   {
    path:'/Footer',
     element:<Footer/>,
   }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
  </Provider>
  </StrictMode>,
)
