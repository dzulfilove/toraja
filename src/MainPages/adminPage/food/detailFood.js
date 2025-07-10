import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";

const DetailFood = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/food/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

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
  useEffect(() => {
    loadData();
  }, [id]);

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
  // ✅ Update title & description + update/tambah gambar
  const updateText = async (title, category, description, images) => {
    try {
      console.log("update begin");
      await API.put(`/food/${id}`, { title, category, description });
      console.log("Update title & description sukses");

      const editedImages = images.filter(
        (img) => img.isEdit === true && img.id && img.file
      );
      for (const img of editedImages) {
        await updateSingleImage(img.id, img.file);
      }

      const newImages = images.filter((img) => img.isNew === true && img.file);
      for (const img of newImages) {
        await addImage(img.file);
      }
      const deletedImage = images.filter(
        (img) => img.isDeleted === true && img.id
      );
      for (const img of deletedImage) {
        await deleteSingleImage(img.id);
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
      });
      loadData(); // refresh data
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui data!",
      });
    }
  };

  // Tambah gambar baru
  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, "ADD");
    await API.post(`/food/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // Update gambar lama
  const updateSingleImage = async (imageId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, "UPDATE");

    await API.put(`/food/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const deleteSingleImage = async (imageId) => {
    const formData = new FormData();

    await API.delete(`/food/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteFood = async () => {
    try {
      const result = await Swal.fire({
        title: "Hapus Makanan?",
        text: "Apakah Anda yakin ingin menghapus makanan ini? Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const formData = new FormData();

        await API.delete(`/food/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await Swal.fire({
          title: "Berhasil!",
          text: "Makanan berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/admin/makanan/`);

        // opsional: reload halaman atau update state
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus makanan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-white">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Makanan", href: "/admin/makanan" },
          { label: "Detail" }, // halaman aktif biasanya tidak ada href
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Makanan "} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <DetailAdmin
            data={data}
            deleteData={deleteFood}
            updateText={updateText}
            categories={categories}
            topic={"makanan"}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createFoodCategory} />
        </div>
      </div>
    </div>
  );
};

export default DetailFood;
