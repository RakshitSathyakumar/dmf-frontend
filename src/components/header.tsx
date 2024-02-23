import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaHome,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "../types/types";

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
          <Link to={'/'}>
            <FaHome />
          </Link>
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
