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
const wisataToraja = [
  {
    id: "1",
    title: "Batu Tumonga",
    location: "Toraja",
    description:
      "Nikmati keindahan panorama alam Toraja dari ketinggian, serta saksikan situs-situs megalitikum yang tersebar di area ini.",
    image:
      "https://ketikmedia.com/wp-content/uploads/2023/12/Pesona-Alam-Objek-Wisata-Batutumonga-Toraja.jpg",
  },
  {
    id: "2",
    title: "Tugu Salib Toraja",
    location: "Toraja",
    description:
      "Monumen megah yang menjadi ikon religi dan menawarkan pemandangan spektakuler dari atas bukit.",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0a/50/05/70/tugu-salib-rantepao.jpg",
  },
  {
    id: "3",
    title: "Patung Yesus Buntu Burake",
    location: "Toraja",
    description:
      "Patung Yesus tertinggi di dunia, menawarkan pemandangan 360 derajat Kota Makale dan sekitarnya.",
    image:
      "https://res.cloudinary.com/diipdl14x/image/upload/v1751215693/y00ftsvfers4qo0drdym.jpg",
  },
  {
    id: "4",
    title: "Gumuk Pasir Toraja",
    location: "Toraja",
    description:
      "Fenomena alam unik berupa gundukan pasir di tengah perbukitan hijau, cocok untuk berswafoto dan menikmati suasana berbeda.",
    image:
      "https://cdn.digitaldesa.com/uploads/profil/73.18.33.2003/berita/5746f1417112f6554ec4340f18837d9f.jpg",
  },
  {
    id: "5",
    title: "Pango-Pango",
    location: "Toraja",
    description:
      "Destinasi agrowisata dengan hamparan kebun kopi dan teh, serta udara sejuk yang menyegarkan.",
    image:
      "https://theeditor.id/wp-content/uploads/2022/01/Agrowisata-Pango-Pango-Native-Indonesia.jpg.webp",
  },
  {
    id: "6",
    title: "Kolam Alam Tilangga",
    location: "Toraja",
    description:
      "Kolam alami dengan air jernih dan pemandangan asri, tempat ideal untuk berenang dan bersantai.",
    image:
      "https://makassarseo.com/wp-content/uploads/2024/10/wisata-tilanga-toraja.jpg",
  },
  {
    id: "7",
    title: "Talondo Tallu",
    location: "Toraja",
    description:
      "Area persawahan terasering yang memukau dengan latar belakang perbukitan, menawarkan pemandangan pedesaan yang menenangkan.",
    image:
      "https://assets.promediateknologi.id/crop/139x67:654x381/0x0/webp/photo/p3/93/2025/03/14/pesona-mistis-air-terjun-bercabang-tiga-talondo-tallu-yEirohx9xt-3883984654.jpg",
  },
];

const HomeWisata = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
            >
              <Link
                to="/wisata"
                className="border-2 w-[15rem] font-bold text-toraja-merah border-toraja-merah py-4 px-4 inline-flex items-center hover:bg-toraja-merah hover:border-toraja-merah rounded-lg hover:text-toraja-putih transition"
              >
                Lihat Lebih Lanjut
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
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
            {wisataToraja.map((content) => (
              <SwiperSlide key={content.id}>
                <Link to={`/detail/wisata/${content.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, height: 460 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ height: 520 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className="relative w-full cursor-pointer bg-cover bg-center group overflow-hidden shadow-lg rounded-xl"
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

export default HomeWisata;
