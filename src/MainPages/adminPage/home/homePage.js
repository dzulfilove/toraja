import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";
import Swal from "sweetalert2";
import DashboardComponent from "../../../MainComponent/adminComponent/dashboard";

export default function HomeAdmin() {
  const [data, setData] = useState([]);

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-8 bg-white">
      {/* <HeaderAdmin title={"Kelola Data Tarian Tradisional"} /> */}
      <DashboardComponent />
    </div>
  );
}
