import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function AppRouter() {
  return (
    <div className="page-container h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsOverview />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/resources" element={<ResourceManagement />} />
          <Route path="/budgeting" element={<BudgetingReports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
