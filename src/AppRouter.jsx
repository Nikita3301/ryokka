import { React } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "pages/dashboard/Dashboard";
import ProjectsOverview from "pages/projects/user/ProjectsOverview";
import ProjectDetails from "pages/projects/user/ProjectDetails";
import ProjectTeam from "pages/ProjectTeam";
import Gallery from "pages/Gallery";
import ProjectGallery from "pages/ProjectGallery";
import NotFound from "pages/NotFound";
import Signup from "auth/Signup";
import Login from "auth/Login";
import AdminProjects from "src/pages/projects/admin/AdminProjects";
import AdminGallery from "admin_pages/AdminGallery";
import AdminProjectTeam from "admin_pages/AdminProjectTeam";
import AdminProjectDetails from "pages/projects/admin/AdminProjectDetails";
import AdminProjectGallery from "admin_pages/AdminProjectGallery";
import PrivateRoutesLayout from "pages/PrivateRoutesLayout";
import Contacts from "pages/Contacts";
import Services from "pages/Services";

export default function AppRouter() {
  return (
    <div className="page-container h-full">
      <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsOverview />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/team" element={<ProjectTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:projectId" element={<ProjectGallery />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Private routes for authenticated users only */}
        <Route element={<PrivateRoutesLayout />}>
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route
            path="/admin/projects/:projectId"
            element={<AdminProjectDetails />}
          />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route
            path="/admin/gallery/:projectId"
            element={<AdminProjectGallery />}
          />
          <Route path="/admin/team" element={<AdminProjectTeam />} />
        </Route>
      </Routes>
    </div>
  );
}
