import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "/logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  const userNavItems = [
    { path: "/home", label: "Dashboard" },
    { path: "/projects", label: "Projects" },
    { path: "/team", label: "Project Team" },
    { path: "/gallery", label: "Gallery" },
  ];

  const adminNavItems = [
    { path: "/admin/projects", label: "Projects" },
    { path: "/admin/team", label: "Project Team" },
    { path: "/admin/gallery", label: "Gallery" },
  ];

  // useEffect(() => {
  //   auth.onAuthStateChanged(auth, (user) => {
  //     setIsLoggedIn(!!user);
  //   });
  // }, []);

  return (
    <header className="bg-neutral-900 text-white p-4">
      <nav className="px-4 flex justify-between items-center font-semibold">
        <div className="flex justify-center items-center gap-2 text-lg">
          <img src={LogoImg} alt="Logo" className="h-10 w-auto" />
          <NavLink to="/home" className="hover:text-gray-300">
            Ryokka
          </NavLink>
        </div>
        <div className="space-x-4">
          {(user ? adminNavItems : userNavItems).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-teal-400" : "hover:text-gray-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
          
        </div>
        {user && (
            <button
              onClick={handleLogout}
              className="flex gap-2 border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 hover:bg-opacity-50 px-4 py-1 rounded-lg"
            >
              Logout
              <ArrowRightStartOnRectangleIcon className="h-6 w-6"/>
            </button>
          )}
      </nav>
    </header>
  );
}
