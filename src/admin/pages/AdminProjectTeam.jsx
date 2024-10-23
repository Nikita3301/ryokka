import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CloudArrowUpIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { DeleteModal } from "utils/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAllEmployees,
  deleteEmployeeById,
  createEmployee,
  updateEmployee,
} from "services/EmployeeService";

export default function AdminProjectTeam() {
  const [employees, setEmployees] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
  });

  // Delete values
  const [selectedDelItem, setSelectedDelItem] = useState(null);
  const [isDelModalOpen, setIsDeleteModalOpen] = useState(false);

  // Add a new employee
  const addTeamMember = async () => {
    if (
      newEmployee.imageUrl &&
      newEmployee.firstName &&
      newEmployee.lastName &&
      newEmployee.jobTitle &&
      newEmployee.email &&
      newEmployee.phoneNumber
    ) {
      try {
        const formData = new FormData();

        formData.append("firstName", newEmployee.firstName);
        formData.append("lastName", newEmployee.lastName);
        formData.append("jobTitle", newEmployee.jobTitle);
        formData.append("phoneNumber", newEmployee.phoneNumber);
        formData.append("email", newEmployee.email);
        formData.append("imageFile", newEmployee.imageUrl);
        console.log("adding", Object.fromEntries(formData.entries()));

        const createdEmployee = await createEmployee(formData);
        setEmployees([...employees, createdEmployee]);
        setNewEmployee({
          imageUrl: "",
          firstName: "",
          lastName: "",
          jobTitle: "",
          email: "",
          phoneNumber: "",
        });

        setImagePreviewUrl(null);
        console.log(newEmployee);
        toast.success("Employee added successfully!");
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to add employee.");
      }
    } else {
      console.log("error", newEmployee);
      toast.error("Please fill out all fields.");
    }
  };

  // Update employee
  const startEditing = (employee) => {
    setEditingId(employee.employeeId);
    setUpdatedEmployee(employee);
  };

  const saveUpdatedEmployee = async () => {
    if (
      editingId &&
      updatedEmployee.imageUrl &&
      updatedEmployee.firstName &&
      updatedEmployee.lastName &&
      updatedEmployee.jobTitle &&
      updatedEmployee.email &&
      updatedEmployee.phoneNumber
    ) {
      try {
        const formData = new FormData();
        formData.append("employeeId", editingId);
        formData.append("firstName", updatedEmployee.firstName);
        formData.append("lastName", updatedEmployee.lastName);
        formData.append("jobTitle", updatedEmployee.jobTitle);
        formData.append("phoneNumber", updatedEmployee.phoneNumber);
        formData.append("email", updatedEmployee.email);
        console.log("imageUrl", updatedEmployee.imageUrl);
        formData.append("imageFile", updatedEmployee.imageUrl);
        console.log("edit", Object.fromEntries(formData.entries()));

        const updatedEmployeeResponse = await updateEmployee(formData);
        console.log("edited", updatedEmployeeResponse);
        setEmployees(
          employees.map((employee) =>
            employee.employeeId === editingId
              ? updatedEmployeeResponse
              : employee
          )
        );
        console.log("employees", employees);
        setEditingId(null);
        setUpdatedEmployee({
          imageUrl: "",
          firstName: "",
          lastName: "",
          jobTitle: "",
          email: "",
          phoneNumber: "",
        });
        toast.success("Employee updated successfully!");
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to update employee.");
      }
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  // Delete modal handlers
  const handleDeleteClick = (item) => {
    setSelectedDelItem(item);
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployeeById(selectedDelItem.employeeId);
      toast.success("Employee deleted successfully.");
      setEmployees(
        employees.filter(
          (employee) => employee.employeeId !== selectedDelItem.employeeId
        )
      );
    } catch (error) {
      console.log("err", error);
      toast.error("Failed to delete employee.");
    }
    setIsDeleteModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

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
    <div className="min-h-screen bg-neutral-950 p-6 text-gray-200">
      {/* Add Team employee Form */}
      <div className="bg-neutral-900 p-4 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add new employee
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center justify-center basis-1/3">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt={newEmployee.firstName}
                className="w-52 h-52 rounded-xl mb-4 object-cover border-2 border-teal-500"
              />
            ) : (
              <div className="w-52 h-52 rounded-xl mb-4 object-cover border-2 border-teal-500 bg-neutral-800 flex items-center justify-center">
                <PhotoIcon className="size-20" />
              </div>
            )}

            <label
              htmlFor="newEmployeeImage"
              className="flex items-center px-6 py-1.5 gap-2 rounded-lg bg-neutral-800 cursor-pointer select-none whitespace-nowrap hover:scale-105 duration-500"
            >
              <CloudArrowUpIcon className="size-9 text-teal-500" />
              <div>
                <h4 className="text-base font-semibold text-teal-500">
                  Upload a file
                </h4>
                <span className="text-sm text-gray-500">Max 10 MB</span>
              </div>
              <input
                type="file"
                id="newEmployeeImage"
                name="newEmployeeImage"
                accept="png, jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreviewUrl(previewUrl);
                  }
                  setNewEmployee({
                    ...newEmployee,
                    imageUrl: e.target.files[0],
                  });
                }}
                hidden
              />
            </label>
          </div>
          <div className="flex flex-col basis-2/3 gap-4">
            <div className="flex w-full gap-5">
              <div className="flex flex-col basis-1/2">
                <label
                  htmlFor="firstName"
                  className="font-semibold text-neutral-400 pb-2"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      firstName: e.target.value,
                    })
                  }
                  className="bg-neutral-800 p-1.5 rounded-md text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col basis-1/2">
                <label
                  htmlFor="lastName"
                  className="font-semibold text-neutral-400 pb-2"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, lastName: e.target.value })
                  }
                  className="bg-neutral-800 p-1.5 rounded-md text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col basis-1/2">
              <label
                htmlFor="jobTitle"
                className="font-semibold text-neutral-400 pb-2"
              >
                Job title
              </label>

              <input
                id="jobTitle"
                type="text"
                value={newEmployee.jobTitle}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, jobTitle: e.target.value })
                }
                className="bg-neutral-800 p-1.5 rounded-md text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col basis-1/2">
              <label
                htmlFor="email"
                className="font-semibold text-neutral-400 pb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                className="bg-neutral-800 p-1.5 rounded-md text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col basis-1/2">
              <label
                htmlFor="phoneNumber"
                className="font-semibold text-neutral-400 pb-2"
              >
                Phone
              </label>

              <input
                type="phoneNumber"
                value={newEmployee.phoneNumber}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    phoneNumber: e.target.value,
                  })
                }
                className="bg-neutral-800 p-1.5 rounded-md text-white focus:outline-none"
              />
            </div>

            <div className="w-full flex justify-center items-center ">
              <button
                onClick={addTeamMember}
                className="flex justify-center items-center gap-2 w-fit border-2 border-teal-800 bg-teal-600 text-teal-500 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded-lg"
              >
                <PlusIcon className="w-5 h-5 inline" /> Add employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-neutral-800 rounded-lg">
          <thead className="bg-neutral-950 text-neutral-400 text-sm font-medium text-center">
            <tr className="text-left text-neutral-400 *:p-2">
              <th className="text-center">Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-600 text-sm text-left">
            {employees.map((employee) => (
              <tr
                key={employee.employeeId}
                className="border-b border-neutral-700 *:p-2"
              >
                <td className="flex justify-center">
                  {editingId === employee.employeeId ? (
                    <div className="h-20 w-full p-2">
                      <label
                        htmlFor="updateEmployeeImage"
                        className="flex items-center p-2 gap-2 rounded-lg bg-neutral-800 cursor-pointer whitespace-nowrap select-none"
                      >
                        <CloudArrowUpIcon className="size-6 text-teal-500" />
                        <div>
                          <h4 className="text-sm font-semibold text-teal-500">
                            Upload a file
                          </h4>
                          <span className="text-xs text-gray-500">
                            Max 10 MB
                          </span>
                        </div>
                        <input
                          type="file"
                          id="updateEmployeeImage"
                          name="updateEmployeeImage"
                          accept="png, jpg"
                          onChange={(e) =>
                            setUpdatedEmployee({
                              ...updatedEmployee,
                              imageUrl: e.target.files[0],
                            })
                          }
                          hidden
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={employee.imageUrl}
                        alt={employee.firstName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <input
                      type="text"
                      value={updatedEmployee.firstName}
                      onChange={(e) =>
                        setUpdatedEmployee({
                          ...updatedEmployee,
                          firstName: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    employee.firstName
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <input
                      type="text"
                      value={updatedEmployee.lastName}
                      onChange={(e) =>
                        setUpdatedEmployee({
                          ...updatedEmployee,
                          lastName: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    employee.lastName
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <input
                      type="text"
                      value={updatedEmployee.jobTitle}
                      onChange={(e) =>
                        setUpdatedEmployee({
                          ...updatedEmployee,
                          jobTitle: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    employee.jobTitle
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <input
                      type="email"
                      value={updatedEmployee.email}
                      onChange={(e) =>
                        setUpdatedEmployee({
                          ...updatedEmployee,
                          email: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <input
                      type="phoneNumber"
                      value={updatedEmployee.phoneNumber}
                      onChange={(e) =>
                        setUpdatedEmployee({
                          ...updatedEmployee,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    employee.phoneNumber
                  )}
                </td>
                <td>
                  {editingId === employee.employeeId ? (
                    <div className="flex justify-center items-center">
                      <button
                        onClick={saveUpdatedEmployee}
                        className="border-2 border-green-800 bg-green-600 text-green-500 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => startEditing(employee)}
                        className="border-2 border-yellow-600 bg-yellow-300 text-yellow-400 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                      >
                        <PencilIcon className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(employee);
                        }}
                        className="border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                      >
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDelModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteConfirm}
      />

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
