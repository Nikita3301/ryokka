import React, { useState, useEffect } from "react";
import { getProjectImagesById } from "services/GalleryService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

import { format } from "date-fns";

export default function ProjectImagesComponent(projectId) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!projectId) {
      console.log("Waiting for projectId...");
      return;
    }

    const fetchImages = async () => {
      try {
        const data = await getProjectImagesById(projectId.projectId);
        setImages(data);
      } catch (error) {
        toast.error("Failed to load images.");
      }
    };

    fetchImages();
  }, [projectId]);

  return (
    <div className="flex flex-col h-full w-full text-gray-200">
      <Swiper
        style={{
          "--swiper-navigation-color": "#2dd4bf",
          "--swiper-pagination-color": "#2dd4bf",
        }}
        loop={false}
        spaceBetween={10}
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="max-w-full mb-2 text-teal-500 font-semibold rounded-lg"
      >
        {images
          .sort((a, b) =>
            a.isMainImage === b.isMainImage ? 0 : a.isMainImage ? -1 : 1
          )
          .map((item) => (
            <SwiperSlide key={item.imageId}>
              <div className="absolute top-0 right-0 m-2 px-3 py-1.5 bg-neutral-600/90 border-2 border-teal-600 rounded-lg text-neutral-300 pointer-events-none">
                {format(item.date, "yyyy")}
              </div>
              <img
                src={item.imageUrl}
                alt={item.projectName}
                className="w-full h-[400px] object-cover rounded-lg select-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg pointer-events-none"></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full select-none"
      >
        {images.map((item) => (
          <SwiperSlide key={item.imageId} className="relative bg-neutral-800">
            <img
              src={item.imageUrl}
              alt={item.projectName}
              className="object-cover w-full h-40 rounded-lg"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
