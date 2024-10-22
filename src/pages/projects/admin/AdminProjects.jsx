import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProjects } from "services/ProjectsService";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ProjectCard from "pages/projects/ProjectCard";
import NewProjectForm from "./NewProjectForm";
import ToastInit from "../../../components/ToastInit";
import { DeleteModal } from "./../../../utils/DeleteModal";
import { deleteProject } from "../../../services/ProjectsService";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");



  const [activeTab, setActiveTab] = useState("projects");

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = selectedStatus
      ? project.projectStatus === selectedStatus
      : true;
    const matchesSearchQuery = searchQuery
      ? project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.projectDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesSearchQuery;
  });

  const handleEdit = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  const handleDelete = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        console.log(data);
      } catch (error) {
        setError("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);



  return (
    <div className=" bg-neutral-950 h-full w-full p-6">
      {/* Tab Navigation */}
      <div className="pb-6 flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "projects"
              ? "bg-teal-600 text-white"
              : "bg-neutral-800 text-neutral-200"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "newProject"
              ? "bg-teal-600 text-white"
              : "bg-neutral-900 text-neutral-200"
          }`}
          onClick={() => setActiveTab("newProject")}
        >
          New Project
        </button>
      </div>
      {activeTab === "projects" ? (
        <>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:gap-6">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full md:w-1/2 rounded-lg px-4 py-2 bg-neutral-900 text-gray-200 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="relative">
              <select
                className="block w-full pl-2 pr-9 py-2 rounded-lg border-2 border-teal-600 bg-neutral-900 text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 appearance-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Not Started">Not Started</option>
                <option value="On Hold">On Hold</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon className="w-4 h-4 text-teal-700 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.projectId}
                setProjects={setProjects}
                project={project}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center">
          <NewProjectForm
            setActiveTab={setActiveTab}
            setProjects={setProjects}
          />
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ToastInit />

     
    </div>
  );
}
