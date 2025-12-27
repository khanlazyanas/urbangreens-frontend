import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../main.jsx";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MyProfile() {
  const { user, logoutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] font-roboto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">You are not logged in</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BACKEND_URL}/api/user/update`,
        { name, email },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("token")) {
        await axios.post(
          `${BACKEND_URL}/api/logout`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }
      logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Try again!");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-roboto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center"
      >
        My Profile
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/50 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {user.name[0].toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          {user.role && (
            <span className="mt-2 inline-block bg-green-100/30 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
              Role: {user.role}
            </span>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-4 w-full">
            <Link
              to="/my-orders"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition text-center"
            >
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Editable Profile */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8 flex flex-col gap-6 hover:shadow-2xl transition-all"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition bg-white/70"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition bg-white/70"
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
