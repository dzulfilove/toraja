import React from "react";
import "../../styles/filosofiCard.css";

import { motion } from "framer-motion";
import { sanitize } from "../adminComponent/utils";
import { Link } from "react-router-dom";

const ListFilosofi = ({ data }) => {
  return (
    <div
      id="filosofi-section"
      className="relative w-full py-16 px-4 font-montserrat overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/diipdl14x/image/upload/v1751188919/yzpayn5exorb3qrqcdjl.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 font-semi">
        <div className="text-start mb-12 ml-10">
          <h2 className="text-4xl md:text-5xl font-bold text-toraja-putih mb-2">
            Filosofi Suku Toraja
          </h2>
          <p className="uppercase text-lg tracking-widest text-toraja-kuning font-semibold">
            Warisan Nilai & Budaya
          </p>
          <div className="w-full border border-toraja-emas mt-6"></div>
        </div>

        {/* Cards grid */}
        <div className="flex flex-wrap justify-center">
          {data.map((item, index) => (
            <Link to={`/detail/philosophy/${item.id}`}>
              <motion.div
                key={item.id || index} // pakai key unik, idealnya pakai item.id
                className="card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="card-title">{item.title}</p>
                <div
                  className="small-desc"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(
                      item.description.substring(0, 100) + "......"
                    ),
                  }}
                ></div>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFilosofi;
