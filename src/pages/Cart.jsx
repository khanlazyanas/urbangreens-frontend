import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../main.jsx";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Show login toast only once
  useEffect(() => {
  if (!token) {
    toast.error("Please login first", { toastId: "login-toast" });
    navigate("/login");
  }
}, [token, navigate]);


  if (!token) return null;

  const updateQuantity = async (item, type) => {
    try {
      const quantity =
        type === "increase"
          ? item.quantity + 1
          : item.quantity > 1
          ? item.quantity - 1
          : 1;

      const productId = String(item.productId ?? item.id);

      const res = await axios.put(
        `${BACKEND_URL}/api/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setCartItems(res.data.cart.items);
        toast.success(
          `Quantity ${type === "increase" ? "increased" : "decreased"}!`
        );
      }
    } catch (err) {
      console.error("Update quantity error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update quantity.");
    }
  };

  const removeItem = async (item) => {
    try {
      const productId = String(item.productId ?? item.id);

      const res = await axios.delete(`${BACKEND_URL}/api/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });

      if (res.data.success) {
        setCartItems(res.data.cart.items);
        toast.success("Item removed from cart!");
      }
    } catch (err) {
      console.error("Remove item error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to remove item.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-medium text-gray-700">
          🛒 Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-lg font-semibold tracking-wide">
          YOUR CART <span className="text-gray-500">({cartItems.length} items)</span>
        </h1>
      </div>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={String(item.productId ?? item.id)}
            className="flex gap-4 items-center border-b pb-4"
          >
            <img src={item.image} alt={item.name} className="h-20 w-20 object-contain" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-800">{item.name}</h2>
              <div className="text-base font-semibold mt-1">
                ₹{Number(item.price).toFixed(2)}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQuantity(item, "decrease")}
                    className="px-3 py-1 text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, "increase")}
                    className="px-3 py-1 text-lg font-medium"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="text-gray-500 text-sm hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span>SUB TOTAL</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500">Shipping And Taxes Calculated At Checkout</p>
        <button
          onClick={() => navigate("/checkout")}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-600 
                     hover:from-green-600 hover:via-yellow-500 hover:to-yellow-400 
                     text-white font-bold tracking-wide text-lg
                     rounded-xl shadow-lg font-[Poppins]
                     transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
