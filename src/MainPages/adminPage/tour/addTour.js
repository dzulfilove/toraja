import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const AddTour = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tourist/categories`);
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
        text: "Gagal memuat kategori wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTourist = async (title, description, category, images) => {
    try {
      setLoading(true);

      console.log(title);
      // 1. Kirim data wisata ke backend
      const response = await API.post("/tourist", {
        title: title,
        description: description,
        category: category,
      });

      const newTouristId = response.data.id;
      const imageUrls = [];

      // 2. Upload gambar ke Firebase dan simpan URL-nya
      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue;

          try {
            const storageRef = ref(
              storage,
              `tourists/${Date.now()}-${img.file.name}`
            );
            const snapshot = await uploadBytes(storageRef, img.file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            imageUrls.push(downloadURL);
          } catch (err) {
            console.error(`Gagal upload ke Firebase: ${img.file.name}`, err);
          }
        }
      }

      // 3. Kirim URL gambar ke backend
      if (imageUrls.length > 0) {
        await API.post(`/tourist/${newTouristId}/image`, { images: imageUrls });
      }

      // 4. Notifikasi sukses dan navigasi
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Wisata dan gambar berhasil ditambahkan.",
      });

      navigate(`/admin/wisata/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan wisata.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTouristCategory = async (title) => {
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

  if (loading) {
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
          { label: "Wisata", href: "/admin/wisata" },
          { label: "Tambah Wisata" },
        ]}
      />
      <HeaderAdmin title="Tambah Data Wisata" />
      <div className="w-full h-auto flex justify-between items-start gap-6">
        <div className="w-[60%]">
          <AddItems
            addItem={createTourist}
            categories={categories}
            loading={loading}
          />
        </div>
        <div className="w-[40%]">
          <AddCategory addItem={createTouristCategory} />
        </div>
      </div>
    </div>
  );
};

export default AddTour;
