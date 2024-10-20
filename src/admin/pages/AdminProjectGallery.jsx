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
  CloudArrowUpIcon,
  StarIcon as StarSolidIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import { format} from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getProjectImagesById,
  setMainImage,
  uploadImages,
  deleteImageById,
} from "services/GalleryService";
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

import { DeleteModal } from "utils/DeleteModal";

export default function AdminProjectGallery() {
  const { projectId } = useParams();

  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelItem, setSelectedDelItem] = useState(null);
  const [isDelModalOpen, setIsDeleteModalOpen] = useState(false);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // Store image preview URLs

  // Group images by year and sort years in reverse order
  const groupedImagesByYear = {};

  const fetchImages = async () => {
    try {
      const data = await getProjectImagesById(projectId);
      console.log("projectImg", data, projectId);
      setImages(data);
    } catch (error) {
      toast.error("Failed to load images.");
      console.error(error);
    } finally {
      setLoadingImages(false);
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

  useEffect(() => {
    if (!projectId) {
      // Postpone the requests until projectId is available
      console.log("Waiting for projectId...");
      return;
    }
    fetchImages();
    fetchProject();
  }, [projectId]);

  const handleSetMainImage = async (imageId) => {
    try {
      await setMainImage(imageId, projectId);
      // Update the images state to reflect the new main image
      setImages((prevImages) =>
        prevImages.map((img) => ({
          ...img,
          isMainImage: img.imageId === imageId,
        }))
      );
      const mainImage = images.find((img) => img.imageId === imageId);
      if (mainImage) {
        setProject((prevProject) => ({
          ...prevProject,
          mainImageUrl: mainImage.imageUrl,
        }));
      }
    } catch (error) {
      console.error("Failed to set main image:", error);
    }
  };

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
    const files = Array.from(event.target.files);
    console.log("files", files);

    // Create a new array with file objects including the date as null initially
    const filesWithDates = files.map((file) => ({
      file,
      date: null,
    }));

    setSelectedFiles(filesWithDates);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one image.");
      return;
    }

    const filesWithoutDate = selectedFiles.some((file) => !file.date);
    if (filesWithoutDate) {
      toast.error("Please provide a date for each image.");
      return;
    }

    try {
      toast.info("Uploading images!");
      const formData = new FormData();
      console.log("selectedFiles", selectedFiles);
      selectedFiles.forEach((fileObj, index) => {
        formData.append(`files`, fileObj.file);
        formData.append(`dates`, fileObj.date.toISOString().split("T")[0]);
      });

      console.log("form", Object.fromEntries(formData.entries()));

      await uploadImages(formData, projectId);
      setLoading(true);

      toast.success("Images uploaded successfully!");
      setSelectedFiles([]); // Clear file input
      setImagePreviews([]); // Clear preview URLs
      fetchImages();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to upload images.");
      setLoading(false);
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

  const handleDeleteClick = (item) => {
    setSelectedDelItem(item);
    if(item.isMainImage){
      toast.error("Select another main image before deleting!");
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if(selectedDelItem.isMainImage){
      toast.error("Select another main image before deleting!");
    }else{
      try {
        await deleteImageById(selectedDelItem.imageId);
        toast.success("Image deleted successfully.");
        setImages(images.filter((item) => item !== selectedDelItem));
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete the image.");
      }
      setIsDeleteModalOpen(false);
    }
    
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
                  <MapPinIcon className="size-5 text-teal-500" />
                  Location
                </td>
                <td className="py-2">{project.projectLocation}</td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold">
                  <div className="py-2 flex items-center gap-2">
                    <ExclamationCircleIcon className="size-5 text-teal-500" />
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
                  <CalendarDateRangeIcon className="size-5 text-teal-500" />
                  Dates
                </td>
                <td className="py-2">
                  <div className="flex gap-2 items-center">
                    {format(project.startDate, "dd.MM.yyyy")}
                    <ArrowLongRightIcon className="size-5" />{" "}
                    {format(project.endDate, "dd.MM.yyyy")}
                  </div>
                </td>
              </tr>
              <tr className="*:px-4">
                <td className="py-2 font-semibold flex items-center gap-2">
                  <CurrencyDollarIcon className="size-5 text-teal-500" />
                  Budget
                </td>
                <td className="py-2">{project.projectBudget}</td>
              </tr>
              <tr className="*:px-4">
                <td className="py-4 font-semibold flex items-center gap-2 justify-center">
                  <UserGroupIcon className="size-5 text-teal-500" />
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
                  <DocumentTextIcon className="size-5 text-teal-500" />
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
      <div className="mt-4 flex justify-center items-center gap-5">
        <h1 className="text-2xl text-center font-semibold">
          Upload new photos
        </h1>
      </div>
      <div className="flex items-center w-full gap-4 p-4">
        {/* Add More Photos Button */}
        <div
          className={`flex items-center justify-center ${
            selectedFiles.length === 0 ? "w-full" : ""
          }`}
        >
          <div className="p-4 flex flex-col justify-center">
            <div className="size-64 rounded-xl object-cover border-2 border-teal-500 bg-neutral-800 flex flex-col items-center justify-center">
              <PhotoIcon className="size-20" />
            </div>
            <div className="flex justify-center items-center p-4">
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
          </div>
        </div>

        <div
          className={`w-full h-full ${
            selectedFiles.length === 0 ? "hidden" : ""
          }`}
        >
          <div className="flex items-center gap-4 justify-center overflow-x-auto p-4">
            {selectedFiles.map((fileObj, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={imagePreviews[index]}
                  alt={`Preview ${index}`}
                  className="size-64 object-cover rounded-lg shadow-md mb-2"
                />
                <DatePicker
                  showIcon
                  icon={
                    <CalendarDateRangeIcon className="size-5 text-teal-500" />
                  }
                  className="flex text-center py-1.5 font-semibold bg-neutral-800 rounded-md border-2 border-teal-400 text-gray-100 focus:outline-none"
                  selected={fileObj.date}
                  onChange={(date) =>
                    setSelectedFiles((prevFiles) =>
                      prevFiles.map((file, i) =>
                        i === index ? { ...file, date: date } : file
                      )
                    )
                  }
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show Upload Button when Files are Selected */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpload}
            className="flex justify-center items-center gap-2 w-fit border-2 border-sky-800 bg-sky-600 text-sky-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
          >
            <CloudArrowUpIcon className="size-5 inline" />
            Upload Selected Photos
          </button>
        </div>
      )}

      {/* <ImageGalleryComponent projectId={projectId} /> */}

      <div className="flex flex-col h-full bg-neutral-950 w-full text-gray-200">
        {sortedYears.map((year) => (
          <div key={year} className="p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">{year}</h2>
            {/* Grid layout for gallery items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
              {loadingImages
                ? Array(9)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} />)
                : groupedImagesByYear[year].map((item) => (
                    <div
                      key={item.imageId}
                      className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:shadow-xl"
                      onClick={() => handleImageClick(item)}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.projectName}
                        className="w-full h-[500px] object-cover transition-opacity duration-500 hover:opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute top-0 right-0 bg-neutral-950 rounded-bl-xl rounded-tr pb-2 pl-2">
                        {item.isMainImage ? (
                          <div className="group flex gap-2 items-center bg-teal-600 text-teal-200 bg-opacity-70  rounded-lg px-3 py-1.5 cursor-default">
                            <p className="font-semibold ">Main image</p>
                            <StarSolidIcon className="size-6" />
                          </div>
                        ) : (
                          <button
                            className="group flex gap-2 items-center bg-teal-600 text-teal-200 bg-opacity-70 hover:bg-opacity-50 rounded-lg px-3 py-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetMainImage(item.imageId);
                            }}
                          >
                            <p className="font-semibold ">Set as main</p>
                            <StarIcon className="size-6 group-hover:hidden" />
                            <StarSolidIcon className="size-6 hidden group-hover:flex" />
                          </button>
                        )}
                      </div>

                      <div className="absolute bottom-0 right-0 bg-neutral-950 rounded-tl-xl rounded-br pt-2 pl-2">
                        <button
                          className="flex gap-2 items-center bg-red-600 text-red-200 bg-opacity-70 hover:bg-opacity-50 rounded-lg px-3 py-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(item);
                          }}
                        >
                          <p className="font-semibold ">Delete</p>
                          <TrashIcon className="size-6 group-hover:flex" />
                        </button>
                      </div>
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
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDelModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteConfirm}
      />

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
