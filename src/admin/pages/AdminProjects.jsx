import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProjects } from "services/ProjectsService";

import { CalendarDateRangeIcon, MapPinIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { format} from "date-fns";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const handleViewDetails = (projectId) => {
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
      } finally {
        // setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className=" bg-neutral-950 h-full w-full p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-100">
          Projects Overview
        </h1>
        <p className="text-gray-400 mt-2">
          Explore and manage ongoing, completed, and upcoming projects.
        </p>
      </div>

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
          <div
            key={project.projectId}
            className="bg-neutral-900 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={project.mainImageUrl}
              alt={project.projectName}
              loading="lazy"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4 gap-3">
                <h2 className="text-2xl font-semibold text-gray-100">
                  {project.projectName}
                </h2>
                <span
                  className={`inline-block px-3 py-1 whitespace-nowrap text-sm text-center font-semibold rounded-full ${
                    project.projectStatus === "Completed"
                      ? "bg-green-600 text-green-600 bg-opacity-20"
                      : project.projectStatus === "In Progress"
                      ? "bg-sky-500 text-sky-500 bg-opacity-20"
                      : "bg-neutral-300 text-neutral-300 bg-opacity-20"
                  }`}
                >
                  {project.projectStatus}
                </span>
              </div>
              {/* Show only two lines of description: line-clamp-2*/}
              <p className="text-gray-400 mb-4 line-clamp-2">
                <strong>Description:</strong> {project.projectDescription}
              </p>
              <div className="flex justify-between items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <MapPinIcon className="w-6 h-6 text-sky-500" />
                  <div className="text-gray-400">
                    <strong>Location:</strong>
                    <div>{project.projectLocation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CalendarDateRangeIcon className="w-6 h-6 text-amber-400" />
                  <div className="text-gray-400">
                    <strong>Dates:</strong>
                    <div className="whitespace-nowrap ">
                      {format(project.startDate,"MM.yyyy")} -{" "}
                      {format(project.endDate, "MM.yyyy")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col lg:flex-row gap-1 justify-between">
                <button
                  onClick={() => handleViewDetails(project.projectId)}
                  className="flex items-center justify-center gap-2 font-semibold bg-neutral-800 hover:bg-sky-800 border-2 border-sky-700 text-sky-700 py-1.5 px-2 rounded-lg "
                >
                    <PencilIcon className="w-6 h-6 "/>
                  View and Update
                </button>
                <button
                  onClick={() => handleViewDetails(project.projectId)}
                  className="flex items-center justify-center gap-2 font-semibold bg-neutral-800 hover:bg-red-800 border-2 border-red-700 text-red-700 py-1.5 px-2 rounded-lg "
                >
                  <TrashIcon className="w-6 h-6 " />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
