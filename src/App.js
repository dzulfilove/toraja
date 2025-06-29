import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Login from "./MainPages/auth";
import HomePage from "./MainPages/home";
import SejarahPage from "./MainPages/sejarah";
import TarianPage from "./MainPages/tarian";
import MakananPage from "./MainPages/makanan";
import DetailPage from "./MainPages/detailPage";
import WisataPage from "./MainPages/wisata";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="sejarah" element={<SejarahPage />} />
          <Route path="tarian" element={<TarianPage />} />
          <Route path="makanan" element={<MakananPage />} />
          <Route path="wisata" element={<WisataPage />} />
           <Route path="/detail/:topic/:id" element={<DetailPage />} />
          {/* <Route path="layanan" element={<Services />} />
          <Route path="kontak" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
