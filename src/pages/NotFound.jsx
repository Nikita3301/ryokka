import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center bg-neutral-900 text-white"
      style={{ backgroundImage: "url(/backimg.jpg)" }}
    >
      <h1 className="text-8xl font-bold mb-4 text-white">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found.</p>
      

      <NavLink
        to="/home"
        className="bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-300 text-white py-2 px-4 rounded-md flex items-center space-x-2"
      >
        <ArrowLeftIcon className="w-5 h-5 text-black" />
        <span className="font-semibold text-black">Go back to Home</span>
      </NavLink>
    </div>
  );
}
