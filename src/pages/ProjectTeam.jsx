import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ProjectTeam() {
  const teamData = [
    {
      role: "Project Manager",
      members: [
        {
          name: "Alice Johnson",
          photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          email: "alice@example.com",
          phone: "123-456-7890",
          linkedin: "https://www.linkedin.com/in/alicejohnson",
          twitter: "https://twitter.com/alicejohnson",
          role: "Project Manager",
        },
        {
          name: "Bob Smith",
          photo: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          email: "bob@example.com",
          phone: "098-765-4321",
          linkedin: "https://www.linkedin.com/in/bobsmith",
          twitter: "https://twitter.com/bobsmith",
          role: "Project Manager",
        },
      ],
    },
    {
      role: "Developers",
      members: [
        {
          name: "Charlie Brown",
          photo: "/path/to/photo3.jpg",
          email: "charlie@example.com",
          phone: "111-222-3333",
          linkedin: "https://www.linkedin.com/in/charliebrown",
          twitter: "https://twitter.com/charliebrown",
          role: "Developer",
        },
        {
          name: "Daisy Lee",
          photo: "/path/to/photo4.jpg",
          email: "daisy@example.com",
          phone: "444-555-6666",
          linkedin: "https://www.linkedin.com/in/daisylee",
          twitter: "https://twitter.com/daisylee",
          role: "Developer",
        },
      ],
    },
    {
      role: "Designers",
      members: [
        {
          name: "Emily Davis",
          photo: "/path/to/photo5.jpg",
          email: "emily@example.com",
          phone: "777-888-9999",
          linkedin: "https://www.linkedin.com/in/emilydavis",
          twitter: "https://twitter.com/emilydavis",
          role: "Designer",
        },
        {
          name: "Frank White",
          photo: "/path/to/photo6.jpg",
          email: "frank@example.com",
          phone: "000-111-2222",
          linkedin: "https://www.linkedin.com/in/frankwhite",
          twitter: "https://twitter.com/frankwhite",
          role: "Designer",
        },
      ],
    },
  ];

  const [activeRole, setActiveRole] = useState(teamData[0].role);

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-gray-200">
      {/* Tabs at the top */}
      <div className="flex justify-center space-x-4 mb-8">
        {teamData.map((division) => (
          <button
            key={division.role}
            onClick={() => setActiveRole(division.role)}
            className={`px-4 py-2 rounded-lg ${
              activeRole === division.role
                ? "bg-teal-600 text-white font-semibold"
                : "text-gray-400 font-semibold"
            } focus:outline-none transition-colors duration-300`}
          >
            {division.role}
          </button>
        ))}
      </div>
  
      {/* Team Members */}
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamData
            .find((division) => division.role === activeRole)
            .members.map((member) => (
              <div
                key={member.name}
                className="bg-neutral-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-52 h-52 rounded-xl mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2 text-gray-100">{member.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{member.role}</p>
  
                <div className="flex space-x-4 mt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
  
}
