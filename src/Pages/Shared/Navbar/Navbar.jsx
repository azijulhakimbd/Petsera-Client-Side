import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaPaw,
  FaHeart,
  FaHandsHelping,
  FaPhoneAlt,
  FaFileAlt,
} from "react-icons/fa";
import ToggleTheme from "../../../Components/ToggleTheme";

const Navbar = () => {
  const [isBlur, setIsBlur] = useState(false);
  const { pathname } = useLocation();

  // add / remove blur on scroll
  useEffect(() => {
    const onScroll = () => setIsBlur(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** helper to style active / inactive links */
  const linkClass = (path) =>
    [
      "flex items-center gap-2 px-4 py-2 rounded-md transition",
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-muted/60",
    ].join(" ");

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
          <span className="hidden text-xl font-bold text-primary sm:block">
            Petsera
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-4 text-sm font-medium lg:flex">
          <li><Link to="/"         className={linkClass("/")}        ><FaHome />Home</Link></li>
          <li><Link to="/pets"     className={linkClass("/pets")}    ><FaPaw />Adopt</Link></li>
          <li><Link to="/donate"   className={linkClass("/donate")}  ><FaHeart />Donate</Link></li>
          <li><Link to="/volunteer" className={linkClass("/volunteer")}><FaHandsHelping />Volunteer</Link></li>
          <li><Link to="/contact"  className={linkClass("/contact")} ><FaPhoneAlt />Contact</Link></li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ToggleTheme />

          <Link
            to="/login"
            className="rounded-md px-3 py-2 text-sm font-medium
                       text-primary underline-offset-2 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium
                       text-primary-foreground hover:bg-primary/90"
          >
            Register
          </Link>

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

              <ul
                className="absolute right-0 mt-2 w-56 space-y-1 rounded-md
                           bg-popover p-2 shadow-lg"
              >
                <li><Link to="/"          className={linkClass("/")}         ><FaHome />Home</Link></li>
                <li><Link to="/pets"      className={linkClass("/pets")}     ><FaPaw />Adopt</Link></li>
                <li><Link to="/donate"    className={linkClass("/donate")}   ><FaHeart />Donate</Link></li>
                <li><Link to="/volunteer" className={linkClass("/volunteer")}><FaHandsHelping />Volunteer</Link></li>
                <li><Link to="/contact"   className={linkClass("/contact")}  ><FaPhoneAlt />Contact</Link></li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
