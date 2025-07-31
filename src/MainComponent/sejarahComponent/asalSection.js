import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/pelaut ulung.jpg";
import img2 from "../../assets/filosofi.jpg";
import { sanitize } from "../adminComponent/utils";
import { url } from "../../config/route";

const AsalSection = ({ data }) => {
  const images = data.img;
  console.log(images, "images");
  const isOdd = images.length % 2 !== 0;
  console.log(data, "sejarah");
  return (
    <div
      id="asal-section"
      className="w-full pb-16 px-4 font-montserrat overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Text block di kiri */}
        <motion.div
          className="md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-montserrat font-semibold text-gray-900 mb-4">
            Asal Usul <span className="text-[#8B0000]">Tana Toraja</span>
          </h3>
          <div
            className="text-gray-700 mb-4 leading-relaxed break-words max-w-full"
            dangerouslySetInnerHTML={{ __html: sanitize(data.desc) }}
          ></div>
        </motion.div>

        {/* Images di kanan, sejajar kanan-kiri */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-1/2 h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {images.slice(0, images.length - (isOdd ? 1 : 0)).map((item, idx) => (
            <img
              key={idx}
              src={`${item.image}`}
              alt={item.id}
              className="rounded-md object-cover h-full w-full shadow-md"
            />
          ))}

          {isOdd && (
            <div className="relative col-span-2 md:col-span-2 h-64 rounded-md overflow-hidden shadow-md">
              {/* background blur */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${images[images.length - 1].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(8px) brightness(0.7)",
                }}
              ></div>

              {/* gambar aslinya */}
              <div className="relative flex justify-center items-center h-full">
                <img
                  src={`${images[images.length - 1].image}`}
                  alt={images[images.length - 1].id}
                  className="h-full w-auto rounded-md shadow-md"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AsalSection;
