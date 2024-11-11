import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const ExcelExport = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    if (!Array.isArray(excelData) || excelData.length === 0) {
      console.error("Invalid data passed for export:", excelData);
      return;
    }
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] }; 
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" }); 
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension); 
    toast.success("File succesfully exported!")
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="flex justify-center items-center gap-3 w-fit border-2 font-medium border-sky-800 bg-sky-600/20 text-sky-500 hover:bg-sky-600/40 px-6 py-2 rounded-lg"
      >
        <ArrowUpTrayIcon className="size-6 inline"/>
        Export to Excel
      </button>
    </div>
  );
};

export default ExcelExport;
