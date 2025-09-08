import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { toast } from "react-toastify";
import { AuthContext } from "../context/Authcontext.jsx"; 
import { CartContext } from "../context/CartContext.jsx"; // ✅ Import CartContext

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); 
  const { clearCart } = useContext(CartContext); // ✅ Get clearCart
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    {
      to: "/cart",
      label: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 18h10a1 1 0 00.9-.55L21 8"
            />
            <circle cx="9" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
          </svg>
          Cart
        </>
      ),
    },
    { to: "/my-orders", label: "My Orders" },
    { to: "/admin", label: "Admin" },
  ];

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("token")) {
        await axios.post(
          `${BACKEND_URL}/api/logout`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }
      logoutUser();   // Clear user state
      clearCart();    // ✅ Clear cart on logout
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Try again!");
    }
  };

  const buttonClass =
    "hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300";

  const mobileButtonClass =
    "flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300";

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setOpen(false)} />}
      <nav className="bg-gradient-to-r from-green-900 via-emerald-700 to-amber-300 text-white fixed top-0 left-0 w-full z-40 font-bold text-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 18h10a1 1 0 00.9-.55L21 8"
              />
              <circle cx="9" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
            </svg>
            <span className="text-white">UrbanGreens</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-gray-200 items-center">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-white transition flex items-center">
                {link.label}
              </Link>
            ))}

            {user ? (
              <button onClick={handleLogout} className={buttonClass}>
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </button>
            ) : (
              <Link to="/login" className={buttonClass}>
                <span>Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-16a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(true)} className="md:hidden focus:outline-none" aria-label="Open Menu">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: open ? "0%" : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-900 to-green-700 shadow-lg z-40 transform transition-transform ease-in-out duration-300 md:hidden font-bold text-lg"
        >
          <div className="p-4 flex items-center justify-between border-b border-green-700">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 18h10a1 1 0 00.9-.55L21 8"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
              <span className="text-white">GreenGrocer</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close Menu">
              ✕
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-gray-200 hover:text-white transition flex items-center">
                {link.label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className={mobileButtonClass}
              >
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </button>
            ) : (
              <Link to="/signup" onClick={() => setOpen(false)} className={mobileButtonClass}>
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-16a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
              </Link>
            )}
          </div>
        </motion.div>
      </nav>

      <div className="h-20 md:h-20 bg-gradient-to-r from-green-900 to-green-700" />
    </>
  );
}
