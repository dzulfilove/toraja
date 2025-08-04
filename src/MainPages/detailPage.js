import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailHeader from "../MainComponent/detailComponent/detailHeader";
import DetailContent from "../MainComponent/detailComponent/detailContent";
// import DetailGallery from "../MainComponent/detailComponent/detailGallery";
import Footer from "../MainComponent/footer";
import API from "../config/api";
import LoaderPage from "./loader"; // pastikan file loader ada
import SliderImage from "../MainComponent/listComponent/sliderImages";

const DetailPage = () => {
  const { id, topic } = useParams();
  const [data, setData] = useState(null); // null default lebih aman
  const [allData, setAllData] = useState(null); // null default lebih aman
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/${topic}/${id}`);
      console.log(res.data, "detail");
      setData(res.data);
      // await getData();
      setTitle(res.data.title);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    loadData();
  }, [id, topic]); // tambahkan dependency jika ganti id/topic

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  // opsional: handle jika data null atau error
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Data tidak tersedia."}</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <DetailHeader data={data} />
      <DetailContent data={data} />
      <SliderImage data={data.images} title={title} />
      <Footer />
    </div>
  );
};

export default DetailPage;
