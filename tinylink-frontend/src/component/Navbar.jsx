import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const hoverEffect = "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
    // const hoverEffect = "border-b-2 border-transparent transition-colors duration-300 hover:border-current";
    const buttonEffect = "border-2 border-gray-800 rounded-md px-4 py-1.5 text-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-pointer";
    // const buttonEffect = "border-2 border-gray-800 rounded-md px-4 py-1.5 transition-colors duration-300 hover:border-gray-400 hover:text-gray-600 cursor-pointer";

    const handleLogout = async () => {
        try {
            await logoutUser();

            logout();

            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <nav className="flex items-center w-full h-16 border-b-2 justify-between bg-gray-100">
            <Link to="/" className="text-4xl font-bold text-gray-800 ml-40 transition-all duration-300 hover:[text-shadow:0_0_20px_rgba(59,130,246,0.8)]">TinyLink</Link>

            <div className="flex items-center mr-40">


                {isAuthenticated  ? (
                    <div className="flex items-center gap-6">
                        <Link className={hoverEffect} to="/my-url">My URL</Link>
                        <button className={buttonEffect} onClick={handleLogout}>Logout </button>
                    </div>
                    
                ) : (
                    <div className="flex items-center gap-6">
                        <Link className={hoverEffect} to="/login">Login</Link>
                        <Link className={buttonEffect} to="/register">Register</Link>
                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;