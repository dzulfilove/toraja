import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CardAdmin from "./cardAdmin";

const itemsPerPage = 8;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ListCardAdmin = ({
  topic,
  data = [],
  categories = [],
  title = "",
  description = "",
  image = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Filter & search yang aman
  const filteredData = data.filter((item) => {
    const categoryValue = item.category ?? "Unknown";
    const matchCategory =
      selectedCategory === "All" || categoryValue === selectedCategory;

    const titleValue = item.title ?? "";
    const matchSearch = titleValue
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  return (
    <div
      ref={containerRef}
      className="w-full py-8 px-4 font-montserrat relative mt-10 rounded-3xl shadow-md"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0  rounded-3xl">
        <div
          className="w-full h-full bg-cover bg-center  rounded-3xl"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-white opacity-80  rounded-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col justify-center items-center mb-12 px-4 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="uppercase text-sm tracking-wider text-toraja-merah font-semibold mb-4">
            Kebudayaan Tana Toraja
          </p>
          <p className="max-w-3xl text-gray-700 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border-2 border-toraja-emas px-4 py-2 rounded-lg w-full md:w-1/3"
          />
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-6 py-1 rounded-xl transition-all text-sm ${
                  selectedCategory === cat
                    ? "bg-toraja-merah text-white"
                    : "bg-toraja-putih text-toraja-merah border border-toraja-merah"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"
        >
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CardAdmin
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  topic={topic}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full">Data tidak ditemukan.</p>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-toraja-merah text-white hover:bg-toraja-emas"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 transition-all rounded-lg ${
                  currentPage === i + 1
                    ? "bg-toraja-merah text-toraja-putih"
                    : "bg-toraja-putih text-toraja-merah border border-toraja-merah"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-toraja-merah text-white hover:bg-toraja-emas"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCardAdmin;
