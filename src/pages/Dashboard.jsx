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
import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [numOfCompleted, setNumOfCompleted] = useState(null);
  const [numOfInProgress, setNumOfInProgress] = useState(null);
  const countProjectsByStatus = (projects) => {
    return projects.reduce((acc, project) => {
      acc[project.projectStatus] = (acc[project.projectStatus] || 0) + 1;
      return acc;
    }, {});
  };

  const copyEmailToClipboard = (email, firstName, lastName) => {
    navigator.clipboard
      .writeText(email)
      .then(() =>
        toast.success(`Email of ${firstName} ${lastName} copied to clipboard!`)
      )
      .catch(() => toast.error("Failed to copy!"));
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
        console.error("Failed to load projects.");
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
          {numOfCompleted > 0 && (
            <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-green-800 duration-500">
              <p className="text-xl font-bold border-2 border-green-800 bg-green-600 text-green-500 bg-opacity-30 px-4 py-1 rounded-xl">
                {numOfCompleted}
              </p>
              <p className="font-semibold">Completed projects</p>
            </div>
          )}
          {numOfInProgress > 0 && (
            <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-sky-800 duration-500">
              <p className="text-xl font-bold border-2 border-sky-800 bg-sky-600 text-sky-500 bg-opacity-30 px-4 py-1 rounded-xl">
                {NumOfInProgress}
              </p>
              <p className="font-semibold">Projects in progress</p>
            </div>
          )}
          {numberOfEmployees > 0 && (
            <div className="flex justify-center items-center gap-4 px-6 py-2 bg-neutral-900 rounded-lg border-4 border-neutral-900 hover:border-teal-800 duration-500">
              <p className="text-xl font-bold border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 px-4 py-1 rounded-xl">
                {numberOfEmployees}
              </p>
              <p className="font-semibold">Project team members</p>
            </div>
          )}
        </div>
      </section>

      {completedProjects.length > 0 && (
        <section className="flex flex-col items-center gap-2 pt-12 px-8 w-full">
          <p className="text-center text-teal-400 font-semibold">
            Project Gallery
          </p>
          <h3 className="text-2xl font-semibold text-center">
            Our Completed Projects
          </h3>
          <p className="text-neutral-400 break-words">
            Discover the beauty and craftsmanship of our created works
          </p>

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

          <NavLink
            to="/projects"
            className="flex items-center gap-2 border-4 border-teal-900 bg-neutral-900 text-teal-500 hover:bg-opacity-50 hover:bg-teal-800 px-6 py-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-500 hover:shadow-teal-900"
          >
            <span className="font-semibold">See All</span>
          </NavLink>
        </section>
      )}

      {employees.length > 0 ? (
        <section className="flex flex-col items-center justify-center gap-2 p-12 px-8 w-full">
          <p className="text-center text-teal-400 font-semibold">Our Team</p>
          <h3 className="text-2xl font-semibold text-center">
            Our Team Members
          </h3>
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
            className="p-2 w-full h-[500px]"
          >
            {employees.map((employee) => (
              <SwiperSlide
                className="relative bg-neutral-900 rounded-xl group" // Add group class here
                key={employee.employeeId}
              >
                <img
                  src={employee.imageUrl}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="w-full h-full object-cover rounded-lg border-4 border-teal-900"
                  loading="lazy"
                />

                <div className="absolute top-0 m-2 px-3 py-1 rounded-xl bg-neutral-800/80 group-hover:opacity-0 transition-opacity duration-300">
                  <h4>{employee.jobTitle}</h4>
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-teal-600/95 via-teal-500/80 to-teal-400/30 rounded-lg text-neutral-900">
                  <div>
                    <h4 className="text-2xl font-semibold">
                      {employee.firstName} {employee.lastName}
                    </h4>
                    <p className="text-lg font-semibold py-3">
                      {employee.jobTitle}
                    </p>
                  </div>
                  <button
                    className="flex gap-4 justify-center items-center h-10 border-2 border-teal-900 bg-neutral-900 text-teal-500 hover:border-teal-500 px-6 py-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-500 hover:shadow-teal-900 font-semibold"
                    onClick={() =>
                      copyEmailToClipboard(
                        employee.email,
                        employee.firstName,
                        employee.lastName
                      )
                    }
                  >
                    <EnvelopeIcon className="w-6 flex-shrink-0" />
                    <p>Copy email</p>
                  </button>
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
      ) : (
        <section className="flex flex-col items-center justify-center gap-4 p-12 px-8 w-full">
          <p className="text-center text-teal-400 font-semibold">Our Team</p>
          <UserGroupIcon className="size-20 border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30  rounded-full p-2" />
          <h3 className="text-xl font-semibold text-center">
            No Team Members Available
          </h3>
        </section>
      )}

      <section className="bg-[url('https://gregrichdvm.com/wp-content/uploads/2022/09/hedgehog.jpg')] flex flex-col gap-4 min-h-[600px] w-full bg-center bg-cover">
        <div className="w-full h-full flex flex-col gap-8 p-8 text-center justify-center items-center bg-gradient-to-b from-neutral-950 via-neutral-950/60 to-neutral-900 ">
          <h1 className="text-7xl font-bold max-w-2xl">
            Ready to <span className="text-teal-400">Start</span> Your Project?
          </h1>
          <p className="text-center text-neutral-400">
            Contact us today to discuss your ideas and turn them into reality!
          </p>
          <div className="flex items-center justify-center p-4">
            <NavLink to="/contacts" className="btn-primary py-2 text-base">
              <span className="font-semibold text-black">Get in Touch</span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* <div className="flex items-center justify-center p-4">
        <NavLink to="/admin/login" className="btn-primary py-2 text-base">
          <span className="font-semibold text-black">Go back to Login</span>
        </NavLink>
      </div> */}

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        limit={3}
        theme="dark"
        stacked
        closeButton={false}
      />
    </div>
  );
}
