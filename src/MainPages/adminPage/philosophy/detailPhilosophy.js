import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddCategory from "../../../MainComponent/adminComponent/addCategory";
import DetailAdminFilosofi from "../../../MainComponent/adminComponent/detailAdminFilosofi";

const DetailPhilosohy = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/philosophy/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getCategories();
  }, []);

  // const getCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await API.get(`/tourist/categories`);
  //     const transformedData = res.data.map((item) => ({
  //       value: item.id,
  //       label: item.name_category,
  //     }));
  //     setCategories(transformedData);
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Gagal memuat kategori Filosofi.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    loadData();
  }, [id]);

  // const createTourCategory = async (title) => {
  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("name", title);

  //     console.log(title, "title");

  //     for (let pair of formData.entries()) {
  //       console.log(pair[0] + ": " + pair[1]);
  //     }

  //     const response = await API.post("/tourist/category", formData);

  //     await getCategories();
  //     await Swal.fire({
  //       icon: "success",
  //       title: "Berhasil!",
  //       text: "Kategori Filosofi berhasil ditambahkan.",
  //     });
  //   } catch (err) {
  //     console.error("Error utama:", err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Gagal",
  //       text: err.response?.data?.message || "Gagal menambahkan Filosofi.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // ✅ Update title & description + update/tambah gambar
  const updateText = async (title, description) => {
    try {
      console.log("update begin");
      await API.put(`/philosophy/${id}`, { title, description });
      console.log("Update title & description sukses");

      // const editedImages = images.filter(
      //   (img) => img.isEdit === true && img.id && img.file
      // );
      // for (const img of editedImages) {
      //   await updateSingleImage(img.id, img.file);
      // }

      // const newImages = images.filter((img) => img.isNew === true && img.file);
      // for (const img of newImages) {
      //   await addImage(img.file);
      // }
      // const deletedImage = images.filter(
      //   (img) => img.isDeleted === true && img.id
      // );
      // for (const img of deletedImage) {
      //   await deleteSingleImage(img.id);
      // }

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
    await API.post(`/tourist/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // Update gambar lama
  // const updateSingleImage = async (imageId, file) => {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   console.log(file, "UPDATE");

  //   await API.put(`/tourist/${id}/image/${imageId}`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };
  // const deleteSingleImage = async (imageId) => {
  //   const formData = new FormData();

  //   await API.delete(`/tourist/${id}/image/${imageId}`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };

  const deleteTour = async () => {
    try {
      const result = await Swal.fire({
        title: "Hapus Filosofi?",
        text: "Apakah Anda yakin ingin menghapus Filosofi ini? Tindakan ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const formData = new FormData();

        await API.delete(`/philosophy/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        await Swal.fire({
          title: "Berhasil!",
          text: "Filosofi berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/admin/filosofi/`);

        // opsional: reload halaman atau update state
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus Filosofi.",
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
          { label: "Filosofi", href: "/admin/filosofi" },
          { label: "Detail" }, // halaman aktif biasanya tidak ada href
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Filosofi "} />
      <div className="w-full h-auto flex justify-center items-start gap-6">
        <div className="w-[60%]">
          <DetailAdminFilosofi
            data={data}
            deleteData={deleteTour}
            updateText={updateText}
            categories={categories}
            topic={"filosofi"}
          />
        </div>
        {/* <div className="w-[40%]">
          <AddCategory addItem={createTourCategory} />
        </div> */}
      </div>
    </div>
  );
};

export default DetailPhilosohy;
