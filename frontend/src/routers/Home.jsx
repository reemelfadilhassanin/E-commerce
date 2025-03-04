import { Link } from "react-router";
import { Outlet } from "react-router";
function Home() {
  return (
    <>
      {/* Moaz put your header here */}
      {/* ********* */}

      {/* ********* */}
      <div className="flex flex-col">
        <Link to="signin">signIn</Link>
        <Link to="signup">signUp</Link>
      </div>
      <Outlet />
      {/* Moaz put your header footer */}
      {/* ********* */}

      {/* ********* */}
    </>
  );
}

export default Home;
