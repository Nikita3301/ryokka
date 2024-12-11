import React, { useState, useEffect } from "react";
import { BanknotesIcon, PlusIcon } from "@heroicons/react/24/solid";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ExcelExport from "services/ExcelExport";
import { toast } from "react-toastify";
import AddInvoiceForm from "./AddInvoiceForm";
import { getInvoicesByProjectId, deleteInvoice } from "services/InvoiceService";
import { TrashIcon } from "@heroicons/react/24/solid";
import { DeleteModal } from "../../../utils/DeleteModal";
const InvoicesTab = ({ project, projectId }) => {
  const [invoices, setInvoices] = useState(null);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [isDelInvoiceModalOpen, setIsDeleteInvoiceModalOpen] = useState(false);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesData = await getInvoicesByProjectId(projectId);
        setInvoices(invoicesData);
        console.log(invoicesData);
      } catch (error) {
        toast.error("Error fetching invoices");
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, [projectId]);

  const handleDelete = (invoiceId) => {
    setDeleteInvoiceId(invoiceId);
    setIsDeleteInvoiceModalOpen(true);
  };

  const handleDeleteInvoiceConfirm = async (invoiceId) => {
    try {
      await deleteInvoice(invoiceId);
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.invoiceId !== invoiceId)
      );
      setDeleteInvoiceId(null);
      setIsDeleteInvoiceModalOpen(false);
      toast.success("Invoice deleted successfully!");
    } catch (error) {
      toast.error("Error deleting invoice");
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-center p-1 gap-3">
        <ExcelExport excelData={project.invoices} fileName={"Invoices"} />
        <button
          onClick={() => setIsAddInvoiceModalOpen(true)}
          className="flex justify-center items-center gap-3 px-3 py-1 font-medium rounded-lg bg-teal-600/20 text-teal-600 hover:bg-teal-600/40 border-2 border-teal-600"
        >
          <PlusIcon className="size-6 inline" />
          Add new Invoice
        </button>
      </div>
      <div className="overflow-x-auto flex justify-center p-3 w-full">
        {invoices?.length > 0 ? (
          <table className=" divide-y divide-neutral-900 ">
            <thead className="bg-neutral-950 text-neutral-400 text-sm font-medium text-center">
              <tr>
                <th className="px-6 py-2">Name</th>
                <th className="px-6 py-2 text-left">Description</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Issue Date</th>
                <th className="px-6 py-2">Total Amount</th>
               
                <th className="px-6 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y text-center divide-neutral-600 text-sm">
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td className="px-6 py-4">
                    {invoice.invoiceName}
                  </td>
                  <td className="px-6 py-4 text-left">
                    {invoice.invoiceDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <p
                      className={`px-3 py-1 flex justify-center items-center gap-2 font-semibold rounded-lg ${
                        invoice.invoiceStatus === "Paid"
                          ? "bg-green-600/20 text-green-600"
                          : invoice.invoiceStatus === "Pending"
                          ? "bg-yellow-600/20 text-yellow-600"
                          : "bg-red-600/20 text-red-600"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCircle} className="w-2 h-2" />
                      {invoice.invoiceStatus}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(invoice.issueDate, "dd.MM.yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${invoice.totalAmount}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={(e) => {
                        handleDelete(invoice.invoiceId);
                      }}
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
            <BanknotesIcon className="size-10 rounded-lg p-1 border-neutral-800 bg-neutral-600 text-neutral-500 bg-opacity-30" />
            <h2 className="text-lg text-center font-semibold">
              Project doesn't have any invoices yet.
            </h2>
            <p className="text-neutral-500 pb-6"> No data found ....</p>
          </div>
        )}
      </div>

      {isAddInvoiceModalOpen && (
        <AddInvoiceForm
          projectId={projectId}
          setInvoices={setInvoices}
          setIsAddInvoiceModalOpen={setIsAddInvoiceModalOpen}
        />
      )}

      <DeleteModal
        isOpen={isDelInvoiceModalOpen}
        onClose={() => setIsDeleteInvoiceModalOpen(false)}
        onDelete={() => handleDeleteInvoiceConfirm(deleteInvoiceId)}
      />
    </div>
  );
};

export default InvoicesTab;
