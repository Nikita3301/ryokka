import React, { useState, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

const ITEMS_PER_PAGE = 9; // Number of items to display per page

export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      image:
        "https://images.unsplash.com/photo-1624640258396-011d958fedf9?q=80&w=1598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Beach Paradise",
      image:
        "https://images.unsplash.com/photo-1624638853029-f2e0e724b689?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "City Skyline",
      image:
        "https://images.unsplash.com/photo-1624640258384-be888ee4684d?q=80&w=1598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Forest Trail",
      image:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Mountain Lake",
      image:
        "https://images.unsplash.com/photo-1654755149473-ac55a92f0654?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlJTIwcHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      title: "Autumn Forest",
      image:
        "https://images.unsplash.com/photo-1624638551323-dfa237f7d35d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhbmRzY2FwZSUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 7,
      title: "Desert Dunes",
      image:
        "https://images.unsplash.com/photo-1656646549697-8f6a21b8f7c2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGxhbmRzY2FwZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 8,
      title: "River Rapids",
      image:
        "https://images.unsplash.com/photo-1695587950598-4a0e840b6a59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGxhbmRzY2FwZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 9,
      title: "Snowy Peaks",
      image:
        "https://images.unsplash.com/photo-1656646549671-000665d8d8bc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxsYW5kc2NhcGUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 10,
      title: "Tropical Rainforest",
      image:
        "https://images.unsplash.com/photo-1616281677557-a40d9d9ece5e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxsYW5kc2NhcGUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 11,
      title: "Lavender Fields",
      image:
        "https://images.unsplash.com/photo-1716043016808-634ce18f5aa5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxsYW5kc2NhcGUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 12,
      title: "Cherry Blossom",
      image:
        "https://plus.unsplash.com/premium_photo-1697730379810-6f3918f7c463?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxsYW5kc2NhcGUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
    },
    // Add more items as needed
  ];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    getItemsPerPage(window.innerWidth)
  );

  // Calculate the number of items per page based on screen width
  function getItemsPerPage(width) {
    if (width >= 1280) return 12; // lg screens
    if (width >= 768) return 9; // md screens
    return 2; // sm screens
  }

  // Update items per page on window resize
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the items to display based on the current page
  const totalItems = galleryItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = galleryItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
            onClick={() => handleImageClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-90"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
              <h2 className="text-lg font-semibold text-gray-100">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-auto flex flex-col items-center justify-end">
        {" "}
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-10 ">
          <div className="relative max-w-7xl max-h-screen bg-neutral-900 rounded-lg border-2 border-teal-500">
            <div
              className="absolute top-0 right-0 bg-black rounded-bl-lg rounded-tr-lg border-b-2 border-l-2 border-teal-500 cursor-pointer"
              onClick={handleCloseModal}
            >
              <XMarkIcon className="h-7 w-7 m-2 text-teal-500" />
            </div>
            <div className="flex justify-center items-center p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-screen object-contain"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-100 text-center">
                {selectedImage.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
