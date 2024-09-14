import React from "react";

export const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log("file", file);

  // if (file.type !== "image/png" && file.type !== "image/jpeg") {
  //   alert("Please select a PNG or JPEG image file.");
  //   return;
  // }

  // if (file.size > 1024 * 1024) {
  //   alert("File size should not exceed 10MB.");
  //   return;
  // }

  const formData = new FormData();
  formData.append("file", file);
  console.log(Object.fromEntries(formData.entries()));
  return file;
};
