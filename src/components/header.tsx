import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser, FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
    const user={_id:"as",role:"admin"};
    // const user=;
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const logouthandeler=()=>{
        setIsOpen(false);
    }
  return (
    <nav className="header">
        <main>
        <Link onClick={()=>setIsOpen(()=>false)} to={'/'}>Home</Link>
        </main>
        <Link onClick={()=>setIsOpen(()=>false)} to={'/search'} >
            <FaSearch />
        </Link>
        <Link onClick={()=>setIsOpen(()=>false)} to={'/cart'}>
            <FaShoppingBag/>
        </Link>
        {
            user?._id ? (
                <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>
                <dialog open={isOpen}>
                    <div>
                        {
                            user.role === "admin" && (
                                <Link onClick={()=>setIsOpen(()=>false)} to={'/admin/dashboard'}>
                                    Admin
                                </Link>
                            )
                        }
                        <Link onClick={()=>setIsOpen(()=>false)} to={'/orders'} >Orders</Link>
                        <button onClick={logouthandeler}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                </dialog>
                </>
            ) : (
                <Link onClick={()=>setIsOpen(()=>false)} to={'/login'}>
                    <FaSignInAlt />
                </Link>
            )
        }
    </nav>
  );
}

export default Header