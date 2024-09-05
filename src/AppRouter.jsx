import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import ProjectsOverview from "pages/ProjectsOverview";
import ProjectDetails from "pages/ProjectDetails";
import ProjectTeam from "pages/ProjectTeam";
import Gallery from "pages/Gallery";
import NotFound from "pages/NotFound";
import Signup from "pages/admin/Signup";
import Login from "pages/admin/Login";

// const Dashboard = lazy(() => import("pages/Dashbord"));
// const ProjectsOverview = lazy(() => import("pages/ProjectsOverview"));
// const ProjectDetails = lazy(() => import("pages/ProjectDetails"));
// const ProjectTeam = lazy(() => import("pages/ProjectTeam"));
// const Gallery = lazy(() => import("pages/Gallery"));
// const NotFound = lazy(() => import("pages/NotFound"));

export default function AppRouter() {
  return (
    <div className="page-container h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsOverview />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/team" element={<ProjectTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/signup" element={<Signup/>}/>
          <Route path="/admin/login" element={<Login/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}
