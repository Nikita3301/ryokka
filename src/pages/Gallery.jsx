import React, { useState, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { getAllProjectImages } from "services/GalleryService";

export default function Gallery() {
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const [itemsPerPage, setItemsPerPage] = useState(
    getItemsPerPage(window.innerWidth)
  );
  // Calculate the number of items per page based on screen width
  function getItemsPerPage(width) {
    if (width >= 1280) return 12; // lg screens
    if (width >= 768) return 9; // md screens
    return 4; // sm screens
  }


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllProjectImages();
        setImages(data);
      } catch (error) {
        setError("Failed to load images.");
      }
    };

    fetchImages();
  }, []);

  // Calculate the items to display based on the current page
  const totalItems = images.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-col h-full p-6 bg-neutral-950 w-full text-gray-200">
      {/* Grid layout for gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
        {images.map((item) => (
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
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black via-black to-transparent p-4">
              <h2 className="text-lg font-semibold text-gray-100 flex justify-start">
                {item.projectName}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-auto flex flex-col items-center justify-end">
        {/* This ensures the controls are at the bottom */}
        <div className="flex items-center space-x-4 mb-4">
          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`py-2 px-4 rounded-md ${
                    pageNumber === currentPage
                      ? "bg-teal-600 text-white"
                      : "bg-neutral-700 text-gray-300 hover:bg-teal-500 hover:text-white"
                  }`}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <p className="mt-4 text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-10"
          onClick={handleCloseModal} // Close when clicking on the empty area
        >
          <div
            className="relative max-w-7xl bg-neutral-900 rounded-lg border-2 border-teal-500"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
          >
            <div
              className="absolute top-4 right-4 bg-black rounded-full border-2 border-teal-500 cursor-pointer p-1 z-10"
              onClick={handleCloseModal} // Close when clicking on the close button
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

              {/* Text Info */}
              <div className="p-4 lg:w-1/3 lg:absolute lg:bottom-0 lg:right-0 lg:bg-neutral-800 lg:rounded-tl-lg lg:rounded-br-lg lg:border-t-2 lg:border-l-2 lg:border-teal-500 lg:h-64">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">
                  {selectedImage.projectName}
                </h2>
                <p className="text-gray-300 mb-2">
                  <strong>Description:</strong>{" "}
                  {selectedImage.projectDescription}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedImage.projectStatus === "Completed"
                        ? "bg-green-600 text-green-100"
                        : selectedImage.projectStatus === "In Progress"
                        ? "bg-sky-600 text-yellow-100"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {selectedImage.projectStatus}
                  </span>
                </p>
                <p className="text-gray-300">
                  <strong>Location:</strong> {selectedImage.projectLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
