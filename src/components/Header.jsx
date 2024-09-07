import React from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "/logo.svg"

export default function Header() {
  return (
    <header className="bg-neutral-900 text-white p-4">
      <nav className="px-4 flex justify-between items-center font-semibold">
        <div className="flex justify-center items-center gap-2 text-lg">
          <img
            src={LogoImg}
            alt="Logo"
            className="h-10 w-auto"
          />
          <NavLink to="/home" className="hover:text-gray-300">
          Ryokka    
          </NavLink>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-teal-400" : "hover:text-gray-300"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-teal-400" : "hover:text-gray-300"
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive ? "text-teal-400" : "hover:text-gray-300"
            }
          >
            Project Team
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "text-teal-400" : "hover:text-gray-300"
            }
          >
            Gallery
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
