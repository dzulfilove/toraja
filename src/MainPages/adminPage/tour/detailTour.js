import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const DetailTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tourist/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat detail data wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tourist/categories`);
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
        text: "Gagal memuat kategori wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTourCategory = async (title) => {
    try {
      setLoading(true);

      await API.post("/tourist/category", { name: title });
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
        text:
          err.response?.data?.message || "Gagal menambahkan kategori wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateText = async (title, category, description, images) => {
    try {
      setLoading(true);
      await API.put(`/tourist/${id}`, { title, category, description });

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
      navigate("/admin/wisata/");

      loadData();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui data!",
      });
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (file) => {
    try {
      const storageRef = ref(storage, `tourists/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.post(`/tourist/${id}/image`, {
        images: [downloadURL], // karena backend expects array of URLs
      });
    } catch (err) {
      console.error("Gagal menambahkan gambar:", err);
    }
  };

  const updateSingleImage = async (imageId, file) => {
    try {
      const storageRef = ref(storage, `tourists/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.put(`/tourist/${id}/image/${imageId}`, {
        image: downloadURL, // backend expects a single image URL
      });
    } catch (err) {
      console.error("Gagal update gambar:", err);
    }
  };

  const deleteSingleImage = async (imageId) => {
    await API.delete(`/tourist/${id}/image/${imageId}`);
  };

  const deleteTour = async () => {
    try {
      const result = await Swal.fire({
        title: "Hapus Wisata?",
        text: "Apakah Anda yakin ingin menghapus wisata ini? Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await API.delete(`/tourist/${id}`);
        await Swal.fire({
          title: "Berhasil!",
          text: "Wisata berhasil dihapus.",
          icon: "success",
        });
        navigate("/admin/wisata/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus wisata.",
        icon: "error",
      });
    }
  };

  if (loading) {
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
          { label: "Wisata", href: "/admin/wisata" },
          { label: "Detail" },
        ]}
      />
      <HeaderAdmin title="Update Detail Data Wisata" />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <DetailAdmin
            data={data}
            deleteData={deleteTour}
            updateText={updateText}
            categories={categories}
            topic="Wisata"
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createTourCategory} />
        </div>
      </div>
    </div>
  );
};

export default DetailTour;
