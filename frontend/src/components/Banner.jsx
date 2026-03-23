import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 my-16 rounded-xl overflow-hidden border">
      <img className="max-w-56" src={assets.hero_img} alt="JBL Soundbox" />

      {/* Banner Content */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Fresh Sweets Delivered to Your Door
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          Delicious cakes, chocolates, and treats—fresh and ready for you!
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white transition"
        >
          Buy now
        </button>
      </div>

      <img
        className="hidden md:block max-w-80"
        src={assets.hero_img}
        alt="Controller for desktop"
      />
      <img
        className="md:hidden"
        src={assets.sm_controller_image}
        alt="Controller for mobile"
      />
    </div>
  );
};

export default Banner;
