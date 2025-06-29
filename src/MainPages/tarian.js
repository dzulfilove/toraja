import React from "react";

import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";

import ListCard from "../MainComponent/listComponent/listCard";
import pagelu from "../assets/pagelu.jpeg";
import manimbong from "../assets/manimbong.jpg";
import manganda from "../assets/Manganda.jpg";
import madandan from "../assets/madandan.jpg";
import lambu from "../assets/lambu.jpg";

const tarianToraja = [
  {
    id: 1,
    title: "Tari Pa'gellu' (Ma'gellu')",
    description:
      "Tarian riang gembira yang dibawakan oleh remaja putri dengan gerakan gemulai, diiringi musik gendang. Sering ditampilkan dalam acara pernikahan, penyambutan tamu, atau pesta panen.",
    category: "Tarian Sukacita",
    image: pagelu,
  },
  {
    id: 2,
    title: "Tari Manimbong",
    description:
      "Tarian khusus untuk upacara Rambu Tuka' oleh penari laki-laki dengan pakaian adat lengkap, tameng bundar kecil, dan parang tua. Mengungkapkan rasa syukur kepada Tuhan.",
    category: "Tarian Ritual",
    image: manimbong,
  },
  {
    id: 3,
    title: "Tari Ma'dandan",
    description:
      "Dibawakan oleh penari perempuan dengan kostum putih dan penutup kepala menyerupai Tongkonan. Gemulai dengan tongkat dan nyanyian, sering dipentaskan dengan Tari Manimbong.",
    category: "Tarian Ritual",
    image: madandan,
  },
  {
    id: 4,
    title: "Tari Pa'pondesan",
    description:
      "Tarian laki-laki dengan properti kuku palsu dan diiringi seruling. Merupakan bagian dari ekspresi budaya Toraja.",
    category: "Tarian Tradisional",
    image: lambu,
  },
  {
    id: 5,
    title: "Tari Manganda'",
    description:
      "Tarian ritual pemujaan Aluk Todolo dengan hiasan tanduk kerbau di kepala, uang logam, dan lonceng. Dibawakan sambil berteriak.",
    category: "Tarian Ritual",
    image: manganda,
  },
  {
    id: 6,
    title: "Tari Pa' Bone Balla'",
    description:
      "Mirip dengan Pa'gellu' namun dengan lagu dan ritme gendang yang berbeda. Juga termasuk tarian sukacita.",
    category: "Tarian Sukacita",
    image: manimbong,
  },
  {
    id: 7,
    title: "Tari Pa' Lambu' Pare",
    description:
      "Tarian untuk upacara Rambu Tuka' yang memiliki makna spiritual dalam budaya Toraja.",
    category: "Tarian Ritual",
    image: lambu,
  },
];
const categories = ["All", "Tarian Ritual", "Tarian Sukacita"];
const desc =
  "Tarian adat Toraja tidak hanya sekadar pertunjukan seni, tetapi juga medium penting untuk mengekspresikan nilai-nilai budaya, kepercayaan spiritual, dan struktur sosial masyarakat Toraja. Sebagian besar tarian ini terkait erat dengan siklus kehidupan, terutama upacara kematian Rambu Solo' dan upacara syukuran Rambu Tuka'. Gerakan-gerakan dalam tarian seringkali simbolis, mencerminkan perjalanan arwah, kegembiraan, atau kesedihan.";
const TarianPage = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <HeaderList
        title="Tarian Khas Toraja"
        image={
          "https://i.pinimg.com/1200x/9d/5c/26/9d5c26608b1364bbb47ae4761f6f3a55.jpg"
        }
      />
      <ListCard
        topic={"tarian"}
        data={tarianToraja}
        categories={categories}
        title={"Tarian Tradisional Khas Toraja"}
        description={desc}
        image={
          "https://i.pinimg.com/1200x/11/ce/30/11ce30ac14196a6aa5c4312016583cca.jpg"
        }
      />

      <Footer />
      {/* </div> */}
    </div>
  );
};
export default TarianPage;
