import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";

const AddFood = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([
    { value: null, label: "none" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, [id]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/food/categories`);
      const transformedData = res.data.map((item) => ({
        // Pertahankan properti lainnya
        value: item.id, // Ubah 'nama' menjadi 'title'
        label: item.name_category,
      }));
      console.log(transformedData);
      setCategories(transformedData);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update title & description + update/tambah gambar
  const createFood = async (name, description, category, imageFile) => {
    try {
      console.log("create food begin");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", imageFile);

      await API.post("/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Food created successfully");

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menambahkan data!",
      });
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-toraja-putih">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Makanan", href: "/admin/makanan" },
          { label: "Tambah Makanan" }, // halaman aktif biasanya tidak ada href
        ]}
      />
      <HeaderAdmin title={"Tambah Data Makanan"} />
      <AddItems addItem={createFood} categories={categories} />
    </div>
  );
};

export default AddFood;
