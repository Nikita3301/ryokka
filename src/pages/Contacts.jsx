import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // For email icon
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Contacts() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    types: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Handle form submission logic
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, types: [...prevData.types, value] };
      } else {
        return {
          ...prevData,
          types: prevData.types.filter((service) => service !== value),
        };
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-neutral-200 gap-4">
      <h1 className="text-4xl font-bold">Get in Touch</h1>
      <p className="text-lg max-w-2xl text-center text-neutral-400">
        We’re here to help. Chat to our friendly team 24/7 and get set up and
        ready to go in just 5 minutes.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
        <ul className="flex flex-col justify-start items-start space-y-2 font-semibold">
          <li className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-teal-600" />
            <a href="#" className="text-teal-600">
              Shoot us an email
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faTelegram} className="text-teal-600" />
            <a href="#" className="text-teal-600">
              Message us on Telegram
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-1.5 rounded outline-none text-neutral-800"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-1.5 rounded outline-none text-neutral-800"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1.5 rounded outline-none text-neutral-800"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-1.5 rounded outline-none text-neutral-800"
            placeholder="+38 (000) 000 00 00"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1.5 rounded outline-none text-neutral-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Types of Project
          </label>
          <div className="flex flex-wrap gap-4">
            <label>
              <input
                type="checkbox"
                value="Residential Landscaping"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Residential Landscaping
            </label>
            <label>
              <input
                type="checkbox"
                value="Commercial Landscaping"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Commercial Landscaping
            </label>
            <label>
              <input
                type="checkbox"
                value="Garden Renovation"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Garden Renovation
            </label>
            <label>
              <input
                type="checkbox"
                value="Hardscape Design"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Hardscape Design
            </label>
            <label>
              <input
                type="checkbox"
                value="Water Features"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Water Features
            </label>
            <label>
              <input
                type="checkbox"
                value="Landscape Lighting"
                onChange={handleServiceChange}
                className="mr-2"
              />
              Landscape Lighting
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-600 text-white rounded font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
