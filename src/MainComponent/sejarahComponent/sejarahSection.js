import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/weaving.jpg";
import img2 from "../../assets/tongkonan.jpg";
import img3 from "../../assets/pagelu.jpeg";
import img4 from "../../assets/mountain.jpg";
import { sanitize } from "../adminComponent/utils";
import { url } from "../../config/route";

// Animasi container
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const SejarahSection = ({ data }) => {
  const images = data.img;
  console.log(images, "images");
  const isOdd = images.length % 2 !== 0;
  console.log(data, "sejarah");
  return (
    <div
      id="sejarah-section"
      className="w-full py-16 px-4 font-montserrat overflow-hidden"
    >
      {/* Header + Map */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto mb-12 flex flex-col md:flex-row md:justify-between  md:items-center"
      >
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-600 mb-2">
            Tana Toraja
          </p>
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4 max-w-xl leading-tight">
            Sejarah dan Asal Usul{" "}
            <span className="text-[#8B0000]">Tana Toraja</span>{" "}
          </h2>
          <p className="text-gray-700 max-w-2xl">
            Explore the rich cultural heritage of Tana Toraja, renowned for its
            unique funeral rites, ancestral houses called{" "}
            <span className="text-[#8B0000] font-semibold">Tongkonan</span>, and
            captivating arts that have stood the test of time.
          </p>
        </div>
        <div className="w-[30%] mt-8 md:mt-0">
          <motion.img
            src="https://res.cloudinary.com/diipdl14x/image/upload/v1751188894/zxaidrvzrs7qkljjzqtf.jpg"
            alt="Toraja Map"
            className="w-60 mx-auto md:mx-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Images grid */}
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

        {/* Text block */}
        <motion.div
          className="md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-montserrat font-semibold text-gray-900 mb-4">
            Sejarah <span className="text-[#8B0000]">Tana Toraja</span>
          </h3>

          <div
            className="text-gray-700 mb-4 leading-relaxed break-words max-w-full"
            dangerouslySetInnerHTML={{ __html: sanitize(data.desc) }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
};

export default SejarahSection;
