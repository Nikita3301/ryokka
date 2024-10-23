import React, { useState} from "react";

import {
  CalendarDateRangeIcon,
  MapPinIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { deleteProject } from "services/ProjectsService";
import { DeleteModal } from "../../utils/DeleteModal";

export default function ProjectCard({
  project,
  setProjects,
  handleViewDetails,
  handleEdit,
}) {
  const [isDelModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully!");
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete project. Please try again.");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      key={project.projectId}
      className="relative text-white bg-gradient-to-b from-neutral-900 to-teal-950/50 shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-md hover:shadow-teal-900 duration-500"
    >
      <img
        src={project.mainImageUrl}
        alt={`${project.projectName} - ${project.projectDescription}`}
        loading="lazy"
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-0 right-0 bg-neutral-950 rounded-bl-xl rounded-tr-lg pb-2 pl-2">
        <div className="flex items-center gap-3">
          <p
            className={`px-3 py-1.5 rounded-lg font-semibold ${
              project.projectStatus === "Completed"
                ? " bg-green-600 text-green-600 bg-opacity-20"
                : project.projectStatus === "In Progress"
                ? " bg-sky-600 text-sky-500 bg-opacity-20"
                : " bg-neutral-400 text-neutral-300 bg-opacity-20"
            }`}
          >
            {project.projectStatus}
          </p>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-2xl font-semibold mb-2">{project.projectName}</h2>

        <p className="text-gray-400 mb-8 line-clamp-2">
          {project.projectDescription}
        </p>
        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <MapPinIcon className="w-6 h-6 text-teal-500" />
            <p className="font-semibold">{project.projectLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <CalendarDateRangeIcon className="w-6 h-6 text-teal-400" />
          <div className="text-gray-400">
            <div className="whitespace-nowrap flex gap-2 items-center font-semibold text-white">
              {format(new Date(project.startDate), "MM.yyyy")}
              <ArrowLongRightIcon className="size-5" />
              {format(new Date(project.endDate), "MM.yyyy")}
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          {handleViewDetails && (
            <button
              onClick={() => handleViewDetails(project.projectId)}
              className="btn-primary w-full py-2"
              aria-label={`View details for ${project.projectName}`}
            >
              View Details
            </button>
          )}
          {handleEdit && (
            <button
              onClick={() => handleEdit(project.projectId)}
              className="w-full bg-teal-600 text-neutral-900 font-semibold py-2 px-4 rounded-xl"
            >
              Edit
            </button>
          )}
          {handleDelete && (
            <button
              onClick={() => handleDelete(project.projectId)}
              className="bg-red-600/20 hover:bg-red-600/60 text-red-600 border-2 border-red-600 font-semibold py-2 px-4 rounded-xl"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={isDelModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDeleteConfirm(project.projectId)}
      />
    </div>
  );
}
