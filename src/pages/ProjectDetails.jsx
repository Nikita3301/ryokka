import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "services/ProjectsService";
import {
  UserCircleIcon,
  MapPinIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

import moment from "moment";

export default function ProjectDetails() {
  const { projectId } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("General");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        console.log(response);
        setProject(response);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200">
      {/* Main Project Image */}
      <div className="relative">
        <img
          src={project.mainImageUrl}
          alt={project.projectName}
          className="w-screen max-h-[700px] object-cover"
        />

        {/* Overlay with Project Information */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end">
          <div className="bg-black bg-opacity-50 text-white p-6  shadow-lg w-full space-y-4">
            {/* Project Basic Information */}
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              <h1 className="text-3xl font-bold">{project.projectName}</h1>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-neutral-800 text-sky-400 bg-opacity-50 px-3 py-1 rounded-full">
                  <MapPinIcon className="w-6 h-6 text-sky-500" />
                  <div className="font-semibold text-gray-200">
                    <div>{project.projectLocation}</div>
                  </div>
                </div>
                <p
                  className={`flex justify-center items-center bg-opacity-50 font-semibold px-3 py-1 rounded-full ${
                    project.projectStatus === "Completed"
                      ? "bg-green-600 text-green-200"
                      : project.projectStatus === "In Progress"
                      ? "bg-sky-600 text-sky-200"
                      : "bg-gray-600 text-gray-200"
                  }`}
                >
                  {project.projectStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-2">
        <div className="flex justify-around font-semibold border-b border-neutral-700 mb-6 ">
          <button
            className={`px-4 py-2 ${
              activeTab === "General" ? "border-b-2 border-sky-500" : ""
            }`}
            onClick={() => setActiveTab("General")}
          >
            General
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Employees" ? "border-b-2 border-sky-500" : ""
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            Employees
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Invoices" ? "border-b-2 border-sky-500" : ""
            }`}
            onClick={() => setActiveTab("Invoices")}
          >
            Invoices
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Resources" ? "border-b-2 border-sky-500" : ""
            }`}
            onClick={() => setActiveTab("Resources")}
          >
            Resources
          </button>

          <button
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "Gallery" ? "text-sky-500 border-b-2 border-sky-500" : "text-gray-400"
            } transition-transform duration-300 ease-in-out transform hover:scale-105`}
            onClick={() => setActiveTab("Gallery")}
          >
            Gallery
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "General" && (
            <div className=" flex flex-col justify-center items-center">
              <div className="rounded-lg space-y-6 font-medium max-w-7xl">
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
                  <p className="text-neutral-500 font-semibold">Client</p>
                  <div className="flex items-center gap-4">
                    <UserCircleIcon className="w-12 h-12 text-purple-500" />
                    {project.client.firstName} {project.client.lastName}
                  </div>
                </div>
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
                  <p className="text-neutral-500 font-semibold">Description</p>
                  {project.projectDescription}
                </div>

                <div className="flex flex-col md:flex-row gap-4 ">
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/4 min-w-56">
                    <p className="text-neutral-500 font-semibold">Location</p>
                    <MapPinIcon className="w-12 h-12 text-sky-500" />
                    <p>{project.projectLocation}</p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/4 min-w-36">
                    <p className="text-neutral-500 font-semibold">Start date</p>
                    <RocketLaunchIcon className="w-12 h-12 text-amber-400" />
                    <p>{moment(project.startDate).format("MMM Do YYYY")}</p>
                    <p></p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/4 min-w-36">
                    <p className="text-neutral-500 font-semibold">End date</p>
                    <CheckBadgeIcon className="w-12 h-12 text-green-500" />
                    <p>{moment(project.endDate).format("MMM Do YYYY")}</p>
                    <p></p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/4 min-w-36">
                    <p className="text-neutral-500 font-semibold">Budget</p>
                    <CurrencyDollarIcon className="w-12 h-12 text-purple-500" />
                    <p>${project.projectBudget}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Employees" && (
            <div>
              {project.employees.length > 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {project.employees.map((employee) => (
                      <div
                        key={employee.employeeId} // Ensure unique key for team members
                        className="bg-neutral-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105"
                        aria-label={`Team member card for ${employee.name}`} // Accessibility
                      >
                        <img
                          src={employee.imageUrl}
                          alt={employee.firstName}
                          className="w-52 h-52 rounded-xl mb-4 object-cover"
                        />
                        <h3 className="text-lg font-semibold mb-2 text-gray-100">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-gray-400">
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

          {activeTab === "Invoices" && (
            <div>
              {project.invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Issue Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Total Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-700 divide-y divide-gray-600">
                      {project.invoices.map((invoice) => (
                        <tr key={invoice.invoiceId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {invoice.invoiceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {invoice.invoiceDescription}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {invoice.issueDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            ${invoice.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {invoice.invoiceStatus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No invoices available.</p>
              )}
            </div>
          )}

          {activeTab === "Resources" && (
            <div>
              {project.resources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Unit of Measure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Unit Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                          General Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-700 divide-y divide-gray-600">
                      {project.resources.map((resource) => (
                        <tr key={resource.resourceId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {resource.resourceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {resource.resourceDescription}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {resource.resourceType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {resource.unitOfMeasure}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            ${resource.unitCost}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {resource.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            ${resource.generalPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No resources available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
