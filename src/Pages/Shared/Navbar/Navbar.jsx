import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  FaHome,
  FaPaw,
  FaHeart,
  FaHandsHelping,
  FaPhoneAlt,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import ToggleTheme from "../../../Components/ToggleTheme";
import { AuthContext } from "../../../Context/AuthContext";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [isBlur, setIsBlur] = useState(false);
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsBlur(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (path) =>
    [
      "flex items-center gap-2 px-4 py-2 rounded-md  transition",
      pathname === path
        ? "bg-primary text-pink-600"
        : "hover:bg-muted/60",
    ].join(" ");

  const handleLogout = async () => {
    try {
      await userSignOut();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isBlur
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/yNj7nhmJ/Petsera.png"
            alt="Petsera logo"
            className="w-16"
          />
         
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-4 text-pink-600 font-medium lg:flex">
          <li><Link to="/" className={linkClass("/")}><FaHome />Home</Link></li>
          <li><Link to="/pets" className={linkClass("/pets")}><FaPaw />Adopt</Link></li>
          <li><Link to="/donate" className={linkClass("/donate")}><FaHeart />Donate</Link></li>
          <li><Link to="/volunteer" className={linkClass("/volunteer")}><FaHandsHelping />Volunteer</Link></li>
          <li><Link to="/contact" className={linkClass("/contact")}><FaPhoneAlt />Contact</Link></li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3 relative">
          <ToggleTheme />

          {user ? (
            <>
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-primary"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-popover shadow-lg border rounded-md w-48 z-50">
                  <div className="px-4 py-2 text-sm border-b text-pink-600">
                    {user.displayName || user.email}
                  </div>
                  <ul className="text-sm">
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-green-300 px-4 py-2 hover:bg-muted/50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FaTachometerAlt /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-muted/50"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <details className="relative">
              <summary className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted/60">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>

              <ul className="absolute right-0 mt-2 w-56 space-y-1 rounded-md bg-popover p-2 shadow-lg z-50">
                <li><Link to="/" className={linkClass("/")}><FaHome />Home</Link></li>
                <li><Link to="/pets" className={linkClass("/pets")}><FaPaw />Adopt</Link></li>
                <li><Link to="/donate" className={linkClass("/donate")}><FaHeart />Donate</Link></li>
                <li><Link to="/volunteer" className={linkClass("/volunteer")}><FaHandsHelping />Volunteer</Link></li>
                <li><Link to="/contact" className={linkClass("/contact")}><FaPhoneAlt />Contact</Link></li>

                {user ? (
                  <>
                    <li><Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link></li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:underline"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className={linkClass("/login")}>Login</Link></li>
                    <li><Link to="/register" className={linkClass("/register")}>Register</Link></li>
                  </>
                )}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
