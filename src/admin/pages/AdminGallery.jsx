import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "services/ProjectsService";

export default function AdminGallery() {
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
    navigate(`/admin/gallery/${projectId}`);
  };
  return (
    <div className="flex flex-col h-full p-6 bg-neutral-950 w-full text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8 p-6">
        {projects.map((item) => (
          <div
            key={item.projectId}
            className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
            onClick={() => handleViewGallery(item.projectId)}
          >
            <img
              src={item.mainImageUrl}
              alt={item.projectName}
              className="w-full h-[500px] object-cover transition-opacity duration-500 hover:opacity-90"
              loading="lazy"
            />
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
