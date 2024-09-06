import React, { useState } from "react";

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
    // Add more items as needed
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>

      {/* Grid layout for gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
            onClick={() => handleImageClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover transition-opacity duration-500 hover:opacity-90"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
              <h2 className="text-lg font-semibold text-gray-100">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-7xl w-full bg-neutral-900 p-12 rounded-lg">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-colors"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto object-cover mb-4"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-100">
                {selectedImage.title}
              </h2>
              <p className="text-gray-400">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
