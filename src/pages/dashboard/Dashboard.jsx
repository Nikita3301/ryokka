import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "services/ProjectsService";
import { getAllEmployees } from "services/EmployeeService";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectSliderComponent from "./ProjectSliderComponent";
import EmployeesCardsComponent from "./EmployeesCardsComponent";
import ProjectsInfoCountBlocks from "./ProjectsInfoCountBlocks";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllProjects();
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
        <ProjectsInfoCountBlocks />
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

          <ProjectSliderComponent />

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
          <EmployeesCardsComponent />

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
