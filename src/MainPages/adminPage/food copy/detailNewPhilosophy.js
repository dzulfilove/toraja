import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const DetailNewPhilosophy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
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
      const [detailRes] = await Promise.all([API.get(`/philosophy/${id}`)]);

      setData(detailRes.data);
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

  const updateText = async (title, description, images) => {
    try {
      await setLoadingPage(true);

      await API.put(`/philosophy/${id}`, { title, description });

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
      setLoadingPage(false);
      navigate(`/admin/filosofi/`);

      loadPageData(); // refresh data
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui data!",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const addImage = async (file) => {
    try {
      const storageRef = ref(storage, `philosophys/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.post(`/philosophy/${id}/image`, {
        images: [downloadURL], // karena backend expects array of URLs
      });
    } catch (err) {
      console.error("Gagal menambahkan gambar:", err);
    }
  };

  const updateSingleImage = async (imageId, file) => {
    try {
      const storageRef = ref(storage, `philosophys/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.put(`/philosophy/${id}/image/${imageId}`, {
        image: downloadURL, // backend expects a single image URL
      });
    } catch (err) {
      console.error("Gagal update gambar:", err);
    }
  };

  const deleteSingleImage = async (imageId) => {
    await API.delete(`/philosophy/${id}/image/${imageId}`);
  };

  const deleteFood = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Hapus Filosofi?",
        text: "Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (confirm.isConfirmed) {
        setLoadingPage(true);
        console.log(id)
        await API.delete(`/philosophy/${id}`);
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Filosofi berhasil dihapus.",
        });
        navigate(`/admin/filosofi/`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus filosofi.",
      });
    } finally {
      setLoadingPage(false);
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
          { label: "Filosofi", href: "/admin/filosofi" },
          { label: "Detail" },
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Filosofi"} />
      <div className="w-full h-auto flex justify-center items-start gap-6">
        <div className="w-[60%]">
          <DetailAdmin
            data={data}
            deleteData={deleteFood}
            updateText={updateText}
            topic={"filosofi"}
            loadingUpdate={loadingUpdate}
            loadingDelete={loadingDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailNewPhilosophy;
