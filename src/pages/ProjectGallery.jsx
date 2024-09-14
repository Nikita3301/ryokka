import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { XMarkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { getProjectImagesById } from "services/GalleryService";
import { getProjectById } from "services/ProjectsService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "../components/ImageGallery";

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

export default function ProjectGallery() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);
  const projectId = segments[1];

  const [images, setImages] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Group images by year and sort years in reverse order
  const groupedImagesByYear = {};

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getProjectImagesById(projectId);
        setImages(data);
      } catch (error) {
        toast.error("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [projectId]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        setProject(response);
      } catch (error) {
        setProjectError("Failed to load project details.");
        console.error("Error fetching project details:", error);
      } finally {
        setProjectLoading(false);
      }
    };

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
      {/* Project Main Image */}
      {projectLoading ? (
        <Skeleton />
      ) : projectError ? (
        <p className="text-red-500">{projectError}</p>
      ) : (
        <div className="relative">
          <img
            src={project.mainImageUrl}
            alt={project.projectName}
            className="w-screen max-h-[500px] object-cover"
          />

          <div className="absolute z-50 top-5 right-5 flex items-center gap-2 ">
            <button
              onClick={() => navigate(`/projects/${projectId}`)}
              className="transition border hover:border-2 border-teal-500 flex items-center gap-2 font-semibold text-gray-200 bg-neutral-800 bg-opacity-80 px-3 py-1 rounded-full"
            >
              <span>Open project</span>
              <ArrowTopRightOnSquareIcon className="w-6 h-6 text-teal-500" />
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end">
            <div className="bg-black bg-opacity-50 text-white p-6 shadow-lg w-full space-y-4">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <h1 className="text-3xl font-bold">{project.projectName}</h1>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-neutral-800 text-sky-400  bg-opacity-60 px-4 py-1 rounded-full">
                    <MapPinIcon className="w-6 h-6 text-sky-500" />
                    <div className="font-semibold text-gray-200">
                      <div>{project.projectLocation}</div>
                    </div>
                  </div>
                  <p
                    className={`flex justify-center items-center bg-opacity-50 font-semibold px-3 py-1 rounded-full ${
                      project.projectStatus === "Completed"
                        ? "bg-green-600 text-green-200"
                        : project.projectStatus === "In Progress"
                        ? "bg-sky-600 text-sky-200"
                        : "bg-gray-600 text-gray-200"
                    }`}
                  >
                    {project.projectStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ImageGallery />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={3}
        theme="dark"
        stacked
      />
      {/* Back to Top Button */}
      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute z-50 bottom-32 right-8 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700  duration-300"
      >
        <ChevronUpIcon className="h-6 w-6" />
      </button> */}
    </div>
  );
}
