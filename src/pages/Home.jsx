import React from "react";
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
              onClick={() => navigate(`/products?category=${cat.name}`)} // ✅ category click par navigate
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
        {/* Left Content */}
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

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
            <button
              onClick={() => navigate("/products")}
              className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 w-full sm:w-auto shadow-lg transition-transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>

          <p className="text-xs text-yellow-300 mb-6">
            🎉 Get free delivery on your first order!
          </p>

          <p className="text-sm text-gray-300 mb-8">
            Not yet member?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 hover:underline"
            >
              Sign up now
            </button>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* <div className="bg-white text-green-900 px-4 py-2 rounded-full flex items-center gap-2 shadow">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="user1"
                className="w-6 h-6 rounded-full"
              />
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="user2"
                className="w-6 h-6 rounded-full"
              />
              <img
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt="user3"
                className="w-6 h-6 rounded-full"
              />
              <span className="flex items-center text-sm">
                <FaStar className="text-yellow-500 mr-1" /> 4.5{" "}
                <span className="text-gray-500 ml-1">(12.5K reviews)</span>
              </span>
            </div> */}

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-green-900 shadow">
              <FaTruckFast className="text-red-500 text-lg" />
              <span className="font-semibold">FAST</span>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
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

      {/* ✅ Offer Banner */}
      <div className="relative z-10 bg-yellow-400 text-green-900 py-10 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-2">Special Weekend Offer 🎉</h2>
        <p className="mb-4 text-lg">
          Get <span className="font-bold">30% OFF</span> on Fruits & Vegetables. Limited time only!
        </p>
        <button
          onClick={() => navigate("/products?category=Fruits")}
          className="bg-green-900 text-white px-6 py-3 rounded-full hover:bg-green-800 shadow-lg transition-transform hover:scale-105"
        >
          Shop Fruits
        </button>
      </div>

      {/* ✅ Testimonials Section
      <div className="relative z-10 py-14 px-6 md:px-20 bg-white text-green-900">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
              text: "Fresh groceries at my doorstep. Super fast delivery!",
            },
            {
              name: "Rahul Verma",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
              text: "Best grocery app ever. Easy to use and reliable service.",
            },
            {
              name: "Neha Gupta",
              img: "https://randomuser.me/api/portraits/women/47.jpg",
              text: "Amazing quality and affordable prices. Highly recommend!",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-green-50 p-6 rounded-2xl shadow-lg text-center"
            >
              <img
                src={review.img}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="italic mb-3">"{review.text}"</p>
              <p className="font-bold">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* ✅ Newsletter Section */}
      <div className="relative z-10 py-16 px-6 md:px-20 bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 text-center text-white">
  {/* Overlay Pattern */}
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>

  <div className="relative">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-300 tracking-wide drop-shadow-md">
      Stay Updated With Offers
    </h2>
    <p className="mb-8 text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
      Subscribe to get exclusive deals, product updates & handpicked offers directly in your inbox.
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-5 py-3 rounded-full w-full sm:flex-1 text-white-900 outline-none shadow-md focus:ring-2 focus:ring-yellow-400"
      />
      <button
        onClick={() => alert("✅ Subscribed Successfully! 🎉")}
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
