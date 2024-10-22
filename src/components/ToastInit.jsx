import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastInit = () => {
  return (
    <ToastContainer
    position="bottom-center"
    autoClose={3000}
    limit={3}
    theme="dark"
    stacked
  />
  )
}

export default ToastInit;

