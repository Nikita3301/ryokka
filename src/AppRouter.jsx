import { React, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

import Dashboard from "pages/Dashboard";
import ProjectsOverview from "pages/ProjectsOverview";
import ProjectDetails from "pages/ProjectDetails";
import ProjectTeam from "pages/ProjectTeam";
import Gallery from "pages/Gallery";
import ProjectGallery from "pages/ProjectGallery";
import NotFound from "pages/NotFound";
import Signup from "auth/Signup";
import Login from "auth/Login";
import AdminProjects from "admin_pages/AdminProjects";
import AdminGallery from "admin_pages/AdminGallery";
import AdminProjectTeam from "admin_pages/AdminProjectTeam";
import AdminProjectDetails from "admin_pages/AdminProjectDetails";
import AdminProjectGallery from "admin_pages/AdminProjectGallery";
import PrivateRoutesLayout from "pages/PrivateRoutesLayout";


export default function AppRouter() {
  // const [user, setUser] =  useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //       console.log("User is logged in:", authUser);
  //     } else {
  //       setUser(null);
  //       console.log("User is not logged in");
  //     }
  //   });

    // Cleanup subscription on component unmount
  //   return () => unsubscribe();
  // }, []);
  // const [user, loading, error] = useAuthState(auth);
  // console.log(user, loading, error);
  // auth.onAuthStateChanged(function(user) {
  //   if (user != null) {
  //     console.log("logged")
  //   } else {
  //     console.log("unknown")
  //   }
  // });

  return (
    <div className="page-container h-full">
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsOverview />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/team" element={<ProjectTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:projectId" element={<ProjectGallery />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Login />} />
        {/* Private routes for authenticated users only */}
        <Route
          element={<PrivateRoutesLayout/>}
        >
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/:projectId" element={<AdminProjectDetails />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/gallery/:projectId" element={<AdminProjectGallery />} />
          <Route path="/admin/team" element={<AdminProjectTeam />} />
        </Route>
      </Routes>
    </div>
  );
}
