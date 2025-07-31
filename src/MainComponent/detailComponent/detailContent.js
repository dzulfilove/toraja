// components/DetailContent.js
import React from "react";
import { motion } from "framer-motion";
import { url } from "../../config/route";
import { sanitize } from "../adminComponent/utils";

const DetailContent = ({ data }) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto my-8 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
        {/* Background blur */}
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-md scale-100"
          style={{ backgroundImage: `url(${data.images[0].image})` }}
        ></div>

        {/* Gambar asli */}
        <img
          src={`${data.images[0].image}`}
          alt={data.title}
          className="relative z-10 w-auto h-full mx-auto object-contain"
        />
      </div>
      <h2 className="text-3xl font-semibold mb-4 mt-8 text-toraja-merah">
        {data.title}
      </h2>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: sanitize(data.description) }}
      ></div>

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
