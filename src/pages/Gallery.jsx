import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { getAllProjects } from "services/ProjectsService";
import { getAllProjectImages } from "services/GalleryService";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function Gallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const [projects, setProjects] = useState([]);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.projectStatus === activeTab);

  const handleTabClick = (status) => {
    setActiveTab(status);
  };

  const projectStatuses = ["All", "Completed", "In Progress", "Not Started", "On Hold"];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        setError("Failed to load projects.");
      }
    };

    fetchImages();
  }, []);

  const handleViewGallery = (projectId) => {
    navigate(`/gallery/${projectId}`);
  };
  return (
    <div className="flex flex-col h-full bg-neutral-950 w-full text-neutral-300">
      {/* Tabs for project status */}
      <div className="flex gap-2 pt-6 pl-6">
        {projectStatuses.map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeTab === status
                ? "bg-teal-600 text-white"
                : "bg-neutral-800 text-gray-400"
            } hover:bg-teal-500 hover:text-white transition duration-300`}
            onClick={() => handleTabClick(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
        {filteredProjects.map((item) => (
          <div
            key={item.projectId}
            className="h-auto max-h-96 bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:shadow-xl"
          >
            <img
              src={item.mainImageUrl}
              alt={item.projectName}
              className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-90"
              loading="lazy"
            />
            {/* <div className="absolute top-0 p-4 flex flex-col gap-2">
              <div className="group flex items-center justify-center gap-3 rounded-full p-2 border-2 border-sky-800 bg-sky-600 text-sky-600 bg-opacity-30 hover:bg-opacity-50">
                <div className="flex flex-col justify-center items-center">
                  <MapIcon className="size-7" />
                </div>
                <p className="hidden group-hover:flex px-2 text-white font-semibold">
                  {item.projectLocation}
                </p>
              </div>
            </div>

            <div className="absolute top-0 right-0 bg-neutral-950 rounded-bl-xl rounded-tr-lg pb-2 pl-2">
              <div className="flex items-center gap-3">
                <p
                  className={`px-2 py-1.5 bg-opacity-70 rounded-lg font-semibold ${
                    item.projectStatus === "Completed"
                      ? "bg-green-600 text-green-200"
                      : item.projectStatus === "In Progress"
                      ? "bg-sky-600 text-sky-200"
                      : "bg-gray-600 text-gray-200"
                  }`}
                >
                  {item.projectStatus}
                </p>
              </div>
            </div> */}
            <div className="absolute flex items-center bottom-0 w-full h-fit p-4 bg-gradient-to-t from-neutral-950/95 via-neutral-950/70 to-transparent">
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">
                  {item.projectName}
                </h2>
                <div className="flex items-center gap-3">
                  <p
                    className={`px-4 py-1 bg-opacity-70 rounded-lg font-semibold text-sm ${
                      item.projectStatus === "Completed"
                        ? "bg-green-600 text-green-200"
                        : item.projectStatus === "In Progress"
                        ? "bg-sky-600 text-sky-200"
                        : "bg-gray-600 text-gray-200"
                    }`}
                  >
                    {item.projectStatus}
                  </p>
                  <p className="font-semibold text-sm inline-flex items-center gap-2">
                    <MapPinIcon className="size-4" />
                    {item.projectLocation}
                  </p>
                </div>
              </div>
              <button
                className="flex flex-col gap-4 items-center hover:text-teal-500"
                onClick={() => handleViewGallery(item.projectId)}
              >
                <ArrowRightCircleIcon className="size-10" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
