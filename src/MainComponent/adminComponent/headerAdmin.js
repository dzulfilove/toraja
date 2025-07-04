import React from "react";
import { motion } from "framer-motion";

const HeaderAdmin = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full h-16 flex items-center bg-toraja-merah justify-start px-8 text-center overflow-hidden rounded-3xl font-montserrat"
  >
    <h1 className="text-xl md:text-xl font-bold mb-2 text-toraja-putih">
      {title}
    </h1>
    {/* <p className="uppercase tracking-widest text-sm">{data.category}</p> */}
  </motion.div>
);

export default HeaderAdmin;
