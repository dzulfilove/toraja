import React from "react";
import { motion } from "framer-motion";
import back from "../../assets/hero.png";

const HeroWithImage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-montserrat">
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={back}
          alt="Tana Toraja Landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/0"></div>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-full flex flex-col justify-end items-center text-center px-4"
      >
        <h1 className="text-white text-4xl md:text-5xl font-medium mb-6">
          Selamat Datang di Website Kebudayaan Tana Toraja
        </h1>
        <p className="text-white text-xl md:text-2xl font-medium max-w-2xl mb-32">
          Jelajahi kekayaan budaya dan keindahan alam Tana Toraja
        </p>
      </motion.div>
    </div>
  );
};

export default HeroWithImage;
