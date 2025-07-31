import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import filosofi from "../../assets/filosofi.jpg";
import asal from "../../assets/asal.jpg";
import sejarah from "../../assets/sejarah-slider.jpg";
import { Link } from "react-router-dom";
import { url } from "../../config/route";
import { stripHtml } from "../adminComponent/utils";

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

const SliderImage = ({ data, title }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatText = (text) => {
    const plainText = stripHtml(text);
    // Potong 15 karakter & tambahkan "......"
    const preview =
      plainText.length > 15 ? plainText.substring(0, 300) + "..." : plainText;

    return preview;
  };
  return (
    <div className="w-full py-16 px-4 font-montserrat relative">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/diipdl14x/image/upload/v1751214175/w3pnscgi3igm4fs5anvx.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/100 to-white/0" />
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
              className="flex flex-col justify-between items-start w-[100%]"
            >
              <h2 className="text-5xl font-bold text-toraja-emas">
                Tana Toraja Sulawesi Selatan
              </h2>
              <p className="uppercase text-lg tracking-wider text-toraja-merah font-semibold">
                Kebudayaan
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-[40%] flex justify-end items-end h-full"
            ></motion.div>
          </div>
        </motion.div>

        {/* Swiper for Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="px-4"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {data.map((content) => (
              <SwiperSlide key={content.id}>
                <Link to={`/detail/wisata/${content.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, height: 460 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ height: 520 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className="relative w-full cursor-pointer bg-cover bg-center group overflow-hidden shadow-lg rounded-xl"
                    style={{
                      backgroundImage: `url(${content.image})`,
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 p-6 w-full">
                      <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
                        {title}
                      </h2>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default SliderImage;
