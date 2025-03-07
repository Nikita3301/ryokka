import React, { useState, useEffect } from "react";

import { getAllEmployees } from "services/EmployeeService";

export default function ProjectTeam() {
  const [employees, setEmployees] = useState([]);
  const [activePosition, setActivePosition] = useState("");
  const [uniquePositions, setUniquePositions] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();

        const uniquePositionsSet = [
          ...new Set(data.map((employee) => employee.jobTitle)),
        ];

        setUniquePositions(uniquePositionsSet);
        setEmployees(data);

        if (uniquePositionsSet.length > 0) {
          setActivePosition(uniquePositionsSet[0]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-gray-200">
      <div className="flex justify-center space-x-4 mb-8">
        {uniquePositions.length > 0 &&
          uniquePositions.map((jobTitle) => (
            <button
              key={jobTitle}
              onClick={() => setActivePosition(jobTitle)}
              className={`px-4 py-2 rounded-lg ${
                activePosition === jobTitle
                  ? "bg-teal-600 text-white font-semibold"
                  : "text-gray-400 font-semibold"
              } focus:outline-none transition-colors duration-300`}
            >
              {jobTitle}
            </button>
          ))}
      </div>

      {employees.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {employees
              .filter((division) => division.jobTitle === activePosition)
              .map((member) => (
                <div
                  key={member.email}
                  className="bg-neutral-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105"
                  aria-label={`Team member card for ${member.name}`}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-52 h-52 rounded-xl mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{member.role}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>Loading team members...</p>
      )}
    </div>
  );
}
