import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "services/ProjectsService";
import {
  ArrowLongRightIcon,
  CalendarDateRangeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { format} from "date-fns";


export default function ProjectsOverview() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        setError("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    searchProjects();
  }, [selectedStatus]);

  const searchProjects = () => {
    const filteredResults = projects.filter((project) => {
      const matchesStatus = selectedStatus
        ? project.projectStatus === selectedStatus
        : true;
      const matchesSearchQuery = searchQuery
        ? project.projectName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.projectDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      return matchesStatus && matchesSearchQuery;
    });
    setFilteredProjects(filteredResults);
  };

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchProjects();
    }
  };

  return (
    <div className="bg-neutral-950 h-full w-full p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-100">
          Projects Overview
        </h1>
        <p className="text-gray-400 mt-2">
          Explore and manage ongoing, completed, and upcoming projects.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row justify-center">
        <div className="flex border-teal-600 bg-neutral-900 p-2 rounded-xl gap-3">
          <div className="relative">
            <select
              className="block w-fit pl-2 pr-9 py-2 rounded-lg border-2 border-teal-600 bg-neutral-900 text-gray-200 shadow-md focus:outline-none appearance-none"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
              }}
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
          <div className="flex flex-nowrap items-center gap-2 rounded-lg">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full md:min-w-96 rounded-lg px-4 py-2 bg-neutral-900 text-gray-200 focus:outline-none "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <button
              className="flex items-center justify-center p-2 rounded-full border-2 border-neutral-900 hover:border-teal-600 hover:bg-teal-600 hover:text-teal-500 hover:bg-opacity-50"
              onClick={searchProjects}
              aria-label="Search Projects"
            >
              <MagnifyingGlassIcon className="size-6 text-gray-100" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.projectId}
              className="relative text-white bg-gradient-to-b from-neutral-900 to-teal-950/50 shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-md hover:shadow-teal-900 duration-500"
            >
              <img
                src={project.mainImageUrl}
                alt={`${project.projectName} - ${project.projectDescription}`}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-neutral-950 rounded-bl-xl rounded-tr-lg pb-2 pl-2">
                <div className="flex items-center gap-3">
                  <p
                    className={`px-3 py-1.5 rounded-lg font-semibold  ${
                      project.projectStatus === "Completed"
                        ? " bg-green-600 text-green-600 bg-opacity-20"
                        : project.projectStatus === "In Progress"
                        ? " bg-sky-600 text-sky-500 bg-opacity-20"
                        : " bg-neutral-400 text-neutral-300 bg-opacity-20"
                    }`}
                  >
                    {project.projectStatus}
                  </p>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold mb-2">
                  {project.projectName}
                </h2>

                <p className="text-gray-400 mb-8 line-clamp-2">
                  {project.projectDescription}
                </p>
                <div className="flex justify-between items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <MapPinIcon className="w-6 h-6 text-teal-500" />
                    <p className="font-semibold">
                      {project.projectLocation}
                    </p>
                  </div>
                  
                </div>
                <div className="flex items-center gap-4 mb-8">
                    <CalendarDateRangeIcon className="w-6 h-6 text-teal-400" />
                    <div className="text-gray-400">
                   
                      <div className="whitespace-nowrap flex gap-2 items-center font-semibold text-white">
                        {format(project.startDate, "MM.yyyy")} 
                        <ArrowLongRightIcon className="size-5" />
                        {format(project.endDate, "MM.yyyy")}
                      </div>
                    </div>
                  </div>
                <div className="mt-auto">
                  <button
                    onClick={() => handleViewDetails(project.projectId)}
                    className="btn-primary w-full py-2"
                    aria-label={`View details for ${project.projectName}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
