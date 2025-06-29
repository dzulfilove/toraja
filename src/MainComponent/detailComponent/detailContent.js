// components/DetailContent.js
import React from "react";
import { motion } from "framer-motion";

const DetailContent = ({ data }) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto my-8 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={data.image}
        alt={data.title}
        className="rounded-lg shadow mb-6 w-full object-cover h-64 md:h-80"
      />
      <h2 className="text-3xl font-semibold mb-4 text-toraja-merah">{data.title}</h2>
      <p className="text-gray-700 leading-relaxed">{data.description}</p>

      {/* Galeri gambar tambahan */}
      {/* {data.image.length > 1 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.images.slice(1).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${data.title} ${idx + 2}`}
              className="rounded-lg object-cover h-40 w-full"
            />
          ))}
        </div>
      )} */}
    </motion.div>
  );
};

export default DetailContent;
