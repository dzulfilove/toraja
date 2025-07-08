import React, { useState, useEffect } from "react";
import "../../styles/button.css";
import RichTextEditor from "./richText";
import SearchableDropdown from "./dropdown";
// Helper: revoke blob URL jika ada
const revokeIfBlob = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

const AddItems = ({ addItem, categories }) => {
  // title & description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // images: [{ id, url, file?, isEdit? }]
  const [images, setImages] = useState([{}]);

  // Cleanup blob URLs saat unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        revokeIfBlob(img.url);
      });
    };
  }, [images]);

  // Saat user pilih file baru (update gambar lama)
  const handleFileChange = (index, file) => {
    if (!file) return;

    setImages((prevImages) => {
      const updated = [...prevImages];
      const old = updated[index];

      // Revoke blob lama jika ada
      revokeIfBlob(old?.url);

      // Deteksi: gambar lama punya id → isEdit, atau slot kosong → isNew
      if (old && old.id) {
        updated[index] = {
          ...old,
          file,
          isEdit: true,
          url: URL.createObjectURL(file),
        };
      } else {
        updated[index] = {
          file,
          isNew: true,
          url: URL.createObjectURL(file),
        };
      }

      return updated;
    });
  };

  const handleSave = () => {
    addItem(title, description, images);
  };
  const handleSelect = (data) => {
    setCategory(data);
  };
  console.log(description, "desc");

  return (
    <div className="p-8 w-full mt-6 mx-auto bg-white rounded-3xl shadow-lg space-y-4 font-montserrat">
      <h2 className="text-xl text-toraja-merah font-bold mb-2">
        Detail History
      </h2>

      {/* Title */}
      <div>
        <label className="block text-lg font-semibold">Judul</label>
        <div className="relative w-full group mt-4">
          <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder=""
            className="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold">Kategori</label>
        <div className="relative w-full group mt-4">
          <SearchableDropdown
            options={categories}
            onSelect={handleSelect}
            placeholder="Select an option"
            searchPlaceholder="Search options..."
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-lg font-semibold">Deskripsi</label>
        <div className="relative w-full group mt-4">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-lg font-semibold mb-2">Gambar</label>

        <div className="flex flex-row gap-4 flex-wrap justify-between bg-toraja-putih p-8 rounded-xl mt-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex flex-col items border w-[16rem] rounded-xl p-4 bg-white shadow-xl"
            >
              {img.url ? (
                <div className="relative w-full h-[15rem] overflow-hidden rounded-xl mb-2 ">
                  <img
                    src={img.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 "
                  />
                  <img
                    src={img.url}
                    alt=""
                    className="relative w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-[15rem] h-[15rem] bg-gray-100 flex items-center justify-center mb-2 rounded-xl">
                  <span className="text-gray-400">Kosong</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(idx, e.target.files[0])}
              />

              {img.url && (
                <button
                  onClick={() => window.open(img.url, "_blank")}
                  className="cursor-pointer font-semibold overflow-hidden relative bg-white z-100 border border-toraja-merah group px-8 py-2 mt-4 rounded-xl"
                >
                  <span className="relative z-10 text-toraja-merah group-hover:text-white text-base duration-500">
                    Lihat Preview
                  </span>
                  <span className="absolute w-full h-full bg-toraja-merah -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-toraja-merah -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full py-4">
        <button className="mt-16 c-button c-button--gooey" onClick={handleSave}>
          Simpan Data
          <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddItems;
