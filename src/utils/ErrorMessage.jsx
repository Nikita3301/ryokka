import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";


export default function ErrorMessage(errorMessage) {
  return (
    <div
      className="flex py-1 px-3 text-sm text-red-500 w-full"
      role="alert"
    >
      <InformationCircleIcon className="w-5 h-5 mr-1"/>
      <p className="font-semibold w-full">{errorMessage}</p>
    </div>
  );
}
