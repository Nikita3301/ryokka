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
  PencilIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import ImageGallery from "components/ImageGallery";

export default function ProjectDetails() {
  const { projectId } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("General");

  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [selectedProjectLocation, setSelectedProjectLocation] = useState(null);
  const [selectedProjectDescription, setSelectedProjectDescription] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

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
    if (project) {
      if (project.projectName) {
        setSelectedProjectName(project.projectName);
      }
      if (project.projectLocation) {
        setSelectedProjectLocation(project.projectLocation);
      }
      if (project.projectDescription) {
        setSelectedProjectDescription(project.projectDescription);
      }
      if (project.startDate) {
        setSelectedStartDate(new Date(project.startDate));
      }
      if (project.endDate) {
        setSelectedEndDate(new Date(project.endDate));
      }
      if (project.projectStatus) {
        setSelectedStatus(project.projectStatus);
      }
      if (project.projectBudget) {
        setSelectedBudget(project.projectBudget);
      }
    }
  }, [project]);

  const handleSaveClick = () => {
    console.log({
      projectName: selectedProjectName,
      projectLocation: selectedProjectLocation,
      projectDescription:selectedProjectDescription,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      projectStatus: selectedStatus,
      projectBudget: selectedBudget,
    });
  };

  if (!project) return <p className="text-neutral-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      {/* Main Project Image */}
      <div className="relative">
        <img
          src={project.mainImageUrl}
          alt={project.projectName}
          className="w-screen max-h-[700px] object-cover"
        />
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
              activeTab === "Gallery"
                ? "text-sky-500 border-b-2 border-sky-500"
                : "text-neutral-400"
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
                <div className="flex flex-col gap-3 justify-between">
                  <label htmlFor="projectName" className="font-semibold">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={selectedProjectName}
                    onChange={(e) => setSelectedProjectName(e.target.value)}
                    className="font-bold bg-neutral-800 rounded-md px-3 py-1 text-gray-100 focus:outline-none"
                  />
                  <label htmlFor="projectLocation" className="font-semibold">
                    Location
                  </label>
                  <div className="flex items-center gap-2 bg-neutral-800 text-sky-400  bg-opacity-60 px-4 py-1 rounded-full">
                    <MapPinIcon className="w-6 h-6 text-sky-500" />
                    <input
                      type="text"
                      name="projectLocation"
                      value={selectedProjectLocation}
                      onChange={(e) => setSelectedProjectLocation(e.target.value)}
                      className="w-full font-bold bg-neutral-800 rounded-md px-3 py-1 text-gray-100 focus:outline-none"
                    />
                  </div>
                  <label htmlFor="projectStatus" className="font-semibold">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="projectStatus"
                      value={selectedStatus}
                      onChange={(e)=> setSelectedStatus(e.target.value)}
                      className="block w-full px-2 py-1 rounded-lg bg-neutral-900 text-gray-200 shadow-md focus:outline-none appearance-none"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Not Started">Not Started</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDownIcon className="w-4 h-4 text-teal-700 stroke-[3]" />
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
                  <p className="text-neutral-500 font-semibold">Client</p>
                  <div className="flex items-center gap-4">
                    <UserCircleIcon className="w-12 h-12 text-purple-500" />
                    {project.client.firstName} {project.client.lastName}
                  </div>
                </div>
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
                  <label
                    htmlFor="projectDescription"
                    className="text-neutral-500 font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    className="bg-neutral-800 p-2 rounded-lg focus:outline-none"
                    name="projectDescription"
                    id="projectDescription"
                    value={selectedProjectDescription}
                    onChange={(e) => setSelectedProjectDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex flex-col md:flex-row gap-4 ">
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/3 min-w-36">
                    <p className="text-neutral-500 font-semibold">Start date</p>
                    <div className="relative">
                      <RocketLaunchIcon className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-6 h-6 text-amber-400" />
                      <DatePicker
                        className="pl-10 pr-3 py-1.5 font-bold bg-neutral-800 rounded-md border-2 border-amber-400  text-gray-100 focus:outline-none"
                        selected={selectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                        dateFormat="dd/MM/YYYY"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/3 min-w-36">
                    <p className="text-neutral-500 font-semibold">End date</p>
                    <div className="relative">
                      <CheckBadgeIcon className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-6 h-6 text-green-500" />
                      <DatePicker
                        className="pl-10 pr-3 py-1.5 font-bold bg-neutral-800 rounded-md border-2 border-green-500 text-gray-100 focus:outline-none"
                        selected={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        dateFormat="dd/MM/YYYY"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-2 bg-neutral-900 p-4 rounded-lg basis-1/3 min-w-36">
                    <p className="text-neutral-500 font-semibold">Budget</p>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-500" />
                      <input
                        type="text"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        placeholder="$0.00"
                        className="pl-10 pr-3 py-1.5 bg-neutral-800 text-gray-100 rounded-md focus:outline-none border-2 border-purple-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleSaveClick}
                     className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
                  >
                    Save
                  </button>
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

          {activeTab === "Invoices" && (
            <div className="overflow-x-auto p-3">
              {project.invoices.length > 0 ? (
                <table className="min-w-full divide-y divide-neutral-900 ">
                  <thead className="bg-neutral-950 text-neutral-400 text-sm font-medium text-center">
                    <tr>
                      <th className="px-6 py-2">Name</th>
                      <th className="px-6 py-2 text-left">Description</th>
                      <th className="px-6 py-2">Issue Date</th>
                      <th className="px-6 py-2">Total Amount</th>
                      <th className="px-6 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral-900 divide-y text-center divide-neutral-600 text-sm">
                    {project.invoices.map((invoice) => (
                      <tr key={invoice.invoiceId}>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          {invoice.invoiceName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          {invoice.invoiceDescription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {moment(invoice.issueDate).format("DD.MM.YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${invoice.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <p
                            className={`px-1 py-1 flex justify-center items-center gap-2 font-semibold rounded-lg ${
                              invoice.invoiceStatus === "Paid"
                                ? "bg-green-600 text-green-600 bg-opacity-20"
                                : invoice.invoiceStatus === "Pending"
                                ? "bg-yellow-600 text-yellow-600 bg-opacity-20"
                                : "bg-red-600 text-red-600 bg-opacity-20"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faCircle}
                              className="w-2 h-2"
                            />
                            {invoice.invoiceStatus}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-neutral-300">No invoices available.</p>
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
                      <th className="px-6 py-3">Unit Cost</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">General Price</th>
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
                        <td className="px-6 py-4">${resource.unitCost}</td>
                        <td className="px-6 py-4">{resource.quantity}</td>
                        <td className="px-6 py-4">${resource.generalPrice}</td>
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
              <ImageGallery projectId={project.projectId}/>
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
