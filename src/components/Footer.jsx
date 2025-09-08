import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-emerald-700 to-amber-300 text-white">
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/grocery-store.png"
              alt="Logo"
              className="w-10"
            />
            <h2 className="text-2xl font-bold tracking-wide">Grocery App</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Freshness at your fingertips. Shop smart, eat fresh, and save time
            with Grocery App.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Checkout", path: "/checkout" },
              { name: "Admin", path: "/admin" },
              { name: "Cart", path: "/cart" },
              { name: "Login", path: "/login" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-yellow-400 transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Policies
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link
                to="/terms"
                className="hover:text-yellow-400 transition duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-yellow-400 transition duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
  <h3 className="text-lg font-semibold mb-4 text-yellow-400">
    Follow Us
  </h3>
  <div className="flex items-center gap-4 text-2xl flex-nowrap">
    {[
      { icon: <FaInstagram />, link: "https://instagram.com/khan_anas842" },
      { icon: <FaYoutube />, link: "https://youtube.com/@khananas2318" },
      { icon: <FaWhatsapp />, link: "https://wa.me/8429755694" },
      { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/anas-khan-a26b66364" },
      { icon: <FaGithub />, link: "https://github.com/dashboard" },
    ].map((social, i) => (
      <a
        key={i}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-green-900 shadow-md hover:shadow-yellow-400/50 transition-all duration-300"
      >
        {social.icon}
      </a>
    ))}
  </div>
</div>

      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 text-center py-5 
  text-[13px] sm:text-sm text-gray-800 font-light tracking-wider">
  © {new Date().getFullYear()} Grocery App · Excellence in Every Basket™ | 
  <span className="ml-1">
    Developed by{" "}
    <span className="text-[13px] sm:text-sm underline font-signature italic text-slate-800 tracking-wider">
      Anas Khan
    </span>
  </span>
</div>
    </footer>
  );
};

export default Footer;
