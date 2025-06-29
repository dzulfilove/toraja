import React from "react";

import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListSejarah from "../MainComponent/sejarahComponent/listSejarah";
import ListFilosofi from "../MainComponent/sejarahComponent/listFilosofi";
import SejarahSection from "../MainComponent/sejarahComponent/sejarahSection";
import AsalSection from "../MainComponent/sejarahComponent/asalSection";

const SejarahPage = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <HeaderList title="Sejarah dan Asal Usul" />

      <ListSejarah />
      <SejarahSection />
      <AsalSection />
      {/* <div className="snap-start h-screen"> */}
      <ListFilosofi />
      <Footer />
      {/* </div> */}
    </div>
  );
};
export default SejarahPage;
