import React, { useState } from "react";
import { createInvoice } from "services/InvoiceService"; // Assume you have this service for API calls
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function AddInvoiceForm({
  projectId,
  setInvoices,
  setIsAddInvoiceModalOpen,
}) {
  const initialInvoiceState = {
    projectId: projectId,
    invoiceName: "",
    invoiceDescription: "",
    issueDate: "",
    totalAmount: "",
    invoiceStatus: "PENDING",
  };

  const [newInvoice, setNewInvoice] = useState(initialInvoiceState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newInvoice.invoiceName ||
      !newInvoice.issueDate ||
      !newInvoice.totalAmount
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    console.log("newInvoice State:", newInvoice);
    try {
      const createdInvoice = await createInvoice(newInvoice);
      setInvoices((prevInvoices) => [...prevInvoices, createdInvoice]);
      setIsAddInvoiceModalOpen(false);
      toast.success("Invoice created successfully!");
      setNewInvoice(initialInvoiceState);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Failed to create invoice. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg w-full max-w-3xl"
      >
        <h2 className="text-xl text-center font-semibold text-neutral-200">
          Add Invoice
        </h2>

        <div>
          <label
            htmlFor="invoiceName"
            className="block text-sm text-neutral-400"
          >
            Invoice Name
          </label>
          <input
            type="text"
            id="invoiceName"
            name="invoiceName"
            value={newInvoice.invoiceName}
            onChange={handleInputChange}
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
          />
        </div>

        <div>
          <label
            htmlFor="invoiceDescription"
            className="block text-sm text-neutral-400"
          >
            Description
          </label>
          <textarea
            id="invoiceDescription"
            name="invoiceDescription"
            value={newInvoice.invoiceDescription}
            onChange={handleInputChange}
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
          />
        </div>

        <div className="flex justify-around gap-3">
          <div>
            <label
              htmlFor="issueDate"
              className="block text-sm text-neutral-400"
            >
              Issue Date
            </label>
            <DatePicker
              showIcon
              icon={
                <CalendarDaysIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-teal-500" />
              }
              id="issueDate"
              className="flex w-full text-center py-1.5 bg-neutral-900 rounded-md border-2 border-teal-500 focus:outline-none"
              selected={newInvoice.issueDate}
              onChange={(date) => {
                setNewInvoice((prevState) => ({
                  ...prevState,
                  issueDate: date,
                }));
              }}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label
              htmlFor="totalAmount"
              className="block text-sm text-neutral-400"
            >
              Total Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={newInvoice.totalAmount}
              onChange={handleInputChange}
              className="w-full rounded-lg px-4 py-1.5 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
              min="0"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="invoiceStatus"
            className="block text-sm text-neutral-400"
          >
            Status
          </label>
          <select
            id="invoiceStatus"
            name="invoiceStatus"
            value={newInvoice.invoiceStatus}
            onChange={handleInputChange}
            className="w-full rounded-lg px-4 py-2 bg-neutral-900 shadow-md focus:outline-none border-2 border-teal-600 focus:ring-2 focus:ring-teal-500 transition duration-700"
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-red-800 bg-red-600/20 text-red-500 hover:bg-red-600/40 px-10 py-2 rounded-lg"
            onClick={() => setIsAddInvoiceModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-fit border-2 font-medium border-green-800 bg-green-600/40 text-green-500 hover:bg-green-600/60 px-10 py-2 rounded-lg"
          >
            Add Invoice
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
