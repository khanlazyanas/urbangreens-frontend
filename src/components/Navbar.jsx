import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { toast } from "react-toastify";
import { AuthContext } from "../context/Authcontext.jsx";
import { CartContext } from "../context/CartContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const { clearCart, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("token")) {
        await axios.post(
          `${BACKEND_URL}/api/logout`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }
      logoutUser();
      clearCart();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Try again!");
    }
  };

  const desktopBtn =
    "hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 font-['Roboto']";

  const mobileBtn =
    "flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 w-full font-['Roboto']";

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    {
      to: "/cart",
      label: (
        <div className="relative inline-flex items-center">
          {/* 🛒 Cart Icon */}
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
          <span>Cart</span>

          {/* 🔴 Red Animated Badge */}
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0 }}
              animate={{ scale: [1.3, 1] }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
            >
              {cartCount}
            </motion.span>
          )}
        </div>
      ),
    },
    { to: "/my-orders", label: "My Orders" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <>
      {/* Background dim when drawer open */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-900 via-emerald-700 to-amber-300 text-white fixed top-0 left-0 w-full z-40 font-bold text-lg font-['Roboto'] shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
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
            <span className="text-white text-xl md:text-2xl">UrbanGreens</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-gray-200 items-center">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-white transition flex items-center hover:scale-105"
              >
                {link.label}
              </Link>
            ))}

            {/* Profile Icon */}
            {user && (
              <Link
                to="/my-profile"
                className="hover:text-yellow-300 transition"
                title="My Profile"
              >
                <motion.svg
                  whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.4 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                    1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 
                    4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </motion.svg>
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className={desktopBtn}>
                Logout
              </button>
            ) : (
              <Link to="/login" className={desktopBtn}>
                Login
              </Link>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden focus:outline-none"
            aria-label="Open Menu"
          >
            <svg
              className="w-7 h-7 text-white"
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
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.aside
              key="drawer"
              initial={{ x: "-100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "-100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-md shadow-2xl z-40 rounded-r-2xl p-6 md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-700"
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
                  <span className="text-green-800 font-extrabold text-xl">
                    UrbanGreens
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close Menu"
                  className="text-green-800 hover:text-green-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-4 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block text-green-900 font-semibold px-4 py-2 rounded-xl hover:bg-green-100 transition hover:scale-105"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Profile Icon Mobile */}
                {user && (
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 * (links.length + 1),
                      duration: 0.5,
                    }}
                  >
                    <Link
                      to="/my-profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-green-900 font-semibold px-4 py-2 rounded-xl hover:bg-green-100 transition hover:scale-105"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                         1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 
                         4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </motion.svg>
                      <span>My Profile</span>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Auth button bottom */}
              <div className="mt-6">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className={mobileBtn}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className={mobileBtn}
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
