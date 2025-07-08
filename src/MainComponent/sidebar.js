import React from "react";
import { Home, FileText, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: <Home size={20} />, href: "/admin" },
    { label: "Sejarah", icon: <FileText size={20} />, href: "/admin/history" },
    { label: "Pengguna", icon: <Users size={20} />, href: "/admin/users" },
    {
      label: "Pengaturan",
      icon: <Settings size={20} />,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-56 bg-gradient-to-b from-toraja-merah to-toraja-emas text-toraja-putih shadow-xl flex flex-col p-4 space-y-2">
      <div className="mb-6 text-center font-bold text-xl tracking-wide">
        Admin Panel
      </div>
      {menuItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={item.href}
            className="flex items-center space-x-3 py-2 px-3 rounded-xl hover:bg-toraja-putih hover:text-toraja-merah transition-colors duration-300"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        </motion.div>
      ))}
      <div className="flex-grow"></div>{" "}
      {/* biar menu di atas, space kosong di bawah */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <button className="w-full py-2 px-3 rounded-xl bg-toraja-putih text-toraja-merah font-semibold hover:bg-toraja-emas hover:text-toraja-putih transition-colors duration-300">
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
