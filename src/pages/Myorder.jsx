import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";
import { BACKEND_URL } from "../main";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const getStatusIcon = (status) => {
  switch (status) {
    case "Delivered":
      return <FaCheckCircle className="text-green-600 text-xl" />;
    case "Shipped":
      return <FaTruck className="text-blue-500 text-xl" />;
    case "Pending":
      return <FaBox className="text-yellow-500 text-xl" />;
    case "Cancelled":
      return <FaTimesCircle className="text-red-600 text-xl" />;
    default:
      return <FaBox className="text-gray-500 text-xl" />;
  }
};

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("⚠️ Please login to view your orders", {
          toastId: "login-toast",
        });
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${BACKEND_URL}/api/order/myorder`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data.order || []);

      if ((data.order || []).length > 0) {
        toast.success("🎉 Your orders loaded successfully!", {
          toastId: "order-success",
        });
      } else {
        toast.info("ℹ️ No orders found", { toastId: "order-empty" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("❌ Failed to fetch orders", { toastId: "order-error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-700 via-green-500 to-green-600 bg-clip-text text-transparent mb-10">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  {getStatusIcon(order.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.image || "https://img.icons8.com/color/96/box.png"}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        Qty: {item.quantity} ×
                        <FaRupeeSign className="inline text-xs" />
                        {item.price}
                      </p>
                    </div>
                    <div className="font-bold text-green-700 flex items-center text-lg">
                      <FaRupeeSign className="inline" />{" "}
                      {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                <div className="text-xl font-extrabold bg-gradient-to-r from-green-700 to-green-500 text-transparent bg-clip-text flex items-center">
                  Total:
                  <FaRupeeSign className="ml-2 mr-1" /> {order.totalamount}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
