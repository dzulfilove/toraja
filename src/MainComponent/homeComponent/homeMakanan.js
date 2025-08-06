import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import paPiong from "../../assets/papiong.jpg";
import paTorro from "../../assets/patorro.jpeg";
import pantolloPammarasan from "../../assets/pantollo-pammarasan.jpg";
import deppaTesse from "../../assets/patorro.jpg";
import { Link } from "react-router-dom";
import { url } from "../../config/route";
import { stripHtml } from "../adminComponent/utils";

// Variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const HomeMakanan = ({ data }) => {
  const formatText = (text) => {
    const plainText = stripHtml(text);
    // Potong 15 karakter & tambahkan "......"
    const preview =
      plainText.length > 15 ? plainText.substring(0, 300) + "..." : plainText;

    return preview;
  };
  const duplicatedSlides = data.length < 5 ? [...data, ...data] : data;
  console.log(duplicatedSlides);

  return (
    <div className="w-full bg-white py-16 px-4 font-montserrat">
      <div className="container mx-auto mt-4 ">
        {/* Header */}
        <div className="flex px-6 justify-between items-center mb-8">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col justify-between items-start w-[50%]">
              <h2 className="text-5xl font-bold text-toraja-emas">
                Explore Kuliner Khas Toraja
              </h2>
              <p className="uppercase text-lg tracking-wider text-toraja-merah font-semibold">
                Kebudayaan
              </p>
            </div>
            <div className="w-[40%] flex justify-end items-end h-full">
              <Link
                to="/makanan"
                className="border-2 w-[15rem] font-bold text-toraja-merah border-toraja-merah py-4 px-4 inline-flex items-center hover:bg-toraja-merah hover:border-toraja-merah rounded-lg hover:text-toraja-putih transition"
              >
                Lihat Lebih Lanjut
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            navigation
            loop={true}
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides={true}
            className="w-full"
          >
            {duplicatedSlides.map((makanan) => (
              <SwiperSlide key={makanan.id}>
                {({ isActive }) => (
                  // <Link to={`/detail/makanan/${makanan.id}`}>
                    <motion.div
                      variants={textVariants}
                      className={`relative rounded-xl overflow-hidden transition-all duration-500 ${
                        isActive ? "h-[30rem]" : "h-[24rem] mt-8"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${makanan.images[0].image})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black/30"></div>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 right-0 p-6 text-white ${
                          isActive ? "bg-black/40" : "bg-black/20"
                        }`}
                      >
                        <h3
                          className={`font-bold ${
                            isActive ? "text-2xl" : "text-xl"
                          }`}
                        >
                          {makanan.title}
                        </h3>
                        {/* <p
                          className={`${
                            isActive ? "text-lg" : "text-sm"
                          } text-toraja-emas mb-2`}
                        >
                          {makanan.subtitle}
                        </p> */}
                        {isActive && (
                          <p className="text-sm">
                            {formatText(makanan.description)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  // </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeMakanan;
