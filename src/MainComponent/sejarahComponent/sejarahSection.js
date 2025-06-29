import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/weaving.jpg";
import img2 from "../../assets/tongkonan.jpg";
import img3 from "../../assets/pagelu.jpeg";
import img4 from "../../assets/mountain.jpg";
import map from "../../assets/map-toraja.jpg";

// Animasi container
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const SejarahSection = () => {
  return (
    <div id="sejarah-section" className="w-full py-16 px-4 font-montserrat overflow-hidden">
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
            src={map}
            alt="Toraja Map"
            className="w-60 mx-auto md:mx-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Grid gambar + teks */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Images grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={img1}
            alt="Weaving"
            className="rounded-md object-cover h-64 w-full shadow-md"
          />
          <img
            src={img2}
            alt="Tongkonan"
            className="rounded-md object-cover h-64 w-full shadow-md"
          />
          <img
            src={img3}
            alt="Warrior"
            className="rounded-md object-cover h-64 w-full shadow-md"
          />
          <img
            src={img4}
            alt="Mountain"
            className="rounded-md object-cover h-64 w-full shadow-md"
          />
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
          <p className="text-gray-700 mb-4 leading-relaxed">
            Sejarah Toraja, terutama sebelum kedatangan pengaruh eksternal yang
            signifikan, berpusat pada perkembangan komunitas adat yang mandiri
            dan terstruktur. Inti dari kehidupan sosial dan politik mereka
            adalah{" "}
            <span className="font-semibold text-[#8B0000]">"tongkonan"</span> ,
            yaitu rumah adat tradisional yang tidak hanya berfungsi sebagai
            tempat tinggal fisik tetapi juga sebagai pusat silsilah keluarga,
            kepemilikan harta benda, dan pelaksanaan ritual. Setiap tongkonan
            memiliki otoritas dan wilayah kekuasaan tertentu, dan jaringan
            tongkonan ini membentuk tatanan masyarakat Toraja yang kompleks.
            Meskipun secara geografis terisolasi di pegunungan, Toraja tidak
            sepenuhnya terputus dari dunia luar. Mereka terlibat dalam
            perdagangan terbatas dengan kerajaan-kerajaan dataran rendah seperti
            Luwu dan Bone, menukar hasil bumi dengan garam, besi, atau barang
            mewah lainnya, meskipun interaksi ini sering kali juga diwarnai
            dengan konflik atau serangan.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Perubahan signifikan dalam sejarah Toraja dimulai pada abad ke-17
            dengan ekspansi pengaruh Belanda di Nusantara. Namun, karena letak
            geografisnya yang sulit dijangkau, Toraja baru sepenuhnya berada di
            bawah administrasi kolonial Hindia Belanda secara efektif pada awal
            abad ke-20, setelah serangkaian ekspedisi militer yang dikenal
            sebagai "Pasifikasi Toraja". Periode kolonial ini membawa dampak
            mendalam, terutama dengan masuknya{" "}
            <span className="font-semibold text-[#8B0000]">
              misionaris Kristen
            </span>{" "}
            . Mayoritas masyarakat Toraja saat ini memeluk agama Kristen, namun
            uniknya, praktik-praktik kepercayaan animisme leluhur mereka,{" "}
            <span className="font-semibold text-[#8B0000]">Aluk Todolo</span> ,
            tetap dipertahankan dan diintegrasikan dengan keyakinan baru,
            terutama dalam upacara adat seperti pemakaman (rambu solo').
            Integrasi ini membentuk identitas budaya Toraja yang unik, yang
            dikenal dunia karena warisan arsitektur megah dan ritual pemakaman
            yang rumit dan penuh warna. stand out, reflecting deep respect for
            ancestors. The iconic{" "}
          </p>

          {/* CTA Button
          <button className="self-start bg-[#8B0000] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a00d0d] transition-colors duration-300 shadow-md">
            Explore More
          </button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default SejarahSection;
