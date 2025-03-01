import { Link } from "react-router"
// import { Header } from "./exporting"
// import Footer from "../components/ui/Footer"
function Home() {
  return (
    <div className="flex flex-col">
        <Link to="signin">signIn</Link>
        <Link to="signup">sinUp</Link>
        {/* <Header/> */}
    </div>
  )
}

export default Home
