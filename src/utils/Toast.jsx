import React from "react";
import {
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

function Toast(message, messageType) {
  return (
    <div className="absolute bottom-0 left-0 flex flex-row justify-center w-full">
      {messageType && (
        <div
          id="toast-danger"
          className="w-64 p-3 mb-4 flex items-center rounded-full shadow text-gray-400 bg-gray-800"
          role="alert"
        >
          {console.log(messageType)}
          {messageType === "error" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full bg-red-800 text-red-200">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span className="sr-only">Error icon</span>
            </div>
          )}
          {messageType === "success" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full bg-green-800 text-green-200">
              <CheckBadgeIcon className="w-5 h-5" />
              <span className="sr-only">Error icon</span>
            </div>
          )}
          {messageType === "info" && (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full bg-blue-800 text-info-200">
              <InformationCircleIcon className="w-5 h-5" />
              <span className="sr-only">Error icon</span>
            </div>
          )}

          <div className="text-sm font-semibold text-center w-full">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}

export default Toast;
