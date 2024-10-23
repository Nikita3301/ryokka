import React, { useState } from "react";
import { toast } from "react-toastify";
import { createResource } from "services/ResourceService";

const AddResourceForm = ({
  projectId,
  setResources,
  setIsAddResourceModalOpen,
}) => {
  const [formData, setFormData] = useState({
    resourceName: "",
    resourceDescription: "",
    resourceType: "",
    unitOfMeasure: "",
    unitCost: "",
    quantity: "",
    generalPrice: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newResource = {
        ...formData,
        projectId: projectId,
      };
      const createdResource = await createResource(newResource);
      setResources((prevResources) => [...prevResources, createdResource]);
      setIsAddResourceModalOpen(false);
      toast.success("Resource added successfully!");
    } catch (error) {
      toast.error("Error adding resource.");
      console.error("Error adding resource:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-lg w-full ">
        <h2 className="text-xl text-center font-semibold text-neutral-200 pb-6">
          Add New Resource
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg w-full max-w-3xl"
        >
          <div>
            <label
              htmlFor="resourceName"
              className="block text-sm text-neutral-400"
            >
              Resource Name
            </label>
            <input
              type="text"
              id="resourceName"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
              required
            />
          </div>

          <div>
            <label
              htmlFor="resourceDescription"
              className="block text-sm text-neutral-400"
            >
              Description
            </label>
            <input
              type="text"
              id="resourceDescription"
              name="resourceDescription"
              value={formData.resourceDescription}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            />
          </div>

          <div>
            <label
              htmlFor="resourceType"
              className="block text-sm text-neutral-400"
            >
              Resource Type
            </label>
            <input
              type="text"
              id="resourceType"
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            />
          </div>

          <div>
            <label
              htmlFor="unitOfMeasure"
              className="block text-sm text-neutral-400"
            >
              Unit of Measure
            </label>
            <input
              type="text"
              id="unitOfMeasure"
              name="unitOfMeasure"
              value={formData.unitOfMeasure}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
            />
          </div>

          <div className="flex justify-around gap-3">
            <div>
              <label
                htmlFor="unitCost"
                className="block text-sm text-neutral-400"
              >
                Unit Cost
              </label>
              <input
                type="number"
                id="unitCost"
                name="unitCost"
                value={formData.unitCost}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
                step="0.01"
                required
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm text-neutral-400"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="generalPrice"
              className="block text-sm text-neutral-400"
            >
              General Price
            </label>
            <input
              type="number"
              id="generalPrice"
              name="generalPrice"
              value={formData.generalPrice}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setIsAddResourceModalOpen(false)}
              className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-red-800 bg-red-600/20 text-red-500 hover:bg-red-600/40 px-10 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-green-800 bg-green-600/40 text-green-500 hover:bg-green-600/60 px-10 py-2 rounded-lg"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceForm;
