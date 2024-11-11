import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { assignEmployeeToProject } from "services/ProjectEmployeeService";

const AssignEmployeeModal = ({
  project,
  employee,
  setSelectedEmployeeIds,
  onClose,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState("");

  const handleAssignEmployee = async (e) => {
    e.preventDefault();
    console.log(
      employee.employeeId,
      project.projectId,
      startDate.toISOString().split("T")[0],
      endDate ? endDate.toISOString().split("T")[0] : null, 
      role
    );
    try {
      await assignEmployeeToProject(
        employee.employeeId,
        project.projectId,
        startDate.toISOString().split("T")[0],
        endDate ? endDate.toISOString().split("T")[0] : null, 
        role
      );
      setSelectedEmployeeIds((prevSelected) => [...prevSelected, employee.employeeId]);

      toast.success("Employee assigned to project successfully.");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error assigning employee to project");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md w-full ">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Assign Employee to Project
        </h2>
        <form onSubmit={handleAssignEmployee}>
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium">Employee:</label>
            <p className="text-sm">
              {employee.firstName} {employee.lastName}
            </p>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium">Project:</label>
            <p className="text-sm">
              {project.projectId} {project.projectName}
            </p>
          </div>

          <div className="mb-4 space-y-2 flex flex-col h-20">
            <label className="block text-sm font-medium">
              Start date of work on project
            </label>
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

          <div className="mb-4 space-y-2 flex flex-col h-20">
            <label className="block text-sm font-medium">
              End date of work on project
            </label>
            <DatePicker
              showIcon
              icon={
                <CalendarDaysIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-teal-500" />
              }
              id="endDate"
              className="flex w-full text-center py-1.5 bg-neutral-900 rounded-md border-2 border-teal-500 focus:outline-none"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
          
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-red-800 bg-red-600/20 text-red-500 hover:bg-red-600/40 px-10 py-2 rounded-lg"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-green-800 bg-green-600/40 text-green-500 hover:bg-green-600/60 px-10 py-2 rounded-lg"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignEmployeeModal;
