import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const DetailHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoadingPage(true);
      const res = await API.get(`/history/${id}`);
      console.log(res.data, "data detail");
      setData(res.data);
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
      setLoadingUpdate(true);
      await API.put(`/history/${id}`, { title, description });
      console.log("Update title & description sukses",images);

      const editedImages = images.filter((img) => img.isEdit && img.id && img.file);
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
        navigate(`/admin/sejarah/`);

      loadData(); // refresh data
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui data!",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

    const addImage = async (file) => {
    try {
      const storageRef = ref(storage, `historys/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.post(`/history/${id}/image`, {
        images: [downloadURL], // karena backend expects array of URLs
      });
    } catch (err) {
      console.error("Gagal menambahkan gambar:", err);
    }
  };

  const updateSingleImage = async (imageId, file) => {
    try {
      const storageRef = ref(storage, `historys/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await API.put(`/history/${id}/image/${imageId}`, {
        image: downloadURL, // backend expects a single image URL
      });
    } catch (err) {
      console.error("Gagal update gambar:", err);
    }
  };

  const deleteSingleImage = async (imageId) => {
    await API.delete(`/history/${id}/image/${imageId}`);
  };

  if (loadingPage||loadingUpdate) {
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
          { label: "Sejarah", href: "/admin/sejarah" },
          { label: "Detail" },
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Sejarah"} />
      <DetailAdmin
        data={data}
        updateText={updateText}
        categories={[]} // history tidak ada kategori
        topic={"sejarah"}
        loadingUpdate={loadingUpdate}
      />
    </div>
  );
};

export default DetailHistory;
