import React from "react";
import { Home, FileText, Users, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { FaMountainSun } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: <Home size={20} />, href: "/admin" },
    { label: "Sejarah", icon: <FileText size={20} />, href: "/admin/sejarah" },
    {
      label: "Makanan",
      icon: <MdEmojiFoodBeverage className="text-xl " />,
      href: "/admin/makanan",
    },
    {
      label: "Tarian",
      icon: <FaPeoplePulling className="text-xl " />,
      href: "/admin/tarian",
    },
    {
      label: "Wisata",
      icon: <FaMountainSun className="text-xl " />,
      href: "/admin/wisata",
    },
      {
      label: "Filosofi",
      icon: <FaMountainSun className="text-xl " />,
      href: "/admin/filosofi",
    },
    {
      label: "Pengaturan",
      icon: <Settings size={20} />,
      href: "/admin/settings",
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/`);
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-56 bg-[#8b0000] text-toraja-putih shadow-xl flex flex-col p-4 space-y-2">
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
        <button
          onClick={handleLogout}
          className="w-full py-2 px-3 rounded-xl bg-toraja-putih text-toraja-merah font-semibold hover:bg-toraja-merah hover:text-toraja-putih border hover:border-white transition-colors duration-300"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
