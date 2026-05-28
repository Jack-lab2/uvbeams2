import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-green-600">
          UVBEAMS
        </Link>

        {/* Hamburger Trigger Button (Visible only on mobile/tablet) */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              // X Icon when menu is open
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon when menu is closed
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          <Link to="/" className="text-sm font-semibold text-gray-900 hover:text-green-600">Home</Link>
          <Link to="/submit" className="text-sm font-semibold text-gray-900 hover:text-green-600">Submit</Link>
          <Link to="/program" className="text-sm font-semibold text-gray-900 hover:text-green-600">Program</Link>
          <Link to="/guidelines" className="text-sm font-semibold text-gray-900 hover:text-green-600">Guidelines</Link>
          <Link to="/registration" className="text-sm font-semibold text-gray-900 hover:text-green-600">Registration</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-gray-100 py-1 pl-1 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold text-xs shadow-sm">
                  {(user.first_name?.[0] || "U") + (user.last_name?.[0] || "")}
                </div>
                {user.first_name || "Profile"} ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Edit Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 shadow-inner">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 hover:text-green-600 py-2">
            Home
          </Link>
          <Link to="/submit" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 hover:text-green-600 py-2">
            Submit
          </Link>
          <Link to="/program" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 hover:text-green-600 py-2">
            Program
          </Link>
          <Link to="/guidelines" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 hover:text-green-600 py-2">
            Guidelines
          </Link>
          <Link to="/registration" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 hover:text-green-600 py-2">
            Registration
          </Link>
          
          <hr className="my-2 border-gray-200" />

          {user ? (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold text-xs">
                  {(user.first_name?.[0] || "U") + (user.last_name?.[0] || "")}
                </div>
                <span className="font-semibold text-gray-900">{user.first_name || "User"}</span>
              </div>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 hover:text-green-600 pl-11 py-2">
                Edit Profile
              </Link>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="block w-full text-left text-sm text-red-600 hover:bg-gray-50 pl-11 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-500"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;