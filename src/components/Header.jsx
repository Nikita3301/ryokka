import React from "react";
import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <NavLink to="/" className="hover:text-gray-300">
            Landscape Management
          </NavLink>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-gray-300"
            }
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-gray-300"
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-gray-300"
            }
          >
            Project Team
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-gray-300"
            }
          >
            Gallery
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
