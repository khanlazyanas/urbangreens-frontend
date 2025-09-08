import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../main.jsx";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", phone: "", address: "", email: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showSummary, setShowSummary] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields!");
      return;
    }
    if (!token) {
      toast.error("You must login first!");
      navigate("/login");
      return;
    }

    try {
      if (paymentMethod === "COD") {
        const res = await axios.post(
          `${BACKEND_URL}/api/payment/cod`,
          {
            items: cartItems,
            total,
            address: formData.address,
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          toast.success("COD Order Placed Successfully!");
          clearCart();
          navigate("/thankyou");
        }
      } else if (paymentMethod === "UPI") {
        const res = await axios.post(
          `${BACKEND_URL}/api/payment/create-order`,
          {
            amount: total,
            items: cartItems,
            address: formData.address,
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          const { razorpayOrderId, amount, currency, backendOrderId } = res.data.order;

          const options = {
            key: res.data.key,
            amount: amount * 100, // paise
            currency,
            name: "UrbanGreens",   // 🟢 Shop name here
            description: "Order Payment",
            order_id: razorpayOrderId,
            handler: async function (response) {
              try {
                const verifyRes = await axios.post(
                  `${BACKEND_URL}/api/payment/verify-payment`,
                  {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: backendOrderId,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                if (verifyRes.data.success) {
                  toast.success("Payment Successful! Order Paid.");
                  clearCart();
                  navigate("/thankyou");
                }
              } catch (err) {
                console.error("Payment Verification Error:", err.response?.data || err.message);
                toast.error("Payment verification failed!");
              }
            },
            prefill: { name: formData.name, email: formData.email, contact: formData.phone },
            theme: { color: "#FBBF24" },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      }
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Payment failed!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-lg font-semibold tracking-wide border-b pb-4">CHECKOUT</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 py-10">Your cart is empty 😕</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10 mt-6">
          {/* Order Summary */}
          <div>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md text-left text-sm font-medium text-gray-800 hover:bg-gray-200 transition"
            >
              <span>Order Summary</span>
              {showSummary ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {showSummary && (
              <div className="mt-4 space-y-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      ₹{item.price * (item.quantity || 1)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t text-base font-semibold">
                  <span>SUB TOTAL</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Shipping And Taxes Calculated At Checkout
                </p>
              </div>
            )}
          </div>

          {/* Delivery Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-base font-medium">Delivery Details</h3>
            <div>
              <label className="block text-sm mb-1">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                Delivery Address<span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-700"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm mb-1">Email (optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-700"
              />
            </div>

            {/* Payment Options */}
            <div>
              <label className="block text-sm mb-2">Payment Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />{" "}
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                  />{" "}
                  UPI / Online
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-600 hover:from-green-600 hover:via-yellow-500 hover:to-yellow-400 text-white font-bold tracking-wide text-lg rounded-xl shadow-lg font-[Poppins] transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
