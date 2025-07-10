import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardAdmin = ({ id, title, description, image, category, topic }) => {
  console.log(id, "image");
  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, height: 320 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ height: 420 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="relative w-[16.5rem] cursor-pointer bg-cover bg-center group overflow-hidden shadow-lg rounded-xl"
        style={{
          backgroundImage: `url(http://localhost:5000/${image[0].image})`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 p-6 w-full">
          <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
            {title}
          </h2>
          <p className="text-sm text-toraja-putih">{}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CardAdmin;
