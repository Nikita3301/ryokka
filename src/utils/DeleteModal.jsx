import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 text-white p-6 rounded-lg flex flex-col justify-center items-center gap-2">
        <ExclamationTriangleIcon className="size-10 rounded-lg p-1 border-red-800 bg-red-600 text-red-500 bg-opacity-30" />
        <h2 className="text-lg text-center font-semibold">Confirm Delete</h2>
        <p className="text-neutral-500 pb-6">
          Are you sure you want to delete this item?
        </p>
        <button
          onClick={onDelete}
          className="w-56 px-2 py-1.5 font-semibold border-2 border-red-800 bg-red-600 text-red-500 bg-opacity-30 rounded hover:bg-opacity-50"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="w-56 px-2 py-1.5 font-semibold border-2 border-neutral-700 bg-neutral-600 text-neutral-500 bg-opacity-30 rounded hover:bg-opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
