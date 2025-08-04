import React from "react";
import { Link } from "react-router-dom";
import { sanitize } from "./utils";
import { url } from "../../config/route";

const CardAdmin = ({ id, title, description, image, category, topic }) => {
  // Ambil URL gambar pertama jika tersedia dan valid
  const imageUrl =
    image && image[0]?.image && image[0]?.image.length > 10
      ? image[0].image
      : "https://512pixels.net/wp-content/uploads/2025/06/11-0-Night-thumbnail.jpg";

  // Untuk debugging di console
  console.log("Image URL untuk", title, ":", imageUrl);

  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <div className="relative w-[16.5rem] h-[20rem] cursor-pointer overflow-hidden shadow-lg rounded-xl group">
        {/* Gambar langsung pakai <img /> */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-125"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

        {/* Content */}
        <div className="absolute bottom-0 p-6 w-full z-20">
          <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
            {title}
          </h2>
          <div
            className="text-sm text-toraja-putih"
            dangerouslySetInnerHTML={{
              __html: sanitize(description.substring(0, 35) + "......"),
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default CardAdmin;
