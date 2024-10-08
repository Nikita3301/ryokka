import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "services/ProjectsService";
import { getAllEmployees } from "services/EmployeeService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Grid, EffectCoverflow, Pagination } from "swiper/modules";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState(null);
  const [numOfCompleted, setNumOfCompleted] = useState(null);
  const [NumOfInProgress, setNumOfInProgress] = useState(null);
  const countProjectsByStatus = (projects) => {
    return projects.reduce((acc, project) => {
      acc[project.projectStatus] = (acc[project.projectStatus] || 0) + 1;
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        setCompletedProjects(
          data.filter((project) => project.projectStatus === "Completed")
        );
      } catch (error) {
        console.log("Failed to load projects.");
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const projectsCountByStatus = countProjectsByStatus(projects);
    setNumOfCompleted(projectsCountByStatus["Completed"] || 0);
    setNumOfInProgress(projectsCountByStatus["In Progress"] || 0);
  }, [projects]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setNumberOfEmployees(data.length);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col h-full w-full text-neutral-200">
      <section className="bg-[url('https://gregrichdvm.com/wp-content/uploads/2022/09/hedgehog.jpg')] flex flex-col gap-4 min-h-96 w-full bg-center bg-cover">
        <div className="mt-auto w-full flex p-8 text-center items-center bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent ">
          <h1 className="text-7xl font-bold">
            <span className="text-teal-400">Explore</span> landscaping projects
          </h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center text-center gap-4 py-12 px-8">
        <p className="text-center text-teal-400 font-semibold">What we offer</p>
        <h3 className="text-3xl font-semibold text-center max-w-xl">
          We're not just a platform, we're a designers presentation hub of
          projects
        </h3>
        <p className="text-neutral-400 break-words">
          Our system helps you to see created landscape projects with seamless
          photo galleries, detailed descriptions, and comparison features.
        </p>
      </section>
      <section>
        <div className="mt-auto w-full flex justify-around p-4 items-center bg-gradient-to-t from-neutral-950/90 via-neutral-950/70 to-transparent">
          <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-green-800 duration-500">
            <p className="text-xl font-bold border-2 border-green-800 bg-green-600 text-green-500 bg-opacity-30 px-4 py-1 rounded-xl">
              {numOfCompleted}
            </p>
            <p className="font-semibold">Complated projects</p>
          </div>
          <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-sky-800 duration-500">
            <p className="text-xl font-bold border-2 border-sky-800 bg-sky-600 text-sky-500 bg-opacity-30 px-4 py-1 rounded-xl">
              {NumOfInProgress}
            </p>
            <p className="font-semibold">Projects in progress</p>
          </div>
          <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-teal-800 duration-500">
            <p className="text-xl font-bold border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 px-4 py-1 rounded-xl">
              {numberOfEmployees}
            </p>
            <p className="font-semibold">Project team members</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 pt-12 px-8 w-full">
        <p className="text-center text-teal-400 font-semibold">
          Project Gallery
        </p>
        <h3 className="text-2xl font-semibold text-center">
          Our Completed Projects
        </h3>

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
          className="select-none pb-12 w-full"
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

        <NavLink
          to="/projects"
          className="flex items-center gap-2 border-4 border-teal-900 bg-neutral-900 text-teal-500 hover:bg-opacity-50 hover:bg-teal-800 px-6 py-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-500 hover:shadow-teal-900"
        >
          <span className="font-semibold">See All</span>
        </NavLink>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 p-12 px-8 w-full">
        <p className="text-center text-teal-400 font-semibold">Our Team</p>
        <h3 className="text-2xl font-semibold text-center">Our Team Members</h3>

        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2,
          }}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className="p-8 w-full h-[600px]"
        >
          {employees.map((employee) => (
            <SwiperSlide
              className="relative bg-neutral-900 rounded-xl" // Set relative position
              key={employee.employeeId}
            >
              <img
                src={employee.imageUrl}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
              {/* Overlay with employee details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity duration-300 bg-teal-600 bg-opacity-70 rounded-xl text-neutral-900">
                <div>
                  <h4 className="text-3xl font-semibold">
                    {employee.firstName} {employee.lastName}
                  </h4>
                  <p className="text-xl font-semibold py-5">
                    {employee.jobTitle}
                  </p>
                </div>
                <div className="h-12 rounded-lg text-teal-600 bg-neutral-900 flex justify-center items-center gap-4 p-3 font-semibold">
                  <EnvelopeIcon className="w-8 flex-shrink-0" />
                  <p className="select-text cursor-text">
                    {employee.email}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <NavLink
          to="/team"
          className="flex items-center gap-2 border-4 border-teal-900 bg-neutral-900 text-teal-500 hover:bg-opacity-50 hover:bg-teal-800 px-6 py-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-500 hover:shadow-teal-900"
        >
          <span className="font-semibold">See All Members</span>
        </NavLink>
      </section>

      {/* <div className="flex items-center justify-center p-4">
        <NavLink to="/admin/login" className="btn-primary py-2 text-base">
          <span className="font-semibold text-black">Go back to Login</span>
        </NavLink>
      </div> */}
    </div>
  );
}
