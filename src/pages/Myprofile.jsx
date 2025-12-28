import React, { useContext, useState, useEffect } from "react";
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
  const [profileImage, setProfileImage] = useState(null);

  /* Load saved profile image */
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] font-roboto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            You are not logged in
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  /* Handle image upload */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
      toast.success("Profile image updated");
    };
    reader.readAsDataURL(file);
  };

  /* Update name/email */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BACKEND_URL}/api/user/update`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* Logout */
  const handleLogout = async () => {
    try {
      if (localStorage.getItem("token")) {
        await axios.post(
          `${BACKEND_URL}/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      logoutUser();
      navigate("/");
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed");
    }
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
        {/* SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-xl"
        >
          {/* PROFILE IMAGE */}
          <div className="relative w-28 h-28 mb-4">
            <img
              src={
                profileImage ||
                "https://ui-avatars.com/api/?name=User&background=22c55e&color=fff"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-400 shadow-lg"
            />

            <label className="absolute bottom-1 right-1 bg-green-500 text-white p-2 rounded-full cursor-pointer shadow hover:bg-green-600 transition">
              ✎
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>

          {user.role && (
            <span className="mt-2 bg-green-100/40 text-green-900 px-3 py-1 rounded-full text-sm">
              Role: {user.role}
            </span>
          )}

          <div className="mt-6 flex flex-col gap-4 w-full">
            <Link
              to="/my-orders"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* EDIT PROFILE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Edit Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
