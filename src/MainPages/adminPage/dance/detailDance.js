import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";

const DetailDance = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/dance/${id}`);
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
      const res = await API.get(`/dance/categories`);
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
        text: "Gagal memuat kategori Tarian.",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [id]);

  const createDanceCategory = async (title) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", title);

      console.log(title, "title");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await API.post("/dance/category", formData);

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
  // ✅ Update title & description + update/tambah gambar
  const updateText = async (title, category, description, images) => {
    try {
      console.log("update begin");
      await API.put(`/dance/${id}`, { title, category, description });
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
    await API.post(`/dance/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // Update gambar lama
  const updateSingleImage = async (imageId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, "UPDATE");

    await API.put(`/dance/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const deleteSingleImage = async (imageId) => {
    const formData = new FormData();

    await API.delete(`/dance/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteDance = async () => {
    try {
      const result = await Swal.fire({
        title: "Hapus Tarian?",
        text: "Apakah Anda yakin ingin menghapus Tarian ini? Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const formData = new FormData();

        await API.delete(`/dance/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await Swal.fire({
          title: "Berhasil!",
          text: "Tarian berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/admin/Tarian/`);

        // opsional: reload halaman atau update state
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus Tarian.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-toraja-putih">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Tarian", href: "/admin/Tarian" },
          { label: "Detail" }, // halaman aktif biasanya tidak ada href
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Tarian "} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <DetailAdmin
            data={data}
            deleteData={deleteDance}
            updateText={updateText}
            categories={categories}
            topic={"Tarian"}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createDanceCategory} />
        </div>
      </div>
    </div>
  );
};

export default DetailDance;
