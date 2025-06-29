import React from "react";
import { motion } from "framer-motion";
import mapImage from "https://res.cloudinary.com/diipdl14x/image/upload/v1751188897/j4iqyoswwezcuffznhkh.jpg"; // pastikan path sesuai

const MapSection = () => {
  return (
    <div className="bg-[#FDFEFE] p-4 flex flex-col items-center ">
      {/* Judul dengan animasi */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center mb-8 mt-16"
      >
        <div className="h-1 w-72 bg-red-700 mr-4"></div>
        <h2 className="text-3xl md:text-4xl font-semibold text-yellow-700 uppercase tracking-wide">
          Sulawesi Selatan
        </h2>
        <div className="h-1 w-72 bg-red-700 ml-4"></div>
      </motion.div>

      {/* Gambar peta dengan shadow */}
      <motion.img
        src={mapImage}
        alt="Peta Sulawesi Selatan"
        className="max-w-full w-[900px] h-[400px] rounded"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Deskripsi */}
      <motion.p
        className="mt-6 text-center text-toraja-cokelat max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Provinsi Sulawesi Selatan merupakan rumah bagi suku Toraja yang kaya
        akan tradisi, sejarah, dan budaya unik yang telah diwariskan secara
        turun-temurun.
      </motion.p>
    </div>
  );
};

export default MapSection;
