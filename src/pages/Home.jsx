import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import womanGrocery from "../assets/women1.png";
import groceryBg from "../assets/grocery2.jpg"; // ✅ Grocery background pattern
import { FaStar, FaAppleAlt, FaBreadSlice, FaUtensils } from "react-icons/fa";
import {
  FaTruckFast,
  FaLeaf,
  FaMoneyBillWave,
  FaArrowRotateLeft,
  FaSeedling,
  FaFish,
  FaBottleDroplet,
  FaBottleWater,
  FaPumpSoap,
  FaBroom,
  FaCookieBite,
  FaPepperHot,
} from "react-icons/fa6";

/* ================= COUNT UP COMPONENT ================= */
const CountUp = ({ end, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const steps = 60;
    const increment = end / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, interval);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <>
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
};
/* ===================================================== */

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Grains", icon: <FaSeedling /> },
    { name: "Pulses", icon: <FaSeedling /> },
    { name: "Essentials", icon: <FaUtensils /> },
    { name: "Dairy", icon: <FaBottleDroplet /> },
    { name: "Protein", icon: <FaFish /> },
    { name: "Fruits", icon: <FaAppleAlt /> },
    { name: "Vegetables", icon: <FaLeaf /> },
    { name: "Cooking Oil", icon: <FaBottleDroplet /> },
    { name: "Beverages", icon: <FaBottleWater /> },
    { name: "Bakery", icon: <FaBreadSlice /> },
    { name: "Personal Care", icon: <FaPumpSoap /> },
    { name: "Cleaning", icon: <FaBroom /> },
    { name: "Snacks", icon: <FaCookieBite /> },
    { name: "Condiments", icon: <FaPepperHot /> },
  ];

  return (
    <div className="w-full min-h-screen relative bg-gradient-to-r from-green-900 to-green-700 text-white flex flex-col">
      {/* ✅ Grocery Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{ backgroundImage: `url(${groceryBg})` }}
      ></div>

      <br />

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-serif drop-shadow-lg relative z-10">
        Explore Our Categories
      </h1>

      {/* Featured Categories Auto-Slider */}
      <div className="relative z-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <motion.div
          className="flex gap-4 px-6 md:px-20 pb-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...categories, ...categories].map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/products?category=${cat.name}`)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg 
              hover:bg-yellow-400 hover:text-green-900 transition-colors cursor-pointer 
              ${i % 2 === 0 ? "bg-white text-green-900" : "bg-yellow-100 text-green-900"}`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 flex-1 pt-10 md:pt-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Handpicking Fresh <br /> groceries items
          </h1>
          <p className="text-gray-300 mb-6">
            Best groceries app ever. Pick your desired groceries from the menu.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 shadow-lg transition-transform hover:scale-105"
          >
            Shop Now
          </button>

          <p className="text-xs text-yellow-300 mt-4">
            🎉 Get free delivery on your first order!
          </p>

          <p className="text-sm text-gray-300 mt-6">
            Not yet member?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 hover:underline"
            >
              Sign up now
            </button>
          </p>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-green-900 shadow mt-6 w-fit">
            <FaTruckFast className="text-red-500 text-lg" />
            <span className="font-semibold">FAST</span>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-0"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={womanGrocery}
            alt="Woman with groceries"
            className="w-[300px] md:w-[400px] object-contain drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* 🔥 TRUST STATS (ANIMATED) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-20 py-14 bg-black/20 backdrop-blur-sm">
        {[
          { end: 50, suffix: "K+", label: "Happy Customers" },
          { end: 10, suffix: "K+", label: "Orders Delivered" },
          { end: 30, suffix: "+", label: "Cities Served" },
          { end: 4.8, suffix: "★", label: "Rating", decimals: 1 },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="text-center"
          >
            <p className="text-3xl font-extrabold text-yellow-300">
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
              />
            </p>
            <p className="text-sm text-gray-200">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20 py-10 relative z-10">
        <div className="flex flex-col items-center text-center">
          <FaLeaf className="text-yellow-300 text-3xl mb-2" />
          <p className="font-semibold">100% Fresh</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaTruckFast className="text-yellow-300 text-3xl mb-2" />
          <p className="font-semibold">Same-Day Delivery</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaMoneyBillWave className="text-yellow-300 text-3xl mb-2" />
          <p className="font-semibold">Secure Payment</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaArrowRotateLeft className="text-yellow-300 text-3xl mb-2" />
          <p className="font-semibold">Easy Returns</p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="relative z-10 px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose UrbanGreens
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaLeaf />,
              title: "Farm Fresh",
              desc: "Directly sourced from trusted farmers.",
            },
            {
              icon: <FaTruckFast />,
              title: "Lightning Delivery",
              desc: "Fast & reliable doorstep delivery.",
            },
            {
              icon: <FaMoneyBillWave />,
              title: "Affordable Prices",
              desc: "Best prices with daily offers.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center shadow-xl"
            >
              <div className="text-yellow-300 text-4xl mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Offer Banner */}
      <div className="relative z-10 bg-yellow-400 text-green-900 py-10 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-2">Special Weekend Offer 🎉</h2>
        <p className="mb-4 text-lg">
          Get <span className="font-bold">30% OFF</span> on Fruits & Vegetables.
        </p>
        <button
          onClick={() => navigate("/products?category=Fruits")}
          className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-green-800 shadow-lg transition-transform hover:scale-105"
        >
          Shop Fruits
        </button>
      </div>

      {/* Newsletter */}
      <div className="relative z-10 py-16 px-6 md:px-20 bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 text-center text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-300">
            Stay Updated With Offers
          </h2>
          <p className="mb-8 text-gray-200 max-w-2xl mx-auto">
            Subscribe to get exclusive deals & updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-full w-full outline-none shadow-md"
            />
            <button
              onClick={() => alert("✅ Subscribed Successfully!")}
              className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 shadow-lg transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
