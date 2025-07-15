import React from "react";
import { motion } from "framer-motion";
import filosofi from "../../assets/filosofi.jpg";
import asal from "../../assets/asal.jpg";
import sejarah from "../../assets/sejarah-slider.jpg";

// Variants untuk container animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Data content khas Toraja
const contentToraja = [
  {
    id: "sejarah-section",
    title: "Sejarah Suku Toraja",
    location: "Toraja",
    description: "Sejarah Terbentuknya Suku Toraja",
    image: sejarah,
  },
  {
    id: "asal-section",
    title: "Asal Usul Suku Toraja",
    location: "Toraja",
    description: "Asal Usul Kebudayaan Suku Toraja",
    image: asal,
  },
  {
    id: "filosofi-section",
    title: "Filosofi Suku Toraja",
    location: "Toraja",
    description: "Berbagai Filosofi Hidup Para Masyarakat Suku Toraja",
    image: filosofi,
  },
];

const ListSejarah = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="w-full py-16 px-4 font-montserrat relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/diipdl14x/image/upload/v1751188919/yzpayn5exorb3qrqcdjl.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-white opacity-90" />
      </div>

      {/* Content */}

      <div className="container mx-auto mt-4 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex px-6 justify-between items-center mb-12"
        >
          <div className="flex justify-between w-full items-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-between items-center w-[100%]"
            >
              <h2 className="text-5xl font-bold text-gray-900">
                Tana Toraja Sulawesi Selatan
              </h2>
              <p className="uppercase text-lg tracking-wider text-toraja-merah font-semibold">
                Kebudayaan
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex justify-center gap-8 px-4"
        >
          {contentToraja.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30, height: 480 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ height: 540 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="relative w-[470px] cursor-pointer bg-cover bg-center group overflow-hidden shadow-lg rounded-xl"
              style={{ backgroundImage: `url(${content.image})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-6 w-full">
                <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
                  {content.title}
                </h2>
                <p className="text-sm text-toraja-putih">
                  {content.description}
                </p>
                <button
                  onClick={() => scrollToSection(content.id)}
                  className="border-2 w-full mt-6 font-bold text-toraja-putih border-toraja-putih py-4 px-4 inline-flex items-center hover:bg-toraja-merah hover:border-toraja-merah rounded-lg hover:text-toraja-putih transition"
                >
                  Lihat Lebih Lanjut
                  <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ListSejarah;
