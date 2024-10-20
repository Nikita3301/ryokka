import React, { useState, useEffect } from "react";
import { getAllProjects } from "services/ProjectsService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/grid";
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function ProjectSliderComponent() {
  const [projects, setProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        setCompletedProjects(
          data.filter((project) => project.projectStatus === "Completed")
        );
      } catch (error) {
        console.error("Failed to load projects.");
      }
    };

    fetchImages();
  }, []);

  return (
    <Swiper
    effect={"coverflow"}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={"auto"}
    coverflowEffect={{
      rotate: 60,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    pagination={true}
    modules={[EffectCoverflow, Pagination]}
    className="select-none p-12 w-full"
  >
    {completedProjects.map((project) => (
      <SwiperSlide
        className="bg-neutral-900 rounded-lg block_shadow_effects hover:shadow-teal-900 max-w-lg"
        key={project.projectId}
      >
        <img
          src={project.mainImageUrl}
          alt={project.projectName}
          className="w-full h-72 object-cover rounded-t-lg"
          loading="lazy"
        />
        <h4 className="p-4 text-xl font-semibold text-teal-400">
          {project.projectName}
        </h4>
        <p className="p-4 pt-2 line-clamp-2 text-neutral-400">
          {project.projectDescription}
        </p>
      </SwiperSlide>
    ))}
  </Swiper>
  );
}
