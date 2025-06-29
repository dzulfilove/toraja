import React from "react";
import { motion } from "framer-motion";

const DetailGallery = ({ images }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="container mx-auto px-4 py-8"
  >
    <h2 className="text-2xl font-semibold mb-4 text-center text-toraja-merah">
      Galeri
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <motion.img
          key={idx}
          src={src}
          alt={`Gallery ${idx + 1}`}
          whileHover={{ scale: 1.05 }}
          className="rounded-lg shadow transition-transform duration-300"
        />
      ))}
    </div>
  </motion.div>
);

export default DetailGallery;
