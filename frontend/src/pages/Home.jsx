import { Link } from "react-router"
import { Footer, Header, About } from "./exporting"




function Home() {
  return (
    <div className="flex flex-col">
        {/* <Link to="signin">signIn</Link>
        <Link to="signup">signUp</Link> */}
        <Header/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home
