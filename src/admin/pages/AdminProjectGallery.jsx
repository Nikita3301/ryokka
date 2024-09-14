import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  XMarkIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarDateRangeIcon,
  PlusIcon,
  ArrowLongRightIcon,
  ExclamationCircleIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/solid";
import {
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import moment from "moment";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getProjectImagesById } from "services/GalleryService";
import { getProjectById } from "services/ProjectsService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "components/ImageGallery";

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

export default function AdminProjectGallery() {
  const { projectId } = useParams();

  //   const navigate = useNavigate();
  //   const path = window.location.pathname;
  //   const segments = path.split("/").filter(Boolean);
  //   const projectId = segments[1];

  const [images, setImages] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs

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
        const data = await getProjectImagesById(projectId);
        console.log("projectImg", data, projectId);
        setImages(data);
      } catch (error) {
        toast.error("Failed to load images.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        setProject(response);
        console.log("proj", response, projectId);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await uploadProjectImages(projectId, formData); // API call to upload images
      toast.success("Images uploaded successfully!");
      setSelectedFiles([]); // Clear file input after successful upload
      setImagePreviews([]); // Clear preview URLs
    } catch (error) {
      toast.error("Failed to upload images.");
    }
  };
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

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end">
            <div className="bg-black bg-opacity-50 text-white p-6 shadow-lg w-full space-y-4">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <h1 className="text-3xl font-bold">{project.projectName}</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Table */}
      <div className="p-6 flex justify-center">
        {project && (
          <table>
            <tbody>
              <tr className="*:px-4">
                <td className="py-2 font-semibold flex items-center gap-2">
                  <MapPinIcon className="size-5 text-sky-500" />
                  Location
                </td>
                <td className="py-2">{project.projectLocation}</td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold">
                  <div className="py-2 flex items-center gap-2">
                    <ExclamationCircleIcon className="size-5" />
                    Status
                  </div>
                </td>
                <td className="h-full">
                  <div
                    className={`px-4 w-fit py-1 flex justify-center items-center gap-2 font-semibold rounded-lg ${
                      project.projectStatus === "Completed"
                        ? " bg-green-600 text-green-600 bg-opacity-20"
                        : project.projectStatus === "In Progress"
                        ? " bg-sky-600 text-sky-500 bg-opacity-20"
                        : " bg-neutral-400 text-neutral-300 bg-opacity-20"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCircle} className="size-2" />
                    {project.projectStatus}
                  </div>
                </td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold flex items-center gap-2">
                  <CalendarDateRangeIcon className="size-5" />
                  Dates
                </td>
                <td className="py-2">
                  <div className="flex gap-2 items-center">
                    {moment(project.startDate).format("DD.MM.YYYY")}
                    <ArrowLongRightIcon className="size-5" />{" "}
                    {moment(project.endDate).format("DD.MM.YYYY")}
                  </div>
                </td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold flex items-center gap-2">
                  <CurrencyDollarIcon className="size-5" />
                  Budget
                </td>
                <td className="py-2">{project.projectBudget}</td>
              </tr>
              <tr className="*:px-4">
                <td className="py-4 font-semibold flex items-center gap-2 justify-center">
                  <UserGroupIcon className="size-5" />
                  Employees
                </td>
                <td className="py-2 text-center">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {project.employees.map((employee) => (
                      <div
                        key={employee.employeeId}
                        className="bg-neutral-900 flex gap-3 items-center rounded-lg py-1 px-3"
                      >
                        <img
                          src={employee.imageUrl}
                          alt={employee.firstName}
                          className="size-7 rounded-full object-cover"
                        />
                        <h3 className=" text-neutral-300">
                          {employee.firstName} {employee.lastName} (
                          {employee.jobTitle})
                        </h3>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold flex items-center gap-2">
                  <DocumentTextIcon className="size-5" />
                  Description
                </td>
                <td className="py-2">
                  <textarea
                    value={project.projectDescription}
                    className="bg-neutral-800 p-2 rounded-lg focus:outline-none w-full select-none	"
                    name="projectDescription"
                    id="projectDescription"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Add More Photos Button */}
      <div className="mt-4 flex justify-center items-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
            className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
        >
              <PlusIcon className="w-5 h-5 inline" />
          Add More Photos
        </label>
      </div>

      {/* Preview Selected Images */}
      {imagePreviews.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="size-64 object-cover rounded-lg shadow-md"
              />
              {/* Optionally, add a delete button to remove a selected image */}
            </div>
          ))}
        </div>
      )}

      {/* Show Upload Button when Files are Selected */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpload}
             className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
          >
<CloudArrowUpIcon className="size-5 inline"/>
            Upload Selected Photos
          </button>
        </div>
      )}

      <ImageGallery projectId={projectId} />

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
