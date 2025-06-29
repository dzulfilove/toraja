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
  const wisataToraja = [
    {
      id: "1",
      title: "Batu Tumonga",
      location: "Toraja",
      description:
        "Nikmati keindahan panorama alam Toraja dari ketinggian, serta saksikan situs-situs megalitikum yang tersebar di area ini.",
      image:
        "https://ketikmedia.com/wp-content/uploads/2023/12/Pesona-Alam-Objek-Wisata-Batutumonga-Toraja.jpg",
      category: "Alam & Budaya",
    },
    {
      id: "2",
      title: "Tugu Salib Toraja",
      location: "Toraja",
      description:
        "Monumen megah yang menjadi ikon religi dan menawarkan pemandangan spektakuler dari atas bukit.",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/0a/50/05/70/tugu-salib-rantepao.jpg",
      category: "Religi & Pemandangan",
    },
    {
      id: "3",
      title: "Patung Yesus Buntu Burake",
      location: "Toraja",
      description:
        "Patung Yesus tertinggi di dunia, menawarkan pemandangan 360 derajat Kota Makale dan sekitarnya.",
      image:
        "https://res.cloudinary.com/diipdl14x/image/upload/v1751215693/y00ftsvfers4qo0drdym.jpg",
      category: "Religi & Pemandangan",
    },
    {
      id: "4",
      title: "Gumuk Pasir Toraja",
      location: "Toraja",
      description:
        "Fenomena alam unik berupa gundukan pasir di tengah perbukitan hijau, cocok untuk berswafoto dan menikmati suasana berbeda.",
      image:
        "https://cdn.digitaldesa.com/uploads/profil/73.18.33.2003/berita/5746f1417112f6554ec4340f18837d9f.jpg",
      category: "Alam",
    },
    {
      id: "5",
      title: "Pango-Pango",
      location: "Toraja",
      description:
        "Destinasi agrowisata dengan hamparan kebun kopi dan teh, serta udara sejuk yang menyegarkan.",
      image:
        "https://theeditor.id/wp-content/uploads/2022/01/Agrowisata-Pango-Pango-Native-Indonesia.jpg.webp",
      category: "Agrowisata & Alam",
    },
    {
      id: "6",
      title: "Kolam Alam Tilangga",
      location: "Toraja",
      description:
        "Kolam alami dengan air jernih dan pemandangan asri, tempat ideal untuk berenang dan bersantai.",
      image:
        "https://makassarseo.com/wp-content/uploads/2024/10/wisata-tilanga-toraja.jpg",
      category: "Alam",
    },
    {
      id: "7",
      title: "Talondo Tallu",
      location: "Toraja",
      description:
        "Area persawahan terasering yang memukau dengan latar belakang perbukitan, menawarkan pemandangan pedesaan yang menenangkan.",
      image:
        "https://assets.promediateknologi.id/crop/139x67:654x381/0x0/webp/photo/p3/93/2025/03/14/pesona-mistis-air-terjun-bercabang-tiga-talondo-tallu-yEirohx9xt-3883984654.jpg",
      category: "Alam & Pemandangan",
    },
  ];
  
  const detail =
    topic == "tarian"
      ? tarianToraja.find((a) => a.id == id)
      : topic=="wisata"? wisataToraja.find((a)=>a.id==id):makananToraja.find((a) => a.id == id);
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
