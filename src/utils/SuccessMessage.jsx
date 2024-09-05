import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";


export default function SuccessMessage(successMessage) {
  return (
    <div
      className="flex py-1 px-3 text-sm text-green-500 w-full"
      role="alert"
    >
      <CheckCircleIcon className="w-5 h-5 mr-1"/>
      <p className="font-semibold w-full">{successMessage}</p>
    </div>
  );
}
