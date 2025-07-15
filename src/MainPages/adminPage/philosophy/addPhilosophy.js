import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";
import AddItemsFilosofi from "../../../MainComponent/adminComponent/addItemsFilosofi";
import LoaderPage from "../../loader";

const AddPhilosophy = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createPhilosophy = async (title, description) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);

      await API.post("/philosophy", formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data Filosofi berhasil ditambahkan.",
      });

      navigate(`/admin/filosofi/`);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menambahkan data Filosofi.",
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
          { label: "Filosofi", href: "/admin/filosofi" },
          { label: "Tambah Filosofi" },
        ]}
      />
      <HeaderAdmin title={"Tambah Data Filosofi"} />
      <div className="w-full h-auto flex justify-center items-start gap-6">
        <div className="w-[60%]">
          <AddItemsFilosofi addItem={createPhilosophy} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddPhilosophy;
