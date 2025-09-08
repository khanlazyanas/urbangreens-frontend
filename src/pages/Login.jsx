import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { AuthContext } from "../context/Authcontext.jsx";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("⚠️ Please fill all fields!", { toastId: "login-empty" });
      return;
    }
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      loginUser(data.user, data.token);

      toast.success("🎉 Login successful!", { toastId: "login-success" });

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "❌ Server error. Try again!", {
        toastId: "login-error",
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
          Welcome Back
        </h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="✉️ Email"
          className="w-full mb-5 px-5 py-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="🔒 Password"
          className="w-full mb-6 px-5 py-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold shadow-lg hover:shadow-xl transition-transform duration-300 mb-4"
        >
          Login
        </motion.button>

        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 font-semibold hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
