import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProjects } from "services/ProjectsService";

import { CalendarDateRangeIcon, MapPinIcon } from "@heroicons/react/24/solid";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import moment from "moment";


export default function ProjectsOverview() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // const [projects, setProjects] = useState([
  //   {
  //     id: 1,
  //     name: "Green Park Revamp",
  //     status: "In Progress",
  //     budget: "$25,000",
  //     startDate: "2024-01-15",
  //     endDate: "2025-06-30",
  //     location: "Central Park",
  //     description:
  //       "Revamping the green spaces in the central park to enhance aesthetics and functionality.",
  //     image:
  //       "https://images.unsplash.com/photo-1624640648158-fb2feac98e23?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
  //   },
  //   {
  //     id: 2,
  //     name: "Riverside Garden",
  //     status: "Completed",
  //     budget: "$40,000",
  //     startDate: "2023-03-01",
  //     endDate: "2023-11-15",
  //     location: "Riverside",
  //     description:
  //       "Creating a beautiful garden by the riverside, including walking paths and seating areas.",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1711255562146-0acdc7d5c659?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
  //   },
  //   {
  //     id: 3,
  //     name: "City Center Plaza",
  //     status: "Pending",
  //     budget: "$60,000",
  //     startDate: "2024-07-01",
  //     endDate: "2025-01-01",
  //     location: "City Center",
  //     description:
  //       "Designing a new plaza for the city center with green spaces and modern amenities.",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1666863910470-c5906f963cb4?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
  //   },
  // ]);

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
    navigate(`/projects/${projectId}`);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-100 px-2">
            {project.projectName}
          </h2>
          <span
            className={`inline-block px-3 py-1 text-xs text-center font-semibold rounded-full ${
              project.projectStatus === "Completed"
                ? "bg-green-600 text-green-100"
                : project.projectStatus === "In Progress"
                ? "bg-sky-600 text-yellow-100"
                : "bg-gray-600 text-gray-100"
            }`}
          >
            {project.projectStatus}
          </span>
        </div>
        {/* Show only two lines of description: line-clamp-2*/}
        <p className="text-gray-400 mb-4 line-clamp-2"> {}
          <strong>Description:</strong> {project.projectDescription}
        </p>
        <div className="flex justify-between items-center mb-4">
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
              <div>
                {moment(project.startDate).format("MM.YYYY")} -{" "}
                {moment(project.endDate).format("MM.YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => handleViewDetails(project.projectId)}
            className="w-full bg-teal-600 text-gray-100 py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
