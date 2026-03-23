import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        {/* ====== For Add Items ========== */}
        <NavLink
          className="flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Products</p>
        </NavLink>

        {/* ====== For List  Items ========== */}
        <NavLink
          className="flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Products</p>
        </NavLink>

        {/* ====== For Orders  Items ========== */}
        <NavLink
          className="flex items-center gap-3 border border-r-0 px-3 py-2 rounded-lg"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.parcel_icon} alt="" />
          <p className="hidden md:block">Orders Products</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
