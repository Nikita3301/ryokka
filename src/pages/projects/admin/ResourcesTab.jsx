import React, { useState, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import AddResourceForm from "./AddResourceForm";
import {
  getResourcesByProjectId,
  deleteResource,
} from "services/ResourceService";
import { DeleteModal } from "utils/DeleteModal";

const ResourcesTab = ({ projectId }) => {
  const [resources, setResources] = useState(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isDelResourceModalOpen, setIsDeleteResourceModalOpen] =
    useState(false);
  const [deleteResourceId, setDeleteResourceId] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesData = await getResourcesByProjectId(projectId);
        setResources(resourcesData);
      } catch (error) {
        toast.error("Error fetching resources");
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, [projectId]);

  const handleDelete = (resourceId) => {
    setDeleteResourceId(resourceId);
    setIsDeleteResourceModalOpen(true);
  };

  const handleDeleteResourceConfirm = async (resourceId) => {
    try {
      await deleteResource(resourceId);
      setResources((prevResources) =>
        prevResources.filter((resource) => resource.resourceId !== resourceId)
      );
      setDeleteResourceId(null);
      setIsDeleteResourceModalOpen(false);
      toast.success("Resource deleted successfully!");
    } catch (error) {
      toast.error("Error deleting resource");
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-center p-1 gap-3">
        <button
          onClick={() => setIsAddResourceModalOpen(true)}
          className="flex justify-center items-center gap-3 px-3 py-1 font-medium rounded-lg bg-teal-600/20 text-teal-600 hover:bg-teal-600/40 border-2 border-teal-600"
        >
          <PlusIcon className="size-6 inline" />
          Add new Resource
        </button>
      </div>
      <div className="overflow-x-auto flex justify-center p-3">
        {resources?.length > 0 ? (
          <table className="divide-y divide-neutral-900 table-auto min-w-fit whitespace-normal">
            <thead className="bg-neutral-950 text-neutral-400 text-sm font-medium text-center">
              <tr>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2 text-left">Description</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Unit Cost</th>
                <th className="px-2 py-2">Quantity</th>
                <th className="px-2 py-2">General Price</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y text-center divide-neutral-600 text-sm w-full">
              {resources.map((resource) => (
                <tr key={resource.resourceId}>
                  <td className="px-2 py-4">
                    {resource.resourceName}
                  </td>
                  <td className="px-2 py-4 text-left">
                    {resource.resourceDescription}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {resource.resourceType}
                  </td>
                
                  <td className="px-2 py-4 whitespace-nowrap">
                    $ {resource.unitCost.toFixed(2)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {resource.quantity} {resource.unitOfMeasure}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap font-semibold">
                    $ {resource.generalPrice.toFixed(2)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDelete(resource.resourceId)}
                      className="border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 hover:bg-opacity-50 p-2 rounded-lg"
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-white p-6 rounded-lg flex flex-col justify-center items-center gap-2">
            <h2 className="text-lg text-center font-semibold">
              No resources available.
            </h2>
            <p className="text-neutral-500 pb-6">
              Add a resource to get started.
            </p>
          </div>
        )}
      </div>

      {isAddResourceModalOpen && (
        <AddResourceForm
          projectId={projectId}
          setResources={setResources}
          setIsAddResourceModalOpen={setIsAddResourceModalOpen}
        />
      )}

      <DeleteModal
        isOpen={isDelResourceModalOpen}
        onClose={() => setIsDeleteResourceModalOpen(false)}
        onDelete={() => handleDeleteResourceConfirm(deleteResourceId)}
      />
    </div>
  );
};

export default ResourcesTab;
