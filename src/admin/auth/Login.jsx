import React, { useState, useRef} from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "src/firebase/firebase";
import { NavLink, useNavigate } from "react-router-dom";

import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ErrorMessage from "utils/ErrorMessage";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pwdRef = useRef();

  const onLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setValidation("Email and password are required.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log("Firebase ID Token:", token);
      localStorage.setItem('firebaseToken', token);
      navigate("/admin/projects");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setValidation("No user found with this email.");
      } else if (errorCode === "auth/wrong-password") {
        setValidation("Incorrect password.");
      } else if (errorCode === "auth/invalid-email") {
        setValidation("The email address is not valid.");
      } else if (errorCode === "auth/user-disabled") {
        setValidation("The user account has been disabled.");
      } else {
        setValidation("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending reset email");
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log("Firebase ID Token:", token);
      localStorage.setItem('firebaseToken', token);
      console.log("Google Login Success:", user);
      navigate("/admin/projects");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-5/6 bg-neutral-900 rounded-3xl shadow max-w-md p-6 overflow-auto scrollbar-thin">
          <h1 className="text-2xl text-center justify-center font-bold text-white pb-4">
            Sign in
          </h1>
          <button onClick={handleGoogleLogin} className="w-full text-white border bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-400 rounded-2xl p-0.5">
            <span className="flex items-center justify-center gap-3 w-full bg-neutral-950 rounded-2xl p-1">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 p-2" />
              <p className="font-bold">Sign in with Google</p>
            </span>
          </button>
          <div className="text-lg font-semibold flex justify-center text-white p-3">
            or
          </div>
          <form onSubmit={onLogin} className="flex flex-col">
            <div className="flex flex-row justify-between gap-2">
              <label
                htmlFor="email-address"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email address
              </label>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <EnvelopeIcon className="w-4 h-4 text-white" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 text-white rounded-xl pl-10 w-full font-medium block flex-1 text-sm p-2.5 border-2 border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-500"
                
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
            </div>

            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="w-4 h-4 text-white" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                ref={pwdRef}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-neutral-900 text-white rounded-xl pl-10 w-full font-medium block flex-1 text-sm p-2.5 border-2 border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-500"
                
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleShowPasswordToggle}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4 text-white" />
                ) : (
                  <EyeIcon className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex justify-end items-center mb-2">
              <button
                className="font-semibold text-yellow-300 mb-3"
                onClick={() => setIsOpen(true)}
                type="button"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r font-semibold from-teal-600 via-teal-500 to-yellow-400 text-white py-2 px-2 rounded-md flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : (
                <>
                  <span>Login</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center h-3 my-5">
              {validation && ErrorMessage(validation)}
            </div>
          </form>

          <p className="text-white flex justify-center">
            No account yet?&nbsp;{" "}
            <NavLink
              className="text-yellow-400 font-semibold"
              to="/admin/signup"
            >
              Sign up
            </NavLink>
          </p>
        </div>
        {/* Popup (Modal) */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-80">
            <div className="relative bg-gradient-to-tr from-neutral-900 to-neutral-950 border-2 border-black p-5 rounded-3xl shadow-lg max-w-sm w-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-teal-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <h2 className="flex justify-center text-xl font-semibold mb-2 text-white">
                Reset Password
              </h2>
              <p className="text-center text-sm font-semibold mb-4 text-neutral-400">
                Please enter your registered email address. We'll send
                instructions to help reset your password.
              </p>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <EnvelopeIcon className="w-4 h-4 text-white" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block pl-10 w-full py-2 mb-4 border border-gray-500 rounded-md bg-neutral-800 text-white focus:outline-none "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 text-white bg-teal-600 rounded-md"
                  onClick={() => {
                    triggerResetEmail();
                    setIsOpen(false);
                  }}
                >
                  Send Reset Email
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          limit={3}
          theme="dark"
          stacked
        />
      </div>
    </div>
  );
};

export default Login;
