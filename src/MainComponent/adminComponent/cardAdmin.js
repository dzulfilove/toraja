import React from "react";
import { Link } from "react-router-dom";
import { sanitize } from "./utils";
import { url } from "../../config/route";
const CardAdmin = ({ id, title, description, image, category, topic }) => {
  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <div className="relative w-[16.5rem] h-[20rem] cursor-pointer overflow-hidden shadow-lg rounded-xl group">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-125"
          style={{
            backgroundImage: `url(${
              image[0]?.image
                ? `${url}/${image[0]?.image}`
                : "https://512pixels.net/wp-content/uploads/2025/06/11-0-Night-thumbnail.jpg"
            })`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 p-6 w-full">
          <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
            {title}
          </h2>
          <div
            className="text-sm text-toraja-putih"
            dangerouslySetInnerHTML={{
              __html: sanitize(description.substring(0, 35)+ "......"),
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default CardAdmin;
