import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailHeader from "../MainComponent/detailComponent/detailHeader";
import DetailContent from "../MainComponent/detailComponent/detailContent";
import DetailGallery from "../MainComponent/detailComponent/detailGallery";
import DetailFooter from "../MainComponent/detailComponent/detailFooter";
import paPiong from "../assets/papiong.jpg";
import pantolloPamarrasan from "../assets/pantollo-pammarasan.jpg";
import deataJemba from "../assets/patorro.jpeg";
import uttuKesu from "../assets/piang.jpg";
import baje from "../assets/papiong.jpg";
import pagelu from "../assets/pagelu.jpeg";
import manimbong from "../assets/manimbong.jpg";
import manganda from "../assets/Manganda.jpg";
import madandan from "../assets/madandan.jpg";
import lambu from "../assets/lambu.jpg";
import Footer from "../MainComponent/footer";
const DetailPage = () => {
  const { id, topic } = useParams();
  // data bisa dari props, route params, atau API
  // Contoh dummy data:
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
  const detail =
    topic == "tarian"
      ? tarianToraja.find((a) => a.id == id)
      : makananToraja.find((a) => a.id == id);
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <DetailHeader data={detail} />
      <DetailContent data={detail} />
      {/* <DetailGallery images={detail.gallery} /> */}
      <Footer />
    </div>
  );
};

export default DetailPage;
