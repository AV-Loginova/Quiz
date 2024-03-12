import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-[100vw] h-[10vh] flex justify-center items-center">
      <ul className="w-[100vw] flex justify-center gap-[20vw]">
        <li className="">
          <Link to={"/"}>Home </Link>
        </li>
        <li className="">
          <Link to={"/quiz"}>Quiz </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
