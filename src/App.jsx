import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Products from "./pages/Product";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/Authcontext";
import ThankYou from "./pages/Thankyou";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MyOrder from "./pages/Myorder";
import MyProfile from "./pages/Myprofile";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* ✅ fixed padding-top so heading never hides under navbar */}
            <main className="flex-grow bg-transparent pt-[72px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/my-orders" element={<MyOrder />} />
                <Route path="/my-profile" element={<MyProfile />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>

        {/* ✅ Toastify container */}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          toastClassName={({ type }) =>
            `relative flex items-center p-4 mb-3 rounded-lg shadow-lg font-medium backdrop-blur-md border 
             transition-all duration-300 ease-in-out animate-slide-up max-w-sm w-full mx-auto break-words overflow-hidden
             ${
               type === "success"
                 ? "bg-white/10 border-green-400 text-green-200"
                 : type === "error"
                 ? "bg-white/10 border-red-400 text-red-200"
                 : type === "info"
                 ? "bg-white/10 border-blue-400 text-blue-200"
                 : type === "warning"
                 ? "bg-white/10 border-yellow-400 text-yellow-200"
                 : "bg-white/10 border-gray-400 text-gray-200"
             }`
          }
          bodyClassName="text-sm tracking-wide"
          progressClassName="bg-gradient-to-r from-white/80 to-white/40 rounded-full"
        />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
