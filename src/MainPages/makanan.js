import React from "react";

import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";

import ListCard from "../MainComponent/listComponent/listCard";

// Import gambar untuk makanan khas Toraja
import paPiong from "../assets/papiong.jpg";
import pantolloPamarrasan from "../assets/pantollo-pammarasan.jpg";
import deataJemba from "../assets/patorro.jpeg";
import uttuKesu from "../assets/piang.jpg";
import baje from "../assets/papiong.jpg";

const makananToraja = [
  {
    id: 1,
    title: "Pa'piong",
    description:
      "Hidangan khas Toraja berupa daging (babi, ayam, atau ikan) yang dimasak bersama bumbu dan sayuran dalam bambu, lalu dibakar. Memberikan aroma dan rasa yang unik.",
    category: "Hidangan Utama",
    image: paPiong,
  },
  {
    id: 2,
    title: "Pantollo' Pamarrasan",
    description:
      "Masakan berkuah hitam khas Toraja yang menggunakan 'Pamarrasan' (kluwek) sebagai bumbu utama. Biasanya dimasak dengan daging babi atau ikan, memiliki rasa gurih dan sedikit pahit khas.",
    category: "Hidangan Utama",
    image: pantolloPamarrasan,
  },
  {
    id: 3,
    title: "Deata Jemba",
    description:
      "Olahan ikan mas yang dimasak dengan bumbu khas Toraja hingga matang dan bumbunya meresap sempurna. Sering disajikan dalam acara-acara adat.",
    category: "Hidangan Ikan",
    image: deataJemba,
  },
  {
    id: 4,
    title: "Uttu Kesu'",
    description:
      "Jajanan tradisional Toraja yang terbuat dari beras ketan hitam atau putih, dibungkus daun pisang atau daun bambu, dan dikukus. Rasanya manis dan legit, cocok sebagai camilan.",
    category: "Camilan Tradisional",
    image: uttuKesu,
  },
  {
    id: 5,
    title: "Baje' ",
    description:
      "Dodol khas Toraja yang terbuat dari campuran tepung ketan, gula merah, dan santan kelapa, dimasak hingga mengental. Teksturnya kenyal dan rasanya manis, sering menjadi oleh-oleh.",
    category: "Camilan Tradisional",
    image: baje,
  },
  {
    id: 6,
    title: "Dangkot (Daging Kotte')",
    description:
      "Olahan daging bebek atau ayam yang dimasak pedas dengan bumbu rempah khas. Populer di Toraja dan sekitarnya, sering disantap dengan nasi hangat.",
    category: "Hidangan Utama",
    image: paPiong, // Placeholder, ganti dengan gambar Dangkot jika ada
  },
  {
    id: 7,
    title: "Kambira",
    description:
      "Jajanan ringan yang terbuat dari singkong atau ubi kayu yang diparut, dicampur gula merah, dan dibungkus daun pisang kemudian dikukus.",
    category: "Camilan Tradisional",
    image: uttuKesu, // Placeholder, ganti dengan gambar Kambira jika ada
  },
  {
    id: 8,
    title: "Pa'piong",
    description:
      "Hidangan khas Toraja berupa daging (babi, ayam, atau ikan) yang dimasak bersama bumbu dan sayuran dalam bambu, lalu dibakar. Memberikan aroma dan rasa yang unik.",
    category: "Hidangan Utama",
    image: paPiong,
  },
  {
    id: 9,
    title: "Pantollo' Pamarrasan",
    description:
      "Masakan berkuah hitam khas Toraja yang menggunakan 'Pamarrasan' (kluwek) sebagai bumbu utama. Biasanya dimasak dengan daging babi atau ikan, memiliki rasa gurih dan sedikit pahit khas.",
    category: "Hidangan Utama",
    image: pantolloPamarrasan,
  },
  {
    id: 10,
    title: "Deata Jemba",
    description:
      "Olahan ikan mas yang dimasak dengan bumbu khas Toraja hingga matang dan bumbunya meresap sempurna. Sering disajikan dalam acara-acara adat.",
    category: "Hidangan Ikan",
    image: deataJemba,
  },
  {
    id: 11,
    title: "Uttu Kesu'",
    description:
      "Jajanan tradisional Toraja yang terbuat dari beras ketan hitam atau putih, dibungkus daun pisang atau daun bambu, dan dikukus. Rasanya manis dan legit, cocok sebagai camilan.",
    category: "Camilan Tradisional",
    image: uttuKesu,
  },
];

const categories = [
  "All",
  "Hidangan Utama",
  "Camilan Tradisional",
  "Hidangan Ikan",
];
const desc =
  "Kuliner Toraja memiliki cita rasa yang kuat dan unik, didominasi oleh penggunaan bumbu rempah alami serta cara memasak tradisional. Banyak hidangan dimasak dalam bambu atau daun pisang, memberikan aroma khas dan mempertahankan kekayaan rasa. Makanan Toraja tidak hanya sekadar santapan, tetapi juga bagian integral dari ritual adat dan kehidupan sehari-hari.";

const MakananPage = () => {
  // Rename this to MakananPage if you prefer, but keeping for consistency with original structure
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <HeaderList title="Makanan Khas Toraja" image={"https://i.pinimg.com/1200x/1d/3f/60/1d3f60d5b1ae11bfc8aa92f769bfe95a.jpg"} />
      <ListCard
        topic={"makanan"}
        data={makananToraja} // Rename this prop to 'foods' or 'items' if you want, but keeping 'dances' as per instruction
        categories={categories}
        title={"Makanan Tradisional Khas Toraja"}
        description={desc}
        image={"https://i.pinimg.com/1200x/fc/0b/dd/fc0bdd8b1b86fff3cc8080ec650985f1.jpg"}
      />

      <Footer />
      {/* </div> */}
    </div>
  );
};

export default MakananPage; // Rename this to MakananPage if you prefer, but keeping for consistency with original structure
