import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CloudArrowUpIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { handleFileChange } from "services/handleFileChange";

import { getAllEmployees } from "services/ProjectTeamService";

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
  const [editedEmployee, setEditedEmployee] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
  });

  //   const handleFileChange = (e, employeeId) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setEmployees((prevEmployees) =>
  //           prevEmployees.map((employee) =>
  //             employee.employeeId === employeeId
  //               ? { ...employee, imageUrl: reader.result }
  //               : employee
  //           )
  //         );
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  // Add a new team member
  const addTeamMember = () => {
    if (
      newEmployee.imageUrl &&
      newEmployee.firstName &&
      newEmployee.lastName &&
      newEmployee.jobTitle &&
      newEmployee.email &&
      newEmployee.phoneNumber
    ) {
      setEmployees([...employees, { ...newEmployee }]);
      setNewEmployee({
        imageUrl: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        phoneNumber: "",
      });
      console.log(newEmployee);
      setImagePreviewUrl(null);
    } else {
      console.log("error", newEmployee);
    }
  };

  const startEditing = (member) => {
    setEditingId(member.employeeId);
    setEditedEmployee(member);
  };

  // Save edited team member
  const saveEdit = () => {
    setEmployees(
      employees.map((member) =>
        member.employeeId === editingId ? editedEmployee : member
      )
    );
    setEditingId(null);
    setEditedEmployee({
      imageUrl: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
    });
    console.log(editedEmployee);
  };

  // Remove a team member
  const removeTeamMember = (id) => {
    setEmployees(teamMembers.filter((member) => member.employeeId !== id));
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
      {/* Add Team Member Form */}
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
              for="doc"
              class="flex items-center px-6 py-1.5 gap-2 rounded-lg bg-neutral-800 cursor-pointer select-none whitespace-nowrap hover:scale-105 duration-500"
            >
              <CloudArrowUpIcon className="size-9 text-teal-500" />
              <div>
                <h4 class="text-base font-semibold text-teal-500">
                  Upload a file
                </h4>
                <span class="text-sm text-gray-500">Max 10 MB</span>
              </div>
              <input
                type="file"
                id="doc"
                name="doc"
                accept="png, jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreviewUrl(previewUrl);
                  }
                  setNewEmployee({
                    ...newEmployee,
                    imageUrl: handleFileChange(e),
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
                <PlusIcon className="w-5 h-5 inline" /> Add Member
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
          <tbody className=" bg-neutral-900 divide-y divide-neutral-600 text-sm text-left">
            {employees.map((member) => (
              <tr
                key={member.employeeId}
                className="border-b border-neutral-700 *:p-2"
              >
                <td className="flex justify-center">
                  {editingId === member.employeeId ? (
                    <div className="h-20 w-full p-2">
                      <label
                        for="doc"
                        class="flex items-center p-2 gap-2 rounded-lg bg-neutral-800 cursor-pointer whitespace-nowrap select-none"
                      >
                        <CloudArrowUpIcon className="size-6 text-teal-500" />
                        <div>
                          <h4 class="text-sm font-semibold text-teal-500">
                            Upload a file
                          </h4>
                          <span class="text-xs text-gray-500">Max 10 MB</span>
                        </div>
                        <input
                          type="file"
                          id="doc"
                          name="doc"
                          accept="png, jpg"
                          onChange={(e) =>
                            setEditedEmployee({
                              ...editedEmployee,
                              imageUrl: handleFileChange(e),
                            })
                          }
                          hidden
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={member.imageUrl}
                        alt={member.firstName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <input
                      type="text"
                      value={editedEmployee.firstName}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          firstName: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    member.firstName
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <input
                      type="text"
                      value={editedEmployee.lastName}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          lastName: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    member.lastName
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <input
                      type="text"
                      value={editedEmployee.jobTitle}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          jobTitle: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    member.jobTitle
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <input
                      type="email"
                      value={editedEmployee.email}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          email: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <input
                      type="phoneNumber"
                      value={editedEmployee.phoneNumber}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="bg-neutral-800 p-2 rounded-md text-white focus:outline-none"
                    />
                  ) : (
                    member.phoneNumber
                  )}
                </td>
                <td>
                  {editingId === member.employeeId ? (
                    <div className="flex justify-center items-center">
                      <button
                        onClick={saveEdit}
                        className="border-2 border-green-800 bg-green-600 text-green-500 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => startEditing(member)}
                        className="border-2 border-yellow-600 bg-yellow-300 text-yellow-400 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                      >
                        <PencilIcon className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={() => removeTeamMember(member.employeeId)}
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
    </div>
  );
}
