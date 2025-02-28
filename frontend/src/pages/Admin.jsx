import { Outlet } from "react-router-dom"
import SideBarInAdmin from "../components/ui/SideBarInAdmin"
const Admin = () => {
  return (
    <div className="flex items-center gap-4">
      <SideBarInAdmin>
      <Outlet/>
      </SideBarInAdmin>
    </div>
  )
}

export default Admin