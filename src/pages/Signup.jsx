import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../main.jsx";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Eye icons

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("⚠️ Please fill all fields!", { toastId: "signup-empty" });
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Account created successfully!", {
          toastId: "signup-success",
        });
        navigate("/login");
      } else {
        toast.error(data.message || "❌ Signup failed!", {
          toastId: "signup-fail",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("🚨 Server error. Try again later!", {
        toastId: "signup-error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20 flex flex-col"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 animate-pulse">
          Create Your Account
        </h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="👤 Full Name"
          className="w-full mb-5 px-5 py-3 rounded-xl border border-gray-300 bg-white/70 
                     focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="✉️ Email"
          className="w-full mb-5 px-5 py-3 rounded-xl border border-gray-300 bg-white/70 
                     focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 👁️ Password with Eye Toggle */}
        <div className="relative w-full mb-6">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type={showPassword ? "text" : "password"}
            placeholder="🔒 Password"
            className="w-full px-5 py-3 pr-12 rounded-xl border border-gray-300 bg-white/70 
                       focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-green-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white 
                     font-bold shadow-lg hover:shadow-xl transition-transform duration-300 mb-4"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
