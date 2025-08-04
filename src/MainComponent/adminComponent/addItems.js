import React, { useState, useEffect } from "react";
import "../../styles/button.css";
import RichTextEditor from "./richText";
import SearchableDropdown from "./dropdown";
import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import imageCompression from "browser-image-compression";

const revokeIfBlob = (url) => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

const AddItems = ({ addItem, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    return () => {
      images.forEach((img) => revokeIfBlob(img.url));
    };
  }, [images]);

  const handleFileChange = async (index, file) => {
    try {
      let processedFile = file;

      // Kompresi jika lebih dari 2MB (2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        const options = {
          maxSizeMB: 1.5, // Ukuran maksimal setelah kompresi (2MB)
          maxWidthOrHeight: 1920, // Resolusi maksimal
          useWebWorker: true, // Gunakan web worker untuk performa lebih baik
          fileType: file.type, // Pertahankan tipe file asli
        };

        processedFile = await imageCompression(file, options);
      }

      setImages((prev) => {
        const updated = [...prev];
        const old = updated[index];
        revokeIfBlob(old?.url);
        updated[index] = {
          file: processedFile,
          isNew: true,
          url: URL.createObjectURL(processedFile),
        };
        return updated;
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      // Fallback ke file asli jika kompresi gagal
      setImages((prev) => {
        const updated = [...prev];
        const old = updated[index];
        revokeIfBlob(old?.url);
        updated[index] = {
          file: file,
          isNew: true,
          url: URL.createObjectURL(file),
        };
        return updated;
      });
    }
  };
  const handleAddImage = () => {
    setImages((prev) => [...prev, { file: null, url: "", isNew: true }]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      const removed = updated.splice(index, 1)[0];
      revokeIfBlob(removed?.url);
      return updated;
    });
  };

  const handleSave = () => {
    addItem(title, description, category, images);
  };

  const handleSelect = (data) => {
    setCategory(data.value);
  };

  // Variants untuk animasi container dan children
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

  return (
    <motion.div
      className="p-8 w-full mt-6 mx-auto bg-white rounded-3xl shadow-lg space-y-4 font-montserrat"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-xl text-toraja-merah font-bold mb-2">
          Tambah Data
        </h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Judul</label>
        <div className="relative w-full group mt-4">
          <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-toraja-merah to-toraja-emas opacity-70"></span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="peer w-full pl-6 pr-4 py-6 text-base text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Kategori</label>
        <div className="relative w-full group mt-4">
          <SearchableDropdown
            options={categories}
            onSelect={handleSelect}
            placeholder="Select an option"
            searchPlaceholder="Search options..."
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold">Deskripsi</label>
        <div className="relative w-full group mt-4 shadow-md">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-lg font-semibold mb-2">Gambar</label>
        <div className="flex flex-row gap-4 flex-wrap justify-start bg-toraja-putih p-8 rounded-xl mt-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col border w-auto rounded-xl p-4 bg-white shadow-xl items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {img.url ? (
                <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-xl mb-2">
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
                <div className="w-[15rem] h-[15rem] bg-gray-100 flex items-center justify-center mb-2 rounded-xl">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-4">
          <motion.button
            onClick={handleAddImage}
            className="flex justify-between items-center gap-2 px-6 py-2 bg-toraja-emas text-white rounded-xl hover:bg-toraja-putih hover:text-toraja-emas border hover:border-toraja-emas transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoMdAddCircleOutline className="text-base" />
            Tambah Gambar
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="w-full py-4 flex justify-start items-start">
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
    </motion.div>
  );
};

export default AddItems;
