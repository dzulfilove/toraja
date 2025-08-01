import React, { useState, useEffect } from "react";
import "../../styles/button.css";
import RichTextEditor from "./richText";
import { motion } from "framer-motion";
import SearchableDropdown from "./dropdown";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
// Helper: revoke blob URL jika ada
const revokeIfBlob = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

const DetailAdmin = ({ data, updateText, categories, topic, deleteData }) => {
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [category, setCategory] = useState(data.category);

  // images: [{ id?, url, file?, isEdit?, isNew? }]

  const [images, setImages] = useState(() =>
    data.images.map((img) => ({
      id: img.id,
      url: `${img.image}`,
    }))
  );

  // Cleanup blob URLs saat unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => revokeIfBlob(img.url));
    };
  }, [images]);

  // Tambah gambar baru (slot baru)
  const handleAddImage = () => {
    setImages((prev) => [
      ...prev,
      {
        url: "",
        file: null,
        isNew: true, // tandai langsung isNew karena ini slot baru
      },
    ]);
  };

  // Hapus gambar
  const handleRemoveImage = (index) => {
    setImages((prev) => {
      return prev.map((image, i) =>
        i === index ? { ...image, isDeleted: true } : image
      );
    });
  };

  // Saat user pilih file
  const handleFileChange = (index, file) => {
    if (!file) return;
    setImages((prev) => {
      const updated = [...prev];
      const old = updated[index];

      revokeIfBlob(old?.url);

      if (old && old.id) {
        // Gambar lama, tandai isEdit
        updated[index] = {
          ...old,
          file,
          isEdit: true,
          url: URL.createObjectURL(file),
        };
      } else {
        // Slot baru / belum punya id
        updated[index] = {
          ...old,
          file,
          isNew: true,
          url: URL.createObjectURL(file),
        };
      }

      return updated;
    });
  };

  const handleSelect = (data) => {
    setCategory(data.value);
  };

  const handleSave = () => {
    if (topic == "sejarah") {
      updateText(title, description, images);
    } else if (topic == "filosofi") {
      updateText(title, description, images);
    } else {
      updateText(title, category, description, images);
    }
  };

  const handleDelete = () => {
    deleteData();
  };
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15, // delay antar children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const displayImages = images.filter((a) => !a.isDeleted);
  console.log(displayImages);
  return (
    <motion.div
      className="p-8 w-full mt-6 mx-auto bg-white rounded-3xl shadow-lg space-y-4 font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={itemVariants}
        className=" flex w-full justify-between items-center"
      >
        <h2 className="text-xl text-toraja-merah font-bold mb-2">
          Detail History
        </h2>
        <div className="w-[30%] py-4">
          <button
            onClick={handleDelete}
            className="w-full font-sans flex justify-center gap-2 items-center mx-auto text-sm text-gray-50 bg-red-600 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-red-600 before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group"
            type="submit"
          >
            Hapus Data
            <MdDeleteOutline className="w-8 h-8 text-xl text-red-600 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50  ease-linear duration-300 rounded-full border border-red-600 group-hover:border-red-600 p-2" />
          </button>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Judul</label>
        <div className="relative w-full group mt-4">
          <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
          />
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Deskripsi</label>
        <div className="relative w-full group mt-4">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
      </motion.div>

      {topic !== "sejarah" &&topic !== "filosofi" ? (
        <>
          <motion.div variants={itemVariants}>
            <label className="block text-lg font-semibold">Kategori</label>
            <div className="relative w-full group mt-4">
              <SearchableDropdown
                options={categories}
                defaultValue={categories.find((a) => a.value == category)}
                onSelect={handleSelect}
                placeholder="Pilih Kategori"
                searchPlaceholder="Search options..."
              />
            </div>
          </motion.div>
        </>
      ) : (
        <></>
      )}

      {/* Images */}
      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold mb-2">Gambar</label>
        <div className="flex flex-row gap-4 flex-wrap justify-start bg-toraja-putih p-8 rounded-xl mt-4">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className="flex flex-col border w-[16rem] rounded-xl p-4 bg-white shadow-xl"
            >
              {img.url ? (
                <div className="relative w-full h-[15rem] overflow-hidden rounded-xl mb-2">
                  <img
                    src={img.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
                  />
                  <img
                    src={img.url}
                    alt=""
                    className="relative w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-[15rem] bg-gray-100 flex items-center justify-center mb-2 rounded-xl">
                  <span className="text-gray-400">Kosong</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(idx, e.target.files[0])}
              />

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="flex justify-between items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-600 hover:text-white transition"
                >
                  <MdDeleteOutline className="text-base" />
                  Hapus
                </button>
                {img.url && (
                  <button
                    onClick={() => window.open(img.url, "_blank")}
                    className="flex justify-between items-center gap-2 px-4 py-2 text-toraja-merah border border-toraja-merah rounded-xl hover:bg-toraja-merah hover:text-white transition"
                  >
                    <IoEyeSharp className="text-base" />
                    Lihat
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tombol tambah gambar */}
        <motion.button
          onClick={handleAddImage}
          className="flex justify-between mt-4 items-center gap-2 px-6 py-2 bg-toraja-emas text-white rounded-xl hover:bg-toraja-putih hover:text-toraja-emas border hover:border-toraja-emas transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoMdAddCircleOutline className="text-base" />
          Tambah Gambar
        </motion.button>
      </motion.div>

      {/* Button Save */}
      <div className="w-full py-4">
        <button
          onClick={handleSave}
          className="w-full font-sans flex justify-center gap-2 items-center mx-auto text-sm text-gray-50 bg-toraja-merah backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-toraja-merah before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-12 py-2 overflow-hidden border-2 rounded-full group"
          type="submit"
        >
          Simpan Data
          <FaRegSave className="w-8 h-8 text-toraja-merah justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50  ease-linear duration-300 rounded-full border border-toraja-merah group-hover:border-toraja-merah p-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default DetailAdmin;
