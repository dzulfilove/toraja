import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";

const DetailDance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(false);

  // Load detail data
  const loadData = async () => {
    try {
      setLoadingPage(true);
      const res = await API.get(`/dance/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Gagal memuat data." });
    } finally {
      setLoadingPage(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await API.get(`/dance/categories`);
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
        text: "Gagal memuat kategori tarian.",
      });
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoadingPage(true);
      await Promise.all([loadData(), getCategories()]);
      setLoadingPage(false);
    };
    loadAll();
  }, [id]);

  const createDanceCategory = async (title) => {
    try {
      setLoadingCategory(true);
      const formData = new FormData();
      formData.append("name", title);
      await API.post("/dance/category", formData);
      await getCategories();
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori tarian berhasil ditambahkan.",
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

  const updateText = async (title, category, description, images) => {
    try {
      await API.put(`/dance/${id}`, { title, category, description });

      const edited = images.filter((img) => img.isEdit && img.id && img.file);
      for (const img of edited) {
        await updateSingleImage(img.id, img.file);
      }

      const added = images.filter((img) => img.isNew && img.file);
      for (const img of added) {
        await addImage(img.file);
      }

      const deleted = images.filter((img) => img.isDeleted && img.id);
      for (const img of deleted) {
        await deleteSingleImage(img.id);
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
      });
      loadData(); // refresh
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui data!",
      });
    }
  };

  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    await API.post(`/dance/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const updateSingleImage = async (imageId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    await API.put(`/dance/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteSingleImage = async (imageId) => {
    await API.delete(`/dance/${id}/image/${imageId}`);
  };

  const deleteDance = async () => {
    try {
      const result = await Swal.fire({
        title: "Hapus Tarian?",
        text: "Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
      });
      if (result.isConfirmed) {
        await API.delete(`/dance/${id}`);
        await Swal.fire({
          title: "Berhasil!",
          text: "Tarian berhasil dihapus.",
          icon: "success",
        });
        navigate(`/admin/tarian/`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus.",
        icon: "error",
      });
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
          { label: "Tarian", href: "/admin/tarian" },
          { label: "Detail" },
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
          <AddCategory
            addItem={createDanceCategory}
            loading={loadingCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailDance;
