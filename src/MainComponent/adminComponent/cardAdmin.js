import React from "react";
import { Link } from "react-router-dom";

const CardAdmin = ({ id, title, description, image, category, topic }) => {
  return (
    <Link to={`/admin/${topic}/detail/${id}`}>
      <div className="relative w-[16.5rem] h-[20rem] cursor-pointer overflow-hidden shadow-lg rounded-xl group">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-125"
          style={{
            backgroundImage: `url(http://localhost:5000/${image[0].image})`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 p-6 w-full">
          <h2 className="text-xl md:text-2xl font-medium text-toraja-kuning group-hover:text-toraja-putih transition">
            {title}
          </h2>
          <p className="text-sm text-toraja-putih">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardAdmin;
