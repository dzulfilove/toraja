import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";

const AddFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/food/categories`);
      const transformedData = res.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setCategories(transformedData);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat kategori makanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFood = async (title, description, category, images) => {
    try {
      setLoading(true);

      // 1. Buat makanan terlebih dahulu
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await API.post("/food", formData);
      const newFoodId = response.data.id;

      console.log(images, "gambar");
      // 2. Upload gambar satu per satu (sequential)
      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue; // Skip jika file tidak ada

          const imgFormData = new FormData();
          imgFormData.append("image", img.file); // Field name "image" (sesuai backend)

          try {
            await API.post(`/food/${newFoodId}/image`, imgFormData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(`Gambar ${img.file.name} berhasil diupload`);
          } catch (err) {
            console.error(`Gagal upload ${img.file.name}:`, err);
            // Lanjut ke gambar berikutnya meskipun ada error
            continue;
          }
        }
      }

      // 3. Tampilkan notifikasi sukses
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Makanan dan gambar berhasil ditambahkan.",
      });

      navigate(`/admin/makanan/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan makanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFoodCategory = async (title) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", title);

      console.log(title, "title");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await API.post("/food/category", formData);

      await getCategories();
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori Makanan berhasil ditambahkan.",
      });
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan makanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-toraja-putih">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Makanan", href: "/admin/makanan" },
          { label: "Tambah Makanan" },
        ]}
      />
      <HeaderAdmin title={"Tambah Data Makanan"} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <AddItems
            addItem={createFood}
            categories={categories}
            loading={loading}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createFoodCategory} />
        </div>
      </div>
    </div>
  );
};

export default AddFood;
