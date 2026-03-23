import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Banner />
      <OurPolicy />
    </div>
  );
};

export default Home;
