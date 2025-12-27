import React, { useEffect, useState } from "react";
import {
  Home,
  BarChart,
  Package,
  Users,
  Bell,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const usersRes = await axios.get(`${BACKEND_URL}/api/admin/users`, {
        headers,
      });
      setUsersCount(
        Array.isArray(usersRes.data.users) ? usersRes.data.users.length : 0
      );

      const ordersRes = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
        headers,
      });
      setOrdersCount(
        Array.isArray(ordersRes.data.orders)
          ? ordersRes.data.orders.length
          : 0
      );
      setRecentOrders(
        Array.isArray(ordersRes.data.orders)
          ? ordersRes.data.orders.slice(0, 5)
          : []
      );
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

  useEffect(() => {
    fetchData();
  }, []);

  /* -------- Update Order Status -------- */
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/admin/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ Order status updated!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to update order status");
    }
  };

  /* -------- Delete Order -------- */
  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Order deleted!");
      setRecentOrders((prev) => prev.filter((o) => o._id !== orderId));
      setOrdersCount((prev) => prev - 1);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to delete order");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-green-100">
      <ToastContainer />

      {/* ---- Sidebar for md+ ---- */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:flex-col w-60 bg-white/70 backdrop-blur-xl shadow-xl border-r border-white/40 p-6"
      >
        <h1 className="text-2xl font-extrabold text-green-700 mb-10">
          AdminPanel
        </h1>
        <nav className="flex flex-col gap-3">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            to="/admin/dashboard"
          />
          <SidebarItem
            icon={<Package size={20} />}
            label="Products"
            to="/admin/products"
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Users"
            to="/admin/users"
          />
          <SidebarItem
            icon={<BarChart size={20} />}
            label="Reports"
            to="/admin/reports"
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/admin/settings"
          />
        </nav>
      </motion.aside>

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex flex-col">
        {/* Topbar – always visible */}
        <header className="sticky top-0 z-20 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md px-4 md:px-6 py-3">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 flex-1 max-w-xs">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <Bell className="text-gray-500 cursor-pointer hover:text-green-600 transition" />
            <img
              src="https://i.pravatar.cc/100"
              className="w-9 h-9 rounded-full border-2 border-green-500"
              alt="avatar"
            />
          </div>
        </header>

        {/* Overview */}
        <main className="p-4 md:p-6 flex-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          {/* Stats grid auto-fit */}
          <div className="grid gap-4 md:gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] mb-8">
            <StatCard title="Total Users" value={usersCount} />
            <StatCard title="Total Orders" value={ordersCount} />
            <StatCard title="Revenue" value="₹5.6 Cr" />
          </div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
              Recent Orders
            </h3>

            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-[750px] w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100/70">
                      <th className="py-2 px-4 text-left font-medium">User</th>
                      <th className="py-2 px-4 text-left font-medium">Status</th>
                      <th className="py-2 px-4 text-left font-medium">Items</th>
                      <th className="py-2 px-4 text-left font-medium">Address</th>
                      <th className="py-2 px-4 text-left font-medium">Phone</th>
                      <th className="py-2 px-4 text-left font-medium">Email</th>
                      <th className="py-2 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-green-50 transition"
                      >
                        <td className="py-2 px-4">{order.user?.name}</td>
                        <td className="py-2 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            {["Pending", "Paid", "Shipped", "Delivered"].map(
                              (s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="py-2 px-4">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 mb-1"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 rounded"
                              />
                              <span>
                                {item.name} ×{item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-2 px-4">{order.address}</td>
                        <td className="py-2 px-4">{order.phoneNumber}</td>
                        <td className="py-2 px-4">{order.email}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent orders</p>
            )}
          </motion.div>
        </main>
      </div>

      {/* Bottom nav for mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md shadow-t flex justify-around py-2 border-t border-gray-200">
        <MobileNavItem icon={<Home size={20} />} to="/admin/dashboard" />
        <MobileNavItem icon={<Package size={20} />} to="/admin/products" />
        <MobileNavItem icon={<Users size={20} />} to="/admin/users" />
        <MobileNavItem icon={<BarChart size={20} />} to="/admin/reports" />
        <MobileNavItem icon={<Settings size={20} />} to="/admin/settings" />
      </nav>
    </div>
  );
}

/* ---------- Small components ---------- */
function SidebarItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-100 hover:text-green-700 transition"
    >
      {icon} {label}
    </Link>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-md text-center"
    >
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-3xl font-extrabold text-gray-800 mt-2">{value}</p>
    </motion.div>
  );
}

function MobileNavItem({ icon, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center text-gray-600 hover:text-green-700 transition text-xs"
    >
      {icon}
    </Link>
  );
}
