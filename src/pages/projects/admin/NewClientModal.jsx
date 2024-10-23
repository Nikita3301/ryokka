import React, { useState } from "react";
import { createClient } from "services/ClientService";
import { toast } from "react-toastify";

export default function NewClientModal({
  setIsModalOpen,
  clients,
  setClients,
}) {
  const initialClientState = {
    firstName: "",
    lastName: "",
    contactEmail: "",
    contactPhone: "",
  };

  const [newClient, setNewClient] = useState(initialClientState);
  const handleCreateNewClient = async () => {
    if (
      newClient.firstName &&
      newClient.lastName &&
      newClient.contactEmail &&
      newClient.contactPhone
    ) {
      try {
        const createdClient = await createClient(newClient);
        setNewClient(initialClientState);
        setIsModalOpen(false);
        setClients([...clients, createdClient]);
        toast.success("Client created successfully!");
      } catch (error) {
        console.error("Error creating client:", error);
        toast.error("Failed to create client. Please try again.");
      }
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  const handleNewClientInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-teal-500 text-xl font-semibold mb-4">
            Create New Client
          </h3>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newClient.firstName}
            onChange={handleNewClientInputChange}
            className="w-full mb-2 rounded-lg px-4 py-2 bg-neutral-800 shadow-md focus:outline-none border-2 border-teal-600"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newClient.lastName}
            onChange={handleNewClientInputChange}
            className="w-full mb-2 rounded-lg px-4 py-2 bg-neutral-800 shadow-md focus:outline-none border-2 border-teal-600"
          />

          <input
            type="email"
            name="contactEmail"
            placeholder="Email"
            value={newClient.contactEmail}
            onChange={handleNewClientInputChange}
            className="w-full mb-2 rounded-lg px-4 py-2 bg-neutral-800 shadow-md focus:outline-none border-2 border-teal-600"
          />

          <input
            type="tel"
            name="contactPhone"
            placeholder="Phone Number"
            value={newClient.contactPhone}
            onChange={handleNewClientInputChange}
            className="w-full mb-2 rounded-lg px-4 py-2 bg-neutral-800 shadow-md focus:outline-none border-2 border-teal-600"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-teal-600 border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateNewClient}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Add Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
