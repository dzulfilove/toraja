import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";

const AddFood = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoadingPage(true);
      const res = await API.get(`/food/categories`);
      const transformed = res.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setCategories(transformed);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat kategori makanan.",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const createFood = async (title, description, category, images) => {
    try {
      setLoadingAdd(true);

      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await API.post("/food", formData);
      const newFoodId = response.data.id;

      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue;

          const imgFormData = new FormData();
          imgFormData.append("image", img.file);

          try {
            await API.post(`/food/${newFoodId}/image`, imgFormData, {
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
      setLoadingAdd(false);
    }
  };

  const createFoodCategory = async (title) => {
    try {
      setLoadingCategory(true);
      const formData = new FormData();
      formData.append("name", title);

      await API.post("/food/category", formData);
      await getCategories();

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori Makanan berhasil ditambahkan.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan kategori.",
      });
    } finally {
      setLoadingCategory(false);
    }
  };

  if (loadingPage) {
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
            loading={loadingAdd}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createFoodCategory} loading={loadingCategory} />
        </div>
      </div>
    </div>
  );
};

export default AddFood;
