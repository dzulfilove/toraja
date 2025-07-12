import React from "react";
import "../styles/load.css"; // Pastikan CSS loader dimasukkan ke file ini

const LoaderPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default LoaderPage;
