import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaChartLine,
  FaHome,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "../types/types";
import { shorten } from "../utils/extra";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logouthandeler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed Out!");
      setIsOpen(false);
    } catch (error) {
      toast.error("SignOut Failed!");
    }
  };
  return (
    <nav className="header">
      <main>
        <Link onClick={() => setIsOpen(() => false)} to={"/"}>
          <Link to={"/"}>
            <FaHome />
          </Link>
        </Link>
      </main>
      {user?.role === "admin" && (
        <Link onClick={() => setIsOpen(() => false)} to={"/admin/dashboard"}>
          <Link to={"/admin/dashboard"}>
            <FaChartLine />
          </Link>
        </Link>
      )}
      {user?.role === "user" && (
        <>
          <Link onClick={() => setIsOpen(() => false)} to={"/search"}>
            <FaSearch />
          </Link>
          <Link onClick={() => setIsOpen(() => false)} to={"/cart"}>
            <FaShoppingBag />
          </Link>
        </>
      )}
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {
                <Link
                  onClick={() => setIsOpen(() => false)}
                  to={"/admin/dashboard"}
                >
                {shorten(user.name)}
                </Link>
              }
              {user.role === "user" && (
                <Link onClick={() => setIsOpen(() => false)} to={"/orders"}>
                  Orders
                </Link>
              )}
              <button onClick={logouthandeler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link onClick={() => setIsOpen(() => false)} to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
