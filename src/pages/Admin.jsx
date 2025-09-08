import React from "react";
import {
  Home,
  BarChart,
  Package,
  Users,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col px-4 py-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-10">AdminPanel</h1>
        <nav className="flex flex-col gap-4">
          <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/admin/dashboard" />
          <SidebarItem icon={<Package size={20} />} label="Products" to="/admin/products" />
          <SidebarItem icon={<Users size={20} />} label="Users" to="/admin/users" />
          <SidebarItem icon={<BarChart size={20} />} label="Reports" to="/admin/reports" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" to="/admin/settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-1/3">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/100"
              className="w-8 h-8 rounded-full"
              alt="avatar"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Users" value="8,493" />
            <StatCard title="Total Orders" value="1,234" />
            <StatCard title="Revenue" value="₹5.6 Cr" />
          </div>

          {/* Placeholder Section */}
          <div className="mt-10">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
              <p className="text-gray-500 text-sm">Coming soon...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// SidebarItem using React Router Link
function SidebarItem({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-50 text-gray-700 transition"
    >
      {icon}
      {label}
    </Link>
  );
}

// Stat Card
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow text-center">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
