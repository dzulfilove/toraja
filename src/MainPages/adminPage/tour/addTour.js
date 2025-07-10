import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";

const AddTour = () => {
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
      const res = await API.get(`/tourist/categories`);
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
        text: "Gagal memuat kategori tarian.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTourist = async (title, description, category, images) => {
    try {
      setLoading(true);

      // 1. Buat makanan terlebih dahulu
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await API.post("/tourist", formData);
      const newTouristId = response.data.id;

      console.log(images, "gambar");
      // 2. Upload gambar satu per satu (sequential)
      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue; // Skip jika file tidak ada

          const imgFormData = new FormData();
          imgFormData.append("image", img.file); // Field name "image" (sesuai backend)

          try {
            await API.post(`/tourist/${newTouristId}/image`, imgFormData, {
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
        text: "Tarian dan gambar berhasil ditambahkan.",
      });

      navigate(`/admin/wisata/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan tarian.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTouristCategory = async (title) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", title);

      console.log(title, "title");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await API.post("/tourist/category", formData);

      await getCategories();
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori Tarian berhasil ditambahkan.",
      });
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan Tarian.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-white">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Wisata", href: "/admin/wisata" },
          { label: "Tambah Wisata" },
        ]}
      />
      <HeaderAdmin title={"Tambah Data Tarian"} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <AddItems
            addItem={createTourist}
            categories={categories}
            loading={loading}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createTouristCategory} />
        </div>
      </div>
    </div>
  );
};

export default AddTour;
