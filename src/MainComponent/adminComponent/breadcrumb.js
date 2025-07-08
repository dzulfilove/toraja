import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // pastikan sudah install lucide-react
import { motion } from "framer-motion";

const Breadcrumb = ({ items }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center text-sm text-gray-600 mb-4 bg-white rounded-lg p-4"
      aria-label="Breadcrumb"
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          {idx !== 0 && (
            <ChevronRight size={16} className="mx-2 text-gray-400" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-toraja-merah transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
};

export default Breadcrumb;
