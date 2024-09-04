import React, { useState } from "react";

import { CalendarDateRangeIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ProjectsOverview() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Green Park Revamp",
      status: "In Progress",
      budget: "$25,000",
      startDate: "2024-01-15",
      endDate: "2025-06-30",
      location: "Central Park",
      description:
        "Revamping the green spaces in the central park to enhance aesthetics and functionality.",
      image: "https://images.unsplash.com/photo-1624640648158-fb2feac98e23?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Riverside Garden",
      status: "Completed",
      budget: "$40,000",
      startDate: "2023-03-01",
      endDate: "2023-11-15",
      location: "Riverside",
      description:
        "Creating a beautiful garden by the riverside, including walking paths and seating areas.",
      image: "https://plus.unsplash.com/premium_photo-1711255562146-0acdc7d5c659?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
    },
    {
      id: 3,
      name: "City Center Plaza",
      status: "Pending",
      budget: "$60,000",
      startDate: "2024-07-01",
      endDate: "2025-01-01",
      location: "City Center",
      description:
        "Designing a new plaza for the city center with green spaces and modern amenities.",
      image: "https://plus.unsplash.com/premium_photo-1666863910470-c5906f963cb4?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
    },
  ]);
 // State for search and status filter
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedStatus, setSelectedStatus] = useState("");

 // Filter logic
 const filteredProjects = projects.filter((project) => {
   const matchesStatus = selectedStatus ? project.status === selectedStatus : true;
   const matchesSearchQuery = searchQuery
     ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.description.toLowerCase().includes(searchQuery.toLowerCase())
     : true;

   return matchesStatus && matchesSearchQuery;
 });

 return (
   <div className="p-6 bg-gray-100 min-h-screen">

     {/* Search and Status Filter Controls */}
     <div className="mb-6 flex flex-col gap-4 md:flex-row md:gap-6">
       <input
         type="text"
         placeholder="Search projects..."
         className="w-1/3 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
       />
       
       

       <select
         className="p-2 rounded"
         value={selectedStatus}
         onChange={(e) => setSelectedStatus(e.target.value)}
       >
         <option value="">All</option>
         <option value="In Progress">In Progress</option>
         <option value="Completed">Completed</option>
         <option value="Pending">Pending</option>
       </select>
      
     </div>

     <div className="grid grid-cols-1 gap-6">
       {filteredProjects.map((project) => (
         <div
           key={project.id}
           className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row"
         >
           <img
             src={project.image}
             alt={project.name}
             className="w-full lg:w-1/3 h-48 lg:h-auto object-cover"
           />
           <div className="p-6 flex-1">
             <div className="h-4/6">
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-semibold">{project.name}</h2>
                 <span
                   className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                     project.status === "Completed"
                       ? "bg-green-200 text-green-800"
                       : project.status === "In Progress"
                       ? "bg-yellow-200 text-yellow-800"
                       : "bg-gray-200 text-gray-800"
                   }`}
                 >
                   {project.status}
                 </span>
               </div>
               <p className="text-gray-700 mb-4">
                 <strong>Description:</strong> {project.description}
               </p>
             </div>

             <div className="flex justify-between items-center mb-4 mt-auto">
               <div className="flex items-center gap-5">
                 <MapPinIcon className="w-10 h-10 text-green-700 bg-green-300 p-3 rounded-full" />
                 <div className="text-gray-700">
                   <strong>Location:</strong>
                   <div>{project.location}</div>
                 </div>
               </div>

               <div className="flex items-center gap-5">
                 <CalendarDateRangeIcon className="w-10 h-10 text-orange-700 bg-orange-300 p-3 rounded-full" />
                 <div className="text-gray-700">
                   <strong>Dates:</strong>
                   <div>
                     {project.startDate.split("-")[0]}-
                     {project.endDate.split("-")[0]}
                   </div>
                 </div>
               </div>

               <button
                 onClick={() => alert(`View details of ${project.name}`)}
                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
               >
                 View Details
               </button>
             </div>
           </div>
         </div>
       ))}
     </div>

   </div>
 );
}
