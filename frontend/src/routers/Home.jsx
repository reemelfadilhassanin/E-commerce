import { Link } from "react-router";
import { Outlet } from "react-router";
// import Header from "../components/ui/Header";
// import Footer from "../components/ui/Footer";
function Home() {
  return (
    <>
      {/* Moaz put your header here */}
      {/* ********* */}
      {/* <Header /> */}
      {/* ********* */}
      <div className="flex flex-col">
        <Link to="signin">signIn</Link>
        <Link to="signup">signUp</Link>
      </div>
      <Outlet />
      {/* Moaz put your header footer */}
      {/* ********* */}
      {/* <Footer /> */}
      {/* ********* */}
    </>
  );
}

export default Home;
