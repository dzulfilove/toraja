import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import DetailAdminFilosofi from "../../../MainComponent/adminComponent/detailAdminFilosofi";
import LoaderPage from "../../loader";

const DetailPhilosophy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/philosophy/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Update title & description
  const updateText = async (title, description) => {
    try {
      setLoading(true);
      await API.put(`/philosophy/${id}`, { title, description });
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
      });
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

  const deletePhilosophy = async () => {
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
        await API.delete(`/philosophy/${id}`);
        await Swal.fire({
          title: "Berhasil!",
          text: "Filosofi berhasil dihapus.",
          icon: "success",
        });
        navigate(`/admin/filosofi/`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus Filosofi.",
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
          { label: "Filosofi", href: "/admin/filosofi" },
          { label: "Detail" },
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Filosofi"} />
      <div className="w-full h-auto flex justify-center items-start gap-6">
        <div className="w-[60%]">
          <DetailAdminFilosofi
            data={data}
            deleteData={deletePhilosophy}
            updateText={updateText}
            topic={"filosofi"}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPhilosophy;
