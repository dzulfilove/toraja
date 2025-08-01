import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItems from "../../../MainComponent/adminComponent/addItems";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import LoaderPage from "../../loader";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddItemsFilosofi from "../../../MainComponent/adminComponent/addItemsFilosofi";
const AddNewPhilosophy = () => {
  const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const createPhilosophy = async (title, description, images) => {
    try {
      setLoadingPage(true);

      // 1. Kirim data makanan ke backend (tanpa gambar)
      const response = await API.post("/philosophy", {
        name: title,
        description: description,
      });

      const newFoodId = response.data.id;
      const imageUrls = [];

      // 2. Upload gambar ke Firebase dan ambil URL-nya
      if (images && images.length > 0) {
        for (const img of images) {
          if (!img.file) continue;

          try {
            const storageRef = ref(
              storage,
              `philosophys/${Date.now()}-${img.file.name}`
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
        await API.post(`/philosophy/${newFoodId}/image`, { images: imageUrls });
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Filosofi dan gambar berhasil ditambahkan.",
      });
      setLoadingPage(false);

      navigate(`/admin/filosofi/`);
    } catch (err) {
      console.error("Error utama:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan filosofi.",
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

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-white">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Filosofi", href: "/admin/filosofi" },
          { label: "Tambah Filosofi" },
        ]}
      />
      <HeaderAdmin title={"Tambah Data Filosofi"} />
      <div className="w-full h-auto flex justify-center items-start gap-6">
        <div className="w-[60%]">
          <AddItemsFilosofi addItem={createPhilosophy} loading={loadingPage} />
        </div>
      </div>
    </div>
  );
};

export default AddNewPhilosophy;
