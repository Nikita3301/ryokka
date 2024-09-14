import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapIcon } from "@heroicons/react/24/solid";
import { getAllProjects } from "services/ProjectsService";
import { getAllProjectImages } from "services/GalleryService";

export default function Gallery() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

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
    <div className="flex flex-col h-full p-6 bg-neutral-950 w-full text-gray-200">
    
      {/* Grid layout for gallery items */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8 p-6">
        {projects.map((item) => (
          <div
            key={item.projectId}
            className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:shadow-xl"
            onClick={() => handleViewGallery(item.projectId)}
          >
            <img
              src={item.mainImageUrl}
              alt={item.projectName}
              className="w-full h-[500px] object-cover transition-opacity duration-500 hover:opacity-90"
              loading="lazy"
            />
            <div className="absolute top-0 p-4 flex flex-col gap-2">
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
                  className={`px-2 py-1.5 bg-opacity-70 rounded-lg  font-semibold ${
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
            </div>
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black via-black to-transparent p-4">
              <h2 className="text-lg font-semibold text-gray-100 flex justify-start">
                {item.projectName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
