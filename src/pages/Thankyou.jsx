import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import MyOrder from "./Myorder"; // 👈 import MyOrder

export default function ThankYou() {
  const { width, height } = useWindowSize();
  const [showOrders, setShowOrders] = useState(false);

  if (showOrders) {
    return <MyOrder />; // 👈 Same page me MyOrder ka content show hoga
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 overflow-hidden">
      <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gradient-to-br from-white/80 to-green-50/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-green-200"
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <FaCheckCircle className="text-green-500 text-6xl sm:text-7xl mx-auto mb-6 drop-shadow-2xl" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Order Confirmed! 🎉
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-8">
          Thank you for shopping with us. Your order has been placed{" "}
          <span className="font-semibold text-green-700">successfully</span>.  
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 transition"
          >
            🏠 Back to Home
          </Link>

          {/* ✅ Same page me MyOrder show karega */}
          <button
            onClick={() => setShowOrders(true)}
            className="px-6 py-3 bg-white border-2 border-green-500 text-green-700 rounded-xl font-semibold shadow-md hover:bg-green-50 transition"
          >
            📦 View My Orders
          </button>

          <Link
            to="/products"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-semibold shadow-md hover:shadow-xl transition"
          >
            🛍️ Shop More
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
