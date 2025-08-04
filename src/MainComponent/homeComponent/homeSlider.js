import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import loginBg from "../../assets/login.jpg";
import sejarah from "../../assets/sejarah-slider.jpg";
import asal from "../../assets/asal.jpg";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { sanitize, stripHtml } from "../adminComponent/utils";


import filosofi from "../../assets/filosofi.jpg";

const HomeSlider = ({ slides }) => {
  // Hilangkan tag HTML → ambil plain text

  const formatText = (text) => {
    const plainText = stripHtml(text);
    // Potong 15 karakter & tambahkan "......"
    const preview =
      plainText.length > 15 ? plainText.substring(0, 300) + "..." : plainText;

    return preview;
  };

  const duplicatedSlides = slides.length < 4 ? [...slides, ...slides] : slides;
  console.log(duplicatedSlides);
  return (
    <div className="relative w-full h-screen overflow-hidden font-montserrat">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>

      {/* Overlay hitam dengan opacity 20% */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Konten di atas overlay */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row justify-between w-full h-full text-toraja-putih"
      >
        {/* Left: Text */}
        <div className="md:w-1/2 flex flex-col justify-center p-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <h4 className="uppercase tracking-widest text-toraja-putih mb-2">
            Spotlight
          </h4>
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-toraja-emas">
            Warisan Budaya Toraja
          </h1>
          <p className="mb-6 text-toraja-putih">
            Menyelami kekayaan sejarah, asal usul, dan filosofi hidup suku
            Toraja yang diwariskan turun-temurun, mencerminkan harmoni antara
            manusia dan alam.
          </p>
          <Link
            to={"/sejarah"}
            className="border w-[15rem] text-toraja-putih border-toraja-putih py-2 px-4 inline-flex items-center hover:bg-toraja-merah hover:border-toraja-merah rounded-lg hover:text-toraja-putih transition"
          >
            Pelajari Lebih Lanjut
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Right: Slider */}
        <div className="md:w-1/2 flex items-center mr-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={2}
            spaceBetween={20}
            loopedSlides={2} // Diubah menjadi 2
            loopFillGroupWithBlank={true} // Ditambahkan
            centeredSlides={false}
            className="w-full"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative w-[370px] h-[620px] bg-cover bg-center group hover:cursor-pointer shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-500"
                  style={{ backgroundImage: `url(${slide.img})` }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

                  {/* Konten */}
                  <div className="absolute bottom-0 p-6">
                    <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-toraja-putih">
                      {formatText(slide.desc)}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeSlider;
