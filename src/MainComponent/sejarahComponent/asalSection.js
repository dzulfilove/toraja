import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/pelaut ulung.jpg";
import img2 from "../../assets/filosofi.jpg";

const AsalSection = () => {
  return (
    <div id="asal-section" className="w-full pb-16 px-4 font-montserrat overflow-hidden">
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
          <p className="text-gray-700 mb-4 leading-relaxed">
            Asal-usul masyarakat Toraja, yang bersemayam di dataran tinggi
            Sulawesi Selatan, sangat kaya akan perpaduan antara{" "}
            <span className="font-semibold text-[#8B0000]">
              mitos penciptaan dan tradisi lisan
            </span>{" "}
            yang diwariskan dari generasi ke generasi. Menurut kepercayaan
            paling dominan, nenek moyang orang Toraja bukanlah penduduk asli,
            melainkan para{" "}
            <span className="font-semibold text-[#8B0000]">pelaut ulung</span>{" "}
            yang berlayar dari{" "}
            <span className="font-semibold text-[#8B0000]">
              wilayah Indocina atau Asia Tenggara daratan.
            </span>{" "}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Salah satu narasi inti dalam kosmologi Toraja adalah cerita tentang
            <span className="font-semibold text-[#8B0000]">
              "To Manurung" atau "orang yang turun dari langit"
            </span>{" "}
            . Sosok ini dipercaya sebagai leluhur ilahi yang membawa
            pengetahuan, tatanan sosial, hukum adat (Aluk Todolo), dan
            keterampilan penting kepada manusia. Kehadiran To Manurung menandai
            dimulainya peradaban Toraja, mengajarkan mereka cara hidup yang
            selaras dengan alam dan alam gaib. Kisah-kisah ini tidak hanya
            berfungsi sebagai catatan historis, tetapi juga sebagai panduan
            moral dan spiritual, menjelaskan hierarki sosial, sistem kekerabatan
            yang kuat, dan praktik-praktik ritual yang menjadi tulang punggung
            budaya Toraja hingga saat ini.
          </p>
        </motion.div>

        {/* Images di kanan, sejajar kanan-kiri */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={img1}
            alt="Weaving"
            className="rounded-md object-cover h-[25rem] w-full shadow-md"
          />
          <img
            src={img2}
            alt="Tongkonan"
            className="rounded-md object-cover h-[25rem] w-full shadow-md"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AsalSection;
