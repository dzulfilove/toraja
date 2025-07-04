import React, { useState, useEffect } from "react";
import "../../styles/button.css";

const DetailAdmin = ({ data, updateText, uploadImage }) => {
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");

  // State untuk file baru & preview url
  const [imageFiles, setImageFiles] = useState(
    new Array(data.images.length).fill(null)
  );
  const [previewUrls, setPreviewUrls] = useState(
    data.images.map((img) => `http://localhost:5000/${img.image}`)
  );

  // Bersihkan object URLs saat unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  // Saat pilih file baru
  const handleFileChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);

    const updatedPreviews = [...previewUrls];
    updatedPreviews[index] = file
      ? URL.createObjectURL(file)
      : previewUrls[index];
    setPreviewUrls(updatedPreviews);
  };

  return (
    <div className="p-8 w-full mt-10 mx-auto bg-white rounded-3xl shadow-lg space-y-4 font-montserrat">
      <h2 className="text-3xl text-toraja-merah font-bold mb-2">
        Detail History
      </h2>

      {/* Title */}
      <div>
        <label className="block text-lg font-semibold">Judul</label>

        <div class="relative w-full group">
          <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="input"
            placeholder=""
            class="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold">Deskripsi</label>

        <div class="relative w-full group">
          <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="input"
            placeholder=""
            class="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-lg font-semibold mb-2">Gambar</label>
        <div className="flex gap-4 flex-wrap flex-col w-full">
          {data.images.map((img, index) => (
            <div key={img.id} className="flex gap-6 items-center space-y-2">
              <img
                src={previewUrls[index]}
                alt=""
                className="w-24 h-24 object-cover border rounded"
              />

              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="text-base border border-toraja-merah rounded-xl p-4 w-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full py-4">
        <button
          className="mt-16 c-button c-button--gooey"
          onClick={() => updateText(title, description)}
        >
          Update Data
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ display: "block", height: 0, width: 0 }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default DetailAdmin;
