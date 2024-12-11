import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "services/ProjectsService";
import { getProjectImagesById } from "services/GalleryService";
import {
  UserCircleIcon,
  MapPinIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { format } from "date-fns";
import ImageGalleryComponent from "../../../components/ImageGalleryComponent";
import ProjectImagesComponent from "../ProjectImagesComponent";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("Gallery");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        console.log(response);
        setProject(response);
      } catch (error) {
        toast.error("Error fetching project details");
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getProjectImagesById(projectId);
        setImages(data);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    fetchImages();
  }, [projectId]);

  if (!project) return <p className="text-neutral-400">Loading...</p>;

  return (
    <div className="h-screen bg-black text-neutral-200">
      <section className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectImagesComponent projectId={projectId} />

          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-3xl font-bold">{project.projectName}</h1>
            <div className="flex gap-8">
              <div className="flex items-center text-neutral-500 gap-2 py-1 rounded-full">
                <MapPinIcon className="w-6 h-6" />
                <div className="font-semibold">
                  <div>{project.projectLocation}</div>
                </div>
              </div>
              <p
                className={`flex justify-center items-center bg-opacity-50 font-semibold px-3 py-1 rounded-lg ${
                  project.projectStatus === "Completed"
                    ? "bg-green-600/20 text-green-600"
                    : project.projectStatus === "In Progress"
                    ? "bg-sky-500/20 text-sky-500"
                    : "bg-neutral-300/20 text-neutral-300"
                }`}
              >
                {project.projectStatus}
              </p>
            </div>

            <div className=" flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Client</p>
              <div className="flex items-center justify-start gap-4 bg-neutral-900 pl-2 pr-4 py-2 rounded-lg w-fit">
                <UserCircleIcon className="size-8 text-purple-500" />
                {project.client.firstName} {project.client.lastName}
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Overview</p>

              <div className="w-fit p-2 bg-neutral-900 rounded-lg font-semibold">
                <table className="table-auto text-left text-neutral-300">
                  <tbody>
                    <tr className="border-b border-neutral-700">
                      <td className="flex items-center gap-3 whitespace-nowrap px-4 py-2 border-r border-neutral-700">
                        <RocketLaunchIcon className="size-6 text-amber-400" />
                        <span>Start date</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        {format(project.startDate, "dd MMM yyyy")}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-700">
                      <td className="flex items-center gap-3 whitespace-nowrap px-4 py-2 border-r border-neutral-700">
                        <CheckBadgeIcon className="size-6 text-green-500" />
                        <span>End date</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 ">
                        {format(project.endDate, "dd MMM yyyy")}
                      </td>
                    </tr>
                    <tr>
                      <td className="flex items-center gap-3 whitespace-nowrap px-4 py-2 border-r border-neutral-700">
                        <CurrencyDollarIcon className="size-6 text-purple-500" />
                        <span>Budget</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        ${project.projectBudget}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Description</p>
              <p className="text-neutral-400">{project.projectDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="p-2">
        <div className="flex justify-around font-semibold border-b border-neutral-700 mb-6 ">
          <button
            className={`px-4 py-2 border-b-2 ${
              activeTab === "Gallery" ? " border-b-teal-500" : ""
            }`}
            onClick={() => setActiveTab("Gallery")}
          >
            Gallery
          </button>
          <button
            className={`px-4 py-2 border-b-2 ${
              activeTab === "Employees" ? "border-b-teal-500" : ""
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            Employees
          </button>

          <button
            className={`px-4 py-2 border-b-2 ${
              activeTab === "Resources" ? "border-b-teal-500" : ""
            }`}
            onClick={() => setActiveTab("Resources")}
          >
            Resources
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Employees" && (
            <div>
              {project.employees.length > 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {project.employees.map((employee) => (
                      <div
                        key={employee.employeeId}
                        className="bg-neutral-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105"
                      >
                        <img
                          src={employee.imageUrl}
                          alt={employee.firstName}
                          className="w-52 h-52 rounded-xl mb-4 object-cover"
                        />
                        <h3 className="text-lg font-semibold mb-2 text-neutral-100">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          {employee.jobTitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Loading team members...</p>
              )}
            </div>
          )}

          {activeTab === "Resources" && (
            <div className="overflow-x-auto">
              {project.resources.length > 0 ? (
                <table className="min-w-full divide-y divide-neutral-900 ">
                  <thead className="bg-neutral-950 text-neutral-400 text-sm font-medium text-center">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3 text-left">Description</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Unit of Measure</th>

                      <th className="px-6 py-3">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral-900 divide-y text-center divide-neutral-600 text-sm">
                    {project.resources.map((resource) => (
                      <tr key={resource.resourceId}>
                        <td className="px-6 py-4">{resource.resourceName}</td>
                        <td className="px-6 py-4 text-left">
                          {resource.resourceDescription}
                        </td>
                        <td className="px-6 py-4">{resource.resourceType}</td>
                        <td className="px-6 py-4">{resource.unitOfMeasure}</td>
                        <td className="px-6 py-4">{resource.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-neutral-300">No resources available.</p>
              )}
            </div>
          )}

          {activeTab === "Gallery" && (
            <div>
              <ImageGalleryComponent projectId={projectId} />
            </div>
          )}
        </div>
      </div>
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

