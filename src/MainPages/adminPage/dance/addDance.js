import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const AddDance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Ubah: dua state terpisah
  const [loadingDance, setLoadingDance] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false); // untuk fetch awal

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoadingPage(true);
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
        text: "Gagal memuat kategori tarian.",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const createDance = async (title, description, category, images) => {
    try {
      setLoadingDance(true);

      const response = await API.post("/dance", {
        name: title,
        description: description,
        category: category,
      });
      const newDanceId = response.data.id;

      const imageUrls = [];

      // Upload gambar ke Firebase
      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue;

          try {
            const storageRef = ref(
              storage,
              `dances/${Date.now()}-${img.file.name}`
            );
            const snapshot = await uploadBytes(storageRef, img.file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            imageUrls.push(downloadURL);
          } catch (err) {
            console.error(`Gagal upload ke Firebase: ${img.file.name}`, err);
          }
        }
      }

      // Kirim URL gambar ke backend
      if (imageUrls.length > 0) {
        await API.post(`/dance/${newDanceId}/image`, { images: imageUrls });
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Tarian dan gambar berhasil ditambahkan.",
      });

      navigate(`/admin/tarian/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan tarian.",
      });
    } finally {
      setLoadingDance(false);
    }
  };

  const createDanceCategory = async (title) => {
    try {
      setLoadingCategory(true);

      await API.post("/dance/category", { name: title });
      await getCategories();

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kategori tarian berhasil ditambahkan.",
      });
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          err.response?.data?.message || "Gagal menambahkan kategori tarian.",
      });
    } finally {
      setLoadingCategory(false);
    }
  };

  // Tampilkan loader jika sedang load awal atau proses
  if (loadingPage || loadingDance || loadingCategory) {
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
          { label: "Tambah Tarian" },
        ]}
      />
      <HeaderAdmin title={"Tambah Data Tarian"} />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <AddItems
            addItem={createDance}
            categories={categories}
            loading={loadingDance}
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

export default AddDance;
