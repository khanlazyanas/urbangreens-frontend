import React, { useEffect, useState } from "react";
import { Home, BarChart, Package, Users, Bell, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await axios.get(`${BACKEND_URL}/api/admin/users`, { headers });
        setUsersCount(Array.isArray(usersRes.data.users) ? usersRes.data.users.length : 0);

        const ordersRes = await axios.get(`${BACKEND_URL}/api/admin/orders`, { headers });
        setOrdersCount(Array.isArray(ordersRes.data.orders) ? ordersRes.data.orders.length : 0);
        setRecentOrders(Array.isArray(ordersRes.data.orders) ? ordersRes.data.orders.slice(0, 5) : []);
      } catch (err) {
        console.error("Admin data fetch error:", err);
        toast.error(
          err.response?.status === 403
            ? "🚫 Access Denied: Only admin can view this page!"
            : "⚠️ Error fetching admin data",
          { position: "top-center", autoClose: 3000, toastId: "admin-error" }
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex">
      <ToastContainer />
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-white/60 backdrop-blur-xl border-r border-white/30 shadow-2xl flex flex-col px-6 py-6 rounded-r-3xl"
      >
        <h1 className="text-3xl font-extrabold text-green-700 mb-12 tracking-wide">
          AdminPanel
        </h1>
        <nav className="flex flex-col gap-3">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/admin/dashboard" />
          <SidebarItem icon={<Package size={20} />} label="Products" to="/admin/products" />
          <SidebarItem icon={<Users size={20} />} label="Users" to="/admin/users" />
          <SidebarItem icon={<BarChart size={20} />} label="Reports" to="/admin/reports" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" to="/admin/settings" />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col p-6"
      >
        <header className="flex justify-between items-center bg-white/70 backdrop-blur-xl shadow-md px-6 py-4 rounded-2xl mb-6">
          <div className="flex items-center bg-gray-100/70 rounded-xl px-3 py-2 w-1/3 transition hover:ring-2 hover:ring-green-400">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500 cursor-pointer hover:text-green-600 transition" />
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-full border-2 border-green-500"
              alt="avatar"
            />
          </div>
        </header>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wide">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Users" value={usersCount} />
          <StatCard title="Total Orders" value={ordersCount} />
          <StatCard title="Revenue" value="₹5.6 Cr" />
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100/70">
                    <th className="py-2 px-4 text-left font-medium">User</th>
                    <th className="py-2 px-4 text-left font-medium">Status</th>
                    <th className="py-2 px-4 text-left font-medium">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-green-50 transition">
                      <td className="py-2 px-4">{order.user?.name}</td>
                      <td className="py-2 px-4 font-semibold text-green-600">{order.status}</td>
                      <td className="py-2 px-4">{order.items?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent orders</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// SidebarItem with hover style
function SidebarItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium 
                 hover:bg-green-100 hover:text-green-700 transition"
    >
      {icon}
      {label}
    </Link>
  );
}

// StatCard with glass effect
function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-lg text-center"
    >
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-3xl font-extrabold text-gray-800 mt-2">{value}</p>
    </motion.div>
  );
}
