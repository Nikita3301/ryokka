import React, { useState, useEffect } from "react";
import axios from "axios";

export const ClientForm = ({ clientToEdit, onSave }) => {
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    contactPhone: "",
    contactEmail: "",
  });

  useEffect(() => {
    if (clientToEdit) {
      setClientData(clientToEdit);
    }
  }, [clientToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clientToEdit) {
      await axios.put(`/api/clients/${clientData.clientId}`, clientData);
    } else {
      await axios.post("/api/clients", clientData);
    }

    onSave();
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-lg">
      <h2 className="text-2xl text-white mb-4">
        {clientToEdit ? "Edit Client" : "Add New Client"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          value={clientData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="p-2 bg-neutral-800 text-gray-100 rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={clientData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="p-2 bg-neutral-800 text-gray-100 rounded-md"
        />
        <input
          type="text"
          name="contactPhone"
          value={clientData.contactPhone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="p-2 bg-neutral-800 text-gray-100 rounded-md"
        />
        <input
          type="email"
          name="contactEmail"
          value={clientData.contactEmail}
          onChange={handleInputChange}
          placeholder="Email"
          className="p-2 bg-neutral-800 text-gray-100 rounded-md"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 rounded-md"
        >
          {clientToEdit ? "Update Client" : "Add Client"}
        </button>
      </form>
    </div>
  );
};
