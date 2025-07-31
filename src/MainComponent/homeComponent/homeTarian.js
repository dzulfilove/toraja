import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import pagelu from "../../assets/pagelu.jpeg";
import manimbong from "../../assets/manimbong.jpg";
import manganda from "../../assets/Manganda.jpg";
import madandan from "../../assets/madandan.jpg";
import lambu from "../../assets/lambu.jpg";
import { Link } from "react-router-dom";
import { url } from "../../config/route";
import { stripHtml } from "../adminComponent/utils";

const HomeTarian = ({ data }) => {
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
    <div className="mx-auto px-10 py-12 bg-white font-montserrat">
      <div className="flex flex-col justify-between items-center mb-8 mt-6 gap-8">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col justify-between items-start w-[50%]">
            <h2 className="text-5xl font-bold text-toraja-emas mt-3">
              Tarian Tradisional Suku Toraja
            </h2>
            <p className="uppercase text-lg tracking-wider text-toraja-merah font-semibold">
              Kebudayaan
            </p>
          </div>
          <div className="w-[40%] flex justify-end items-end h-full">
            <Link
              to="/tarian"
              className="border-2 w-[15rem] font-bold text-toraja-merah border-toraja-merah py-4 px-4 inline-flex items-center hover:bg-toraja-merah hover:border-toraja-merah rounded-lg hover:text-toraja-putih transition"
            >
              Lihat Lebih Lanjut
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
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
            1280: {
              slidesPerView: 4,
            },
          }}
          className="w-full"
        >
          {duplicatedSlides.map((tarian) => (
            <SwiperSlide key={tarian.id}>
              <Link to={`/detail/tarian/${tarian.id}`}>
                <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg group hover:cursor-pointer">
                  {/* Gambar dengan efek zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${tarian.images[0].image})`,
                    }}
                  ></div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Konten card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-toraja-merah rounded-full text-xs font-semibold">
                        {tarian.name_category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tarian.title}</h3>
                    <p className="text-sm mb-4">
                      {formatText(tarian.description)}
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeTarian;
