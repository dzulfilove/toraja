import React from "react";
import back from "../../assets/well.png";
import { motion } from "framer-motion";

const DashboardComponent = () => {
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
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:p-16 bg-white rounded-lg font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="md:w-1/2 space-y-4">
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-toraja-merah"
        >
          SELAMAT DATANG
        </motion.h1>
        <h2 className="text-xl text-yellow-500">USER ADMIN</h2>
        <p className="text-gray-500">
          Manajemen Data Website Budaya Daerah Suku Toraja Sulawesi Selatan
        </p>
      </motion.div>

      {/* Right Side */}
      <motion.div
        variants={itemVariants}
        className="md:w-1/2 md:mt-0 flex items-center justify-center relative"
      >
        {/* Background shapes bisa ditambah pakai div absolute jika mau */}
        <div className="w-[45rem] h-[30rem] rounded-lg overflow-hidden">
          <img
            src={back} // Ganti dengan path gambar sesuai project Anda
            alt="Welcome Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardComponent;
