import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "services/ProjectsService";
import {
  UserCircleIcon,
  MapPinIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  UserGroupIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { format } from "date-fns";
import ImageGalleryComponent from "components/ImageGalleryComponent";
import { getAllClients } from "../../../services/ClientService";
import ExcelExport from "../../../services/ExcelExport";
import ProjectImagesComponent from "../ProjectImagesComponent";
import { getAllEmployees } from "../../../services/EmployeeService";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [clients, setClients] = useState(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  const [employees, setEmployees] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);

  const [activeTab, setActiveTab] = useState("Employees");

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        setProject(response);
        setEditedProject(response);
      } catch (error) {
        toast.error("Error fetching project details");
        console.error("Error fetching project details:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (project && project.employees) {
      const assignedIds = project.employees.map((emp) => emp.employeeId);
      setSelectedEmployeeIds(assignedIds);
    }
  }, [project]);

  const fetchAllClients = async () => {
    const response = await getAllClients();
    // console.log("client", response);
    setClients(response);
  };

  const fetchAllEmployees = async () => {
    const response = await getAllEmployees();
    console.log("emplo", response);
    setEmployees(response);
  };

  useEffect(() => {
    fetchAllClients();
    fetchAllEmployees();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value }); // Update edited project
  };

  const handleSave = () => {
    // Save the changes (add your save logic here)
    console.log("Saved project:", editedProject);
    setIsEditing(false); // Exit edit mode
  };

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployeeIds((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        return [...prevSelected, employeeId];
      }
    });
  };

  const toggleEmployeeAssignment = (employeeId) => {
    if (selectedEmployeeIds.includes(employeeId)) {
      // Logic to unassign the employee
      setSelectedEmployeeIds((prevSelected) =>
        prevSelected.filter((id) => id !== employeeId)
      );
      console.log("Removing Employee:", employeeId);
    } else {
      // Logic to assign the employee
      setSelectedEmployeeIds((prevSelected) => [...prevSelected, employeeId]);
      console.log("Assigning Employee:", employeeId);
    }
  };

  const addEmployees = () => {
    console.log("Adding Employees:", selectedEmployeeIds);
  };

  const removeEmployees = () => {
    console.log("Removing Employees:", selectedEmployeeIds);
    setSelectedEmployeeIds([]);
  };

  if (!project) return <p className="text-neutral-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      <section className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectImagesComponent projectId={projectId} />

          <div className="flex flex-col gap-4 p-4">
            {/* Project Name and Edit Button */}
            <div className="flex justify-between items-center">
              {isEditing ? (
                <input
                  type="text"
                  name="projectName"
                  value={editedProject.projectName}
                  onChange={handleInputChange}
                  className="text-3xl font-bold bg-neutral-900 py-1.5 px-2 rounded-lg outline-none"
                />
              ) : (
                <h1 className="text-3xl font-bold py-1.5 px-2">
                  {project.projectName}
                </h1>
              )}

              {/* Toggle edit/save button */}
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                className="btn-primary"
              >
                {isEditing ? "Save" : "Edit Project"}
              </button>
            </div>

            <div className="flex gap-8">
              {isEditing ? (
                <div className="flex items-center text-neutral-500 bg-neutral-900 px-2 rounded-lg gap-2">
                  <MapPinIcon className="w-6 h-6" />
                  <div className="font-semibold">
                    <input
                      type="text"
                      name="projectLocation"
                      value={editedProject.projectLocation}
                      onChange={handleInputChange}
                      className="py-1.5 px-2 bg-neutral-900 text-gray-200 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-neutral-500 gap-2">
                  <MapPinIcon className="w-6 h-6" />
                  <div className="font-semibold">
                    <p className="py-1.5 px-2">{project.projectLocation}</p>
                  </div>
                </div>
              )}

              {isEditing ? (
                <div className="relative h-full">
                  <select
                    name="projectStatus"
                    value={editedProject.projectStatus}
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        projectStatus: e.target.value,
                      })
                    }
                    className="block w-32 px-2 rounded-lg bg-neutral-800 text-gray-200 shadow-md focus:outline-none appearance-none h-full"
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
              ) : (
                <span
                  className={`h-full flex justify-center items-center px-3 py-1 whitespace-nowrap text-sm font-semibold rounded-lg w-fit ${
                    project.projectStatus === "Completed"
                      ? "bg-green-600 text-green-600 bg-opacity-20"
                      : project.projectStatus === "In Progress"
                      ? "bg-sky-500 text-sky-500 bg-opacity-20"
                      : project.projectStatus === "Not Started"
                      ? "bg-yellow-500 text-yellow-500 bg-opacity-20"
                      : "bg-neutral-300 text-neutral-300 bg-opacity-20"
                  }`}
                >
                  {project.projectStatus}
                </span>
              )}
            </div>

            {/* Client Details */}
            <div className="flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Client</p>
              <div className="flex items-center justify-start gap-4 bg-neutral-900 py-1.5 px-4 rounded-lg w-fit">
                <UserCircleIcon className="size-8 text-purple-500" />
                {isEditing ? (
                  <select
                    value={editedProject.client.id}
                    onChange={(e) => {
                      const selectedClient = clients.find(
                        (client) => client.id === parseInt(e.target.value)
                      );
                      setEditedProject({
                        ...editedProject,
                        client: {
                          id: selectedClient.id,
                          firstName: selectedClient.firstName,
                          lastName: selectedClient.lastName,
                        },
                      });
                    }}
                    className="bg-neutral-900 rounded-lg outline-none px-4"
                  >
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="rounded-lg">
                    {project.client.firstName} {project.client.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Overview</p>

              <div className="w-fit p-1 bg-neutral-900 rounded-lg font-semibold">
                <table className="table-auto text-left text-neutral-300">
                  <tbody>
                    <tr className="border-b border-neutral-700">
                      <td className="flex items-center gap-3 whitespace-nowrap px-3 py-1.5 border-r border-neutral-700">
                        <RocketLaunchIcon className="size-6 text-amber-400" />
                        <span>Start date</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-1.5">
                        {isEditing ? (
                          <DatePicker
                            className=" font-bold bg-neutral-800 rounded-md border-2 border-amber-400 text-gray-100 focus:outline-none text-center"
                            selected={editedProject.startDate}
                            onChange={(date) =>
                              setEditedProject({
                                ...editedProject,
                                startDate: date,
                              })
                            }
                            dateFormat="dd/MM/YYYY"
                          />
                        ) : (
                          <p className="h-7">
                            {format(project.startDate, "dd MMM yyyy")}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-neutral-700">
                      <td className="flex items-center gap-3 whitespace-nowrap px-3 py-1.5 border-r border-neutral-700">
                        <CheckBadgeIcon className="size-6 text-green-500" />
                        <span>End date</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-1.5">
                        {isEditing ? (
                          <DatePicker
                            className=" font-bold bg-neutral-800 rounded-md border-2 border-amber-400 text-gray-100 focus:outline-none text-center"
                            selected={editedProject.startDate}
                            onChange={(date) =>
                              setEditedProject({
                                ...editedProject,
                                endDate: date,
                              })
                            }
                            dateFormat="dd/MM/YYYY"
                          />
                        ) : (
                          <p className="h-7">
                            {format(project.endDate, "dd MMM yyyy")}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="flex items-center gap-3 whitespace-nowrap px-3 py-1.5 border-r border-neutral-700">
                        <CurrencyDollarIcon className="size-6 text-purple-500" />
                        <span>Budget</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-1.5">
                        {isEditing ? (
                          <div>
                            $ &nbsp;
                            <input
                              type="number"
                              name="projectBudget"
                              value={editedProject.projectBudget}
                              onChange={handleInputChange}
                              className="bg-neutral-900 rounded-lg outline-none"
                            />
                          </div>
                        ) : (
                          <p>$ &nbsp;{project.projectBudget}</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <p className="text-neutral-300 font-semibold">Description</p>
              {isEditing ? (
                <textarea
                  name="projectDescription"
                  value={editedProject.projectDescription}
                  onChange={handleInputChange}
                  className="bg-neutral-900 p-2 rounded-lg outline-none"
                />
              ) : (
                <p className="text-neutral-400">{project.projectDescription}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="p-2">
        <div className="flex justify-around font-semibold border-b border-neutral-700 mb-6 ">
          <button
            className={`px-4 py-2 ${
              activeTab === "Employees"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            Employees
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Clients"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("Clients")}
          >
            Clients
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Invoices"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("Invoices")}
          >
            Invoices
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Resources"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("Resources")}
          >
            Resources
          </button>

          <button
            className={`px-4 py-2 ${
              activeTab === "Gallery"
                ? "text-teal-500 border-b-2 border-teal-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("Gallery")}
          >
            Gallery
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Employees" && (
            <div>
              {project ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full divide-y divide-neutral-900">
                      <thead className="bg-neutral-900 text-neutral-200">
                        <tr>
                          <th className="px-4 py-2 text-left rounded-tl-lg">
                            Employee
                          </th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Job Title</th>
                          <th className="px-4 py-2 text-left">Contact</th>
                          <th className="px-4 py-2 rounded-tr-lg">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-neutral-900/80 text-neutral-300">
                        {employees &&
                          employees.map((employee) => (
                            <tr
                              key={employee.employeeId}
                              className="items-center"
                            >
                              <td className="px-4 py-2 font-semibold">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={employee.imageUrl}
                                    alt={employee.firstName}
                                    className="w-12 h-12 object-cover rounded-full"
                                  />
                                  {`${employee.firstName} ${employee.lastName}`}
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                {selectedEmployeeIds.includes(
                                  employee.employeeId
                                ) ? (
                                  <div className="px-3 py-1 flex justify-center items-center gap-2 text-sm font-semibold rounded-lg bg-green-600/20 text-green-600">
                                    Assigned
                                  </div>
                                ) : (
                                  <div className="px-3 py-1 flex justify-center items-center gap-2 text-sm font-semibold rounded-lg bg-neutral-400/20 text-neutral-400">
                                    Not Assigned
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-2 font-semibold">{employee.jobTitle}</td>
                              <td className="px-4 py-2 ">
                                <div className="gap-2 flex flex-col">
                                  <p className="inline-flex items-center gap-3">
                                    <EnvelopeIcon className="w-4 h-4 text-neutral-400" />
                                    {employee.email}
                                  </p>
                                  <p className="inline-flex items-center gap-3">
                                    <PhoneIcon className="w-4 h-4 text-neutral-400" />
                                    {employee.phoneNumber}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  onClick={() =>
                                    toggleEmployeeAssignment(
                                      employee.employeeId
                                    )
                                  }
                                  className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                                    selectedEmployeeIds.includes(
                                      employee.employeeId
                                    )
                                      ? "bg-red-600/20 text-red-600 hover:bg-red-600/40 border-2 border-red-600"
                                      : "bg-teal-600/20 text-teal-600 hover:bg-teal-600/40 border-2 border-teal-600"
                                  }`}
                                >
                                  {selectedEmployeeIds.includes(
                                    employee.employeeId
                                  )
                                    ? "Remove from Project"
                                    : "Assign to Project"}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-white p-6 rounded-lg flex flex-col justify-center items-center gap-2">
                  <UserGroupIcon className="size-10 rounded-lg p-1 border-neutral-800 bg-neutral-600 text-neutral-500 bg-opacity-30" />
                  <h2 className="text-lg text-center font-semibold">
                    No employees yet
                  </h2>
                  <p className="text-neutral-500 pb-6">
                    I feel sorry for you....
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "Clients" && (
            <div className="flex flex-col items-center gap-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => setClientToEdit(null)} // Set to null for adding new client
              >
                Add New Client
              </button>

              {/* Client Form for Adding or Editing */}
              {/* <ClientForm clientToEdit={clientToEdit} onSave={handleSave} /> */}

              {/* Client List */}
              <div className="bg-neutral-900 p-4 rounded-lg w-full">
                <h2 className="text-white text-2xl mb-4">Clients</h2>
                {clients?.length > 0 ? (
                  <div>
                    {clients.map((client) => (
                      <div
                        key={client.clientId}
                        className="p-2 flex justify-between bg-neutral-800 text-gray-100 rounded-md mb-2"
                      >
                        <div>
                          <p className="font-bold">
                            {client.firstName} {client.lastName}
                          </p>
                          <p className="text-sm text-neutral-400">
                            {client.contactEmail}
                          </p>
                          <p className="text-sm text-neutral-400">
                            {client.contactPhone}
                          </p>
                        </div>
                        <button
                          className="text-blue-500"
                          onClick={() => setClientToEdit(client)} // Set clientToEdit to populate the form for editing
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No clients available.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Invoices" && (
            <div>
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
                            {format(invoice.issueDate, "dd.MM.yyyy")}
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
                  <div className=" text-white p-6 rounded-lg flex flex-col justify-center items-center gap-2">
                    <BanknotesIcon className="size-10 rounded-lg p-1 border-neutral-800 bg-neutral-600 text-neutral-500 bg-opacity-30" />
                    <h2 className="text-lg text-center font-semibold">
                      Project doesn't have any invoices yet.
                    </h2>
                    <p className="text-neutral-500 pb-6">
                      I feel sorry for you....
                    </p>
                    {/* <button className="w-56 px-2 py-1.5 font-semibold border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 rounded hover:bg-opacity-50">
                    Delete
                  </button> */}
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center p-5">
                <ExcelExport
                  excelData={project.invoices}
                  fileName={"Invoices"}
                />
              </div>
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
                <div className=" text-white p-6 rounded-lg flex flex-col justify-center items-center gap-2">
                  <BanknotesIcon className="size-10 rounded-lg p-1 border-neutral-800 bg-neutral-600 text-neutral-500 bg-opacity-30" />
                  <h2 className="text-lg text-center font-semibold">
                    Project doesn't have any resouces yet.
                  </h2>
                  <p className="text-neutral-500 pb-6">
                    I feel sorry for you....
                  </p>
                  {/* <button className="w-56 px-2 py-1.5 font-semibold border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 rounded hover:bg-opacity-50">
                    Delete
                  </button> */}
                </div>
              )}
            </div>
          )}

          {activeTab === "Gallery" && (
            <div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("/admin/gallery")}
                  className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
                >
                  Open edit gallery page
                </button>
              </div>
              <ImageGalleryComponent projectId={project.projectId} />
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
