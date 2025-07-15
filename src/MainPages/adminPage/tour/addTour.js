import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";

const AddTour = () => {
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
        text: "Gagal memuat kategori wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTourist = async (title, description, category, images) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await API.post("/tourist", formData);
      const newTouristId = response.data.id;

      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue;
          const imgFormData = new FormData();
          imgFormData.append("image", img.file);

          try {
            await API.post(`/tourist/${newTouristId}/image`, imgFormData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } catch (err) {
            console.error(`Gagal upload ${img.file.name}:`, err);
            continue;
          }
        }
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Wisata dan gambar berhasil ditambahkan.",
      });

      navigate(`/admin/wisata/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan wisata.",
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

      await API.post("/tourist/category", formData);
      await getCategories();
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori wisata berhasil ditambahkan.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan kategori wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-white">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Wisata", href: "/admin/wisata" },
          { label: "Tambah Wisata" },
        ]}
      />
      <HeaderAdmin title="Tambah Data Wisata" />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <AddItems addItem={createTourist} categories={categories} loading={loading} />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createTouristCategory} />
        </div>
      </div>
    </div>
  );
};

export default AddTour;
