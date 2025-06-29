import React from "react";
import { motion } from "framer-motion";

const HeaderList = ({ title,image }) => {
  return (
    <div className="relative w-full h-[25rem] overflow-hidden font-montserrat">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Overlay gradient: hitam → transparan */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

      {/* Konten di atas overlay */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row justify-between w-full h-full text-toraja-putih items-center"
      >
        <div className="flex items-center w-full justify-center">
          <div className="h-1 w-96 bg-toraja-merah mr-4"></div>
          <h2 className="text-6xl md:text-5xl font-semibold text-toraja-putih uppercase tracking-wide">
            {title}
          </h2>
          <div className="h-1 w-96 bg-toraja-merah ml-4"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeaderList;
