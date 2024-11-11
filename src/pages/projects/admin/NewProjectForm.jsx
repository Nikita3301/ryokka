import React, { useState, useEffect } from "react";
import { createProject } from "services/ProjectsService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { getAllClients } from "services/ClientService";
import NewClientModal from "./NewClientModal";
import ToastInit from "../../../components/ToastInit";
import { toast } from "react-toastify";
import {
  uploadImages,
} from "services/GalleryService";
import { deleteProject } from "services/ProjectsService";

export default function NewProjectForm({setProjects, setActiveTab }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("Not Started");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [clients, setClients] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filesWithDates = files.map((file) => ({
      file,
      date: new Date(),
    }));
    console.log("filesWithDates", filesWithDates);
    setSelectedFiles(filesWithDates);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!projectName || !projectDescription || !projectLocation || !projectStatus || !startDate || !endDate || !clientId) {
      toast.error("Please fill out all required fields.");
      return;
    }
    try {
      const newProject = {
        projectName,
        projectDescription,
        projectLocation,
        projectStatus,
        startDate,
        endDate,
        projectBudget: parseFloat(projectBudget),
        clientId: clientId,
      };

      const createdProject = await createProject(newProject);
      const projectId = createdProject.projectId;

      if (selectedFiles.length > 0) {
        try {
          toast.info("Uploading images!");
          const formData = new FormData();
          console.log("selectedFiles", selectedFiles);
          selectedFiles.forEach((fileObj, index) => {
            formData.append(`files`, fileObj.file);
            formData.append(`dates`, fileObj.date.toISOString().split("T")[0]);
          });

          console.log("form", Object.fromEntries(formData.entries()));

          await uploadImages(formData, projectId);

          toast.success("Images uploaded successfully!");
          setSelectedFiles([]);
          setImagePreviews([]);
          
          setActiveTab("projects");
        } catch (error) {
          console.log(error);
          toast.error("Failed to upload images.");
        }
      }
      setProjects((prevProjects) => [...prevProjects, createdProject]); 
      setActiveTab("projects");
    } catch (error) {
      toast.error("Failed to create project or upload images");
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const fetchAllClients = async () => {
    const response = await getAllClients();
    setClients(response);
  };

  useEffect(() => {
    fetchAllClients();
  }, []);

  return (
    <div className="w-5/6 bg-neutral-900 rounded-3xl shadow max-w-4xl overflow-auto scrollbar-thin">
      <form
        onSubmit={handleCreateProject}
        className=" text-neutral-300 text-semibold"
      >
        <div className="flex justify-center items-center flex-col gap-4 p-4">
          <label htmlFor="projectName" className="w-full text-left">
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="Project Name"
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {/* Project Description */}
          <label htmlFor="projectDescription" className="w-full text-left">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            placeholder="Project Description"
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />

          {/* Project Status */}
          <label htmlFor="projectStatus" className="w-full text-left">
            Project Status
          </label>
          <div className="relative h-full w-full">
            <select
              id="projectStatus"
              className="w-full block py-1.5 px-2 border-2 border-teal-600 rounded-lg bg-neutral-900 shadow-md focus:outline-none appearance-none h-full"
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDownIcon className="w-4 h-4 text-teal-700" />
            </div>
          </div>

          <label htmlFor="projectLocation" className="w-full text-left">
            Project Location
          </label>
          <input
            id="projectLocation"
            type="text"
            placeholder="Project Location"
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
          />

          <label htmlFor="projectBudget" className="w-full text-left">
            Project Budget
          </label>
          <input
            id="projectBudget"
            type="number"
            placeholder="Project Budget"
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            value={projectBudget}
            onChange={(e) => setProjectBudget(e.target.value)}
          />

          <div className="w-full flex justify-around h-24">
            <div className="flex flex-col gap-2 py-2">
              <label htmlFor="startDate">Start date</label>
              <DatePicker
                showIcon
                icon={
                  <CalendarDaysIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-teal-500" />
                }
                id="startDate"
                className="flex w-full text-center py-1.5 bg-neutral-900 rounded-md border-2 border-teal-500 focus:outline-none"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="flex flex-col gap-2 py-2">
              <label htmlFor="endDate">End date</label>
              <DatePicker
                showIcon
                icon={
                  <CalendarDaysIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-teal-500" />
                }
                id="endDate"
                minDate={startDate}
                className="flex w-full text-center py-1.5 bg-neutral-900 rounded-md border-2 border-teal-500 focus:outline-none"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <label htmlFor="clientId" className="w-full text-left">
            Client
          </label>
          <div className="flex gap-2 w-full items-center">
            <div className="relative h-full w-full">
              <select
                id="clientId"
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
                className="w-full block py-1.5 px-2 border-2 border-teal-600 rounded-lg bg-neutral-900 shadow-md focus:outline-none appearance-none h-full"
              >
                <option value="">Select a client</option>
                {clients?.map((client) => (
                  <option key={client.clientId} value={client.clientId}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon className="w-4 h-4 text-teal-700" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 whitespace-nowrap"
            >
              Create New
            </button>

            {isModalOpen && (
              <NewClientModal
                setIsModalOpen={setIsModalOpen}
                clients={clients}
                setClients={setClients}
              />
            )}
          </div>

          <h1 className="text-2xl text-center font-semibold pt-4">
            Upload new photos
          </h1>
          <div className="flex flex-col items-center w-full gap-3">
            <div
              className={`flex items-center justify-center ${
                selectedFiles.length === 0 ? "w-full" : ""
              }`}
            >
              <div className="flex flex-col justify-center">
                <div className="flex justify-center items-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="upload-input"
                  />
                  <label
                    htmlFor="upload-input"
                    className="flex justify-center items-center gap-2 w-fit border-2 border-sky-800 bg-sky-600/20 text-sky-500 hover:bg-sky-600/40 px-6 py-2 rounded-lg"
                  >
                    <PlusIcon className="size-6" />
                    Add Photos
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`w-full h-full ${
                selectedFiles.length === 0 ? "hidden" : ""
              }`}
            >
              <div className="flex items-center gap-4 overflow-x-auto p-4">
                {selectedFiles.map((fileObj, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index}`}
                      className="size-64 object-cover rounded-lg shadow-md mb-2"
                    />
                    <DatePicker
                      showIcon
                      icon={
                        <CalendarDaysIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-teal-500" />
                      }
                      className="flex text-center py-1.5 font-semibold bg-neutral-800 rounded-md border-2 border-teal-500 text-neutral-300 focus:outline-none"
                      maxDate={new Date()}
                      minDate={startDate}
                      selected={selectedFiles[index]?.date}
                      onChange={(date) => {
                        setSelectedFiles((prevFiles) =>
                          prevFiles.map((file, i) =>
                            i === index ? { ...file, date: date } : file
                          )
                        );
                      }}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="w-full border-2 border-teal-600" />

        <div className="flex justify-center p-4">
          <button
            onClick={handleCreateProject}
            className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600/20 text-teal-500 hover:bg-teal-600/40 px-10 py-2 rounded-lg"
          >
            Create new project
          </button>
        </div>
      </form>

      <ToastInit />
    </div>
  );
}
