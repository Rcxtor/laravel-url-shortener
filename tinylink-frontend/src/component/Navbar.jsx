import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const hoverEffect = "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
    const buttonEffect = "border-2 border-gray-800 rounded-md px-4 py-1.5 text-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white cursor-pointer";

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
            
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex items-center w-full h-16 border-b-2 justify-between bg-gray-100">
            <Link to="/" className="text-4xl font-bold text-gray-800 ml-40 transition-all duration-300 hover:[text-shadow:0_0_20px_rgba(59,130,246,0.8)]"> TinyLink</Link>

            <div className="flex items-center mr-40">
                {isAuthenticated ? (
                    <div className="flex items-center gap-6">
                        <Link className={hoverEffect} to="/my-url" > My URL </Link>

                        <div ref={dropdownRef} className="relative">
                            <button type="button" className={buttonEffect} onClick={() => setOpen(!open)}>
                                {user?.name || "User"} ▼
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-40 border-2 border-gray-800 rounded-md bg-white shadow-lg z-50">
                                    <Link
                                        to="/profile"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <Link
                            className={hoverEffect}
                            to="/login"
                        >
                            Login
                        </Link>

                        <Link
                            className={buttonEffect}
                            to="/register"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

