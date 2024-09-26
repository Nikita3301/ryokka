import React from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-full justify-center items-center">

      {/* <img
        src="https://gregrichdvm.com/wp-content/uploads/2022/09/hedgehog.jpg"
        alt=""
      /> */}
      <NavLink
        to="/admin/login"
        className="bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-300 text-white py-2 px-4 rounded-md flex items-center space-x-2"
      >
        <span className="font-semibold text-black">Go back to Login</span>
      </NavLink>
    </div>
  );
}
