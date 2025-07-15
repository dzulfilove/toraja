import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";

const DetailFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    loadPageData();
  }, [id]);

  const loadPageData = async () => {
    try {
      setLoadingPage(true);
      const [detailRes, categoryRes] = await Promise.all([
        API.get(`/food/${id}`),
        API.get(`/food/categories`),
      ]);

      setData(detailRes.data);
      const transformed = categoryRes.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setCategories(transformed);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: "Periksa koneksi atau coba lagi nanti.",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const createFoodCategory = async (title) => {
    try {
      setLoadingCategory(true);
      const formData = new FormData();
      formData.append("name", title);

      await API.post("/food/category", formData);
      await loadPageData();

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

  const updateText = async (title, category, description, images) => {
    try {
      setLoadingUpdate(true);
      await API.put(`/food/${id}`, { title, category, description });

      const editedImages = images.filter(
        (img) => img.isEdit && img.id && img.file
      );
      for (const img of editedImages) {
        await updateSingleImage(img.id, img.file);
      }

      const newImages = images.filter((img) => img.isNew && img.file);
      for (const img of newImages) {
        await addImage(img.file);
      }

      const deletedImages = images.filter((img) => img.isDeleted && img.id);
      for (const img of deletedImages) {
        await deleteSingleImage(img.id);
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
      });
      loadPageData(); // refresh data
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui data!",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    await API.post(`/food/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const updateSingleImage = async (imageId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    await API.put(`/food/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteSingleImage = async (imageId) => {
    await API.delete(`/food/${id}/image/${imageId}`);
  };

  const deleteFood = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Hapus Makanan?",
        text: "Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (confirm.isConfirmed) {
        setLoadingDelete(true);
        await API.delete(`/food/${id}`);
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Makanan berhasil dihapus.",
        });
        navigate(`/admin/makanan/`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus makanan.",
      });
    } finally {
      setLoadingDelete(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-white">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Makanan", href: "/admin/makanan" },
          { label: "Detail" },
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Makanan"} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <DetailAdmin
            data={data}
            deleteData={deleteFood}
            updateText={updateText}
            categories={categories}
            topic={"makanan"}
            loadingUpdate={loadingUpdate}
            loadingDelete={loadingDelete}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createFoodCategory} loading={loadingCategory} />
        </div>
      </div>
    </div>
  );
};

export default DetailFood;
