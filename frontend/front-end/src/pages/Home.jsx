import { Link } from "react-router"
function Home() {
  return (
    <div className="flex flex-col">
        <Link to="signin">signIn</Link>
        <Link to="signup">signUp</Link>
    </div>
  )
}

export default Home