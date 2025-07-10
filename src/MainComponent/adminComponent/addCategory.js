import React, { useState, useEffect } from "react";
import "../../styles/button.css";

import { motion } from "framer-motion";

import { FaRegSave } from "react-icons/fa";
const revokeIfBlob = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

const AddCategory = ({ addItem }) => {
  const [title, setTitle] = useState("");

  // Variants untuk animasi container dan children
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15, // delay antar children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleSave = async () => {
    await addItem(title);
    setTitle("");
  };
  return (
    <motion.div
      className="p-8 w-full mt-6 mx-auto bg-white rounded-3xl shadow-lg space-y-4 font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-xl text-toraja-merah font-bold mb-2">
          Tambah Data Kategori
        </h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Judul</label>
        <div className="relative w-full group mt-4">
          <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70"></span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="w-full py-4 flex justify-start items-start">
          <button
            onClick={handleSave}
            className="w-full font-sans flex justify-center gap-2 items-center mx-auto text-sm text-gray-50 bg-toraja-merah backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-toraja-merah before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-12 py-2 overflow-hidden border-2 rounded-full group"
            type="submit"
          >
            Simpan Data
            <FaRegSave className="w-8 h-8 text-toraja-merah justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50  ease-linear duration-300 rounded-full border border-toraja-merah group-hover:border-toraja-merah p-2" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddCategory;
