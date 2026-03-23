import React from "react";
import profile_icon from "../assets/profile_icon.png";

const MyProfile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Profile */}
      <div className="flex items-center gap-4 border p-4 rounded">
        <img
          src={profile_icon}
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">Parkash Rana</h2>
          <p>Email: parkashrana@gmail.com</p>
          <p>Phone: 98xxxxxxxx</p>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6 border p-4 rounded">
        <h3 className="font-semibold mb-2">Address</h3>
        <p>Kanchanpur, Mahendranagar, Nepal</p>
      </div>

    </div>
  );
};

export default MyProfile;