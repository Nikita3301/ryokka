import React, { useState, useEffect } from "react";
import { getAllProjects } from "services/ProjectsService";
import { getAllEmployees } from "services/EmployeeService";

export default function ProjectsInfoCountBlocks() {
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
            {numOfInProgress}
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
  );
}
