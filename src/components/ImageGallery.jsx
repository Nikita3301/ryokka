import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getProjectImagesById } from "services/GalleryService";
import { getProjectById } from "services/ProjectsService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Skeleton loader component
const Skeleton = () => {
  return (
    <div className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-[500px] bg-neutral-700"></div>
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black via-black to-transparent p-4">
        <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default function ImageGallery(projectId) {
  const [images, setImages] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Group images by year and sort years in reverse order
  const groupedImagesByYear = {};

  useEffect(() => {
    if (!projectId) {
      // Postpone the requests until projectId is available
      console.log("Waiting for projectId...");
      return;
    }

    const fetchImages = async () => {
      try {
        const data = await getProjectImagesById(projectId.projectId);
        console.log(data);
        setImages(data);
      } catch (error) {
        toast.error("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId.projectId);
        setProject(response);
      } catch (error) {
        setProjectError("Failed to load project details.");
        console.error("Error fetching project details:", error);
      } finally {
        setProjectLoading(false);
      }
    };

    fetchImages();
    fetchProject();
  }, [projectId]);

  // Group and sort images by year
  images.forEach((image) => {
    const date = new Date(image.date);
    const year = date.getFullYear();

    if (!groupedImagesByYear[year]) {
      groupedImagesByYear[year] = [];
    }
    groupedImagesByYear[year].push(image);
  });

  // Sort years in reverse order
  const sortedYears = Object.keys(groupedImagesByYear).sort((a, b) => b - a);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 w-full text-gray-200">
      
      {sortedYears.map((year) => (
        <div key={year} className="p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">{year}</h2>
          {/* Grid layout for gallery items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 p-6">
            {loading
              ? Array(9)
                  .fill(0)
                  .map((_, index) => <Skeleton key={index} />) // Render skeleton loaders while loading
              : groupedImagesByYear[year].map((item) => (
                  <div
                    key={item.imageId}
                    className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                    onClick={() => handleImageClick(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.projectName}
                      className="w-full h-[500px] object-cover transition-opacity duration-500 hover:opacity-90"
                      loading="lazy"
                    />
                  </div>
                ))}
          </div>
        </div>
      ))}

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-10"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-7xl bg-neutral-900 rounded-lg border-2 border-teal-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-4 right-4 bg-black rounded-full border-2 border-teal-500 cursor-pointer p-1 z-10"
              onClick={handleCloseModal}
            >
              <XMarkIcon className="h-8 w-8 text-teal-500" />
            </div>

            {/* Modal content */}
            <div className="flex flex-col lg:flex-row max-h-[95vh]">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.projectName}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={3}
        theme="dark"
        stacked
      />
    </div>
  );
}
