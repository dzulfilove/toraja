import React from "react";
import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListCard from "../MainComponent/listComponent/listCard";
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

const kategoriWisata = [
  "All",
  "Alam & Budaya",
  "Religi & Pemandangan",
  "Alam",
  "Agrowisata & Alam",
];
const desc =
  "Toraja menawarkan pengalaman wisata yang kaya, memadukan keindahan alam pegunungan yang memukau dengan kekayaan budaya yang otentik. Anda bisa menjelajahi situs megalitikum kuno, menyaksikan upacara adat yang penuh makna, atau menikmati panorama lanskap persawahan terasering yang hijau. Setiap sudut Toraja menjanjikan cerita dan keunikan yang tak terlupakan.";
const WisataPage = () => {
  // Rename this to MakananPage if you prefer, but keeping for consistency with original structure
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <HeaderList
        title="Wisata Daerah Toraja"
        image={
          "https://i.pinimg.com/1200x/cf/2c/c0/cf2cc00bef38e3e3eaca168275fd8887.jpg"
        }
      />
      <ListCard
        topic={"wisata"}
        data={wisataToraja} // Rename this prop to 'foods' or 'items' if you want, but keeping 'dances' as per instruction
        categories={kategoriWisata}
        title={"Wisata Daerah Masyarakat Toraja"}
        description={desc}
        image={"https://i.pinimg.com/1200x/74/7b/d9/747bd9458f1151a8c076128ad30ebbe0.jpg"}
      />

      <Footer />
      {/* </div> */}
    </div>
  );
};

export default WisataPage; // Rename this to WisataPage if you prefer, but keeping for consistency with original structure
