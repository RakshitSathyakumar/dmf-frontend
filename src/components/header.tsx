import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType{
  user:User | null;
}

const Header = ({user}:PropsType) => {
  // const user=;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logouthandeler = async() => {
    try {
      await signOut(auth);
      toast.success("Signed Out!")
      setIsOpen(false);
    } catch (error) {
      toast.error("SignOut Failed!")
    }
  };
  return (
    <nav className="header">
      <main>
        <Link onClick={() => setIsOpen(() => false)} to={"/"}>
          Home
        </Link>
      </main>
      <Link onClick={() => setIsOpen(() => false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(() => false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link
                  onClick={() => setIsOpen(() => false)}
                  to={"/admin/dashboard"}
                >
                  Admin
                </Link>
              )}
              <Link onClick={() => setIsOpen(() => false)} to={"/orders"}>
                Orders
              </Link>
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
