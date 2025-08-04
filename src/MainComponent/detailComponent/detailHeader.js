import React from "react";
import { motion } from "framer-motion";

const DetailHeader = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full h-64 md:h-80 flex items-center justify-center text-center text-white overflow-hidden"
  >
    {/* Background image pakai <img /> */}
    <img
      src={data.images?.[0]?.image || "https://via.placeholder.com/800x400?text=No+Image"}
      alt={data.title}
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>

    {/* Content */}
    <div className="relative z-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
      <p className="uppercase tracking-widest text-sm">{data.name_category}</p>
    </div>
  </motion.div>
);

export default DetailHeader;
