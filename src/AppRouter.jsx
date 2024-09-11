import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import ProjectsOverview from "pages/ProjectsOverview";
import ProjectDetails from "pages/ProjectDetails";
import ProjectTeam from "pages/ProjectTeam";
import Gallery from "pages/Gallery";
import NotFound from "pages/NotFound";
import Signup from "auth/Signup";
import Login from "auth/Login";

export default function AppRouter() {
  return (
    <div className="page-container h-full">
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsOverview />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/team" element={<ProjectTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/signup" element={<Signup/>}/>
          <Route path="/admin/login" element={<Login/>}/>
        </Routes>
    </div>
  );
}
