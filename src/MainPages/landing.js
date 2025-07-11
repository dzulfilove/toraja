import React from "react";
import HomeSlider from "../MainComponent/homeComponent/homeSlider";
import MapSection from "../MainComponent/homeComponent/map";
import HomeTarian from "../MainComponent/homeComponent/homeTarian";
import HomeMakanan from "../MainComponent/homeComponent/homeMakanan";
import Footer from "../MainComponent/footer";
import HomeWisata from "../MainComponent/homeComponent/homeWisata";
import HeroWithImage from "../MainComponent/homeComponent/hero";

const LandingPage = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <div className="snap-start h-screen">
        <HeroWithImage />
      </div>
      <div className="snap-start h-screen">
        <MapSection />
      </div>

      {/* Slider Section */}
      <div className="snap-start h-screen">
        <HomeSlider />
      </div>
      <div className="snap-start h-screen">
        <HomeTarian />
      </div>
      <div className="snap-start h-screen">
        <HomeMakanan />
      </div>
      <div className="snap-start h-screen">
        <HomeWisata />
      </div>
      <div className="snap-start h-screen">
        <Footer />
      </div>
    </div>
  );
};
export default LandingPage;
