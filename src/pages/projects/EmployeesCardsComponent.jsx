import React, { useState, useEffect } from "react";
import { getAllEmployees } from "services/EmployeeService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Grid, Pagination } from "swiper/modules";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeesCardsComponent() {
  const [employees, setEmployees] = useState([]);

  const copyEmailToClipboard = (email, firstName, lastName) => {
    navigator.clipboard
      .writeText(email)
      .then(() =>
        toast.success(`Email of ${firstName} ${lastName} copied to clipboard!`)
      )
      .catch(() => toast.error("Failed to copy!"));
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Grid, Pagination]}
      className="p-2 w-full h-96"
    >
      {employees.map((employee) => (
        <SwiperSlide
          className="relative bg-neutral-900 rounded-xl group"
          key={employee.employeeId}
        >
          <img
            src={employee.imageUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-full h-full object-cover rounded-lg border-4 border-teal-900"
            loading="lazy"
          />

          <div className="absolute top-0 right-0 m-2 px-3 py-1 rounded-xl bg-neutral-800/70 group-hover:opacity-0 transition-opacity duration-300">
            <h4>{employee.jobTitle}</h4>
          </div>

          <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-teal-600/95 via-teal-500/80 to-teal-400/30 rounded-lg text-neutral-900">
            <div>
              <h4 className="text-2xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h4>
              <p className="text-lg font-semibold py-3">{employee.jobTitle}</p>
            </div>
            <button
              className="flex gap-4 justify-center items-center h-10 border-2 border-teal-900 bg-neutral-900 text-teal-500 hover:border-teal-500 px-6 py-2 rounded-lg shadow-lg hover:-translate-y-1 transition duration-500 hover:shadow-teal-900 font-semibold"
              onClick={() =>
                copyEmailToClipboard(
                  employee.email,
                  employee.firstName,
                  employee.lastName
                )
              }
            >
              <EnvelopeIcon className="w-6 flex-shrink-0" />
              <p>Copy email</p>
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
