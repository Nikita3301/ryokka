import React, { useState, useRef, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { auth } from "src/firebase/firebase";
import { NavLink, useNavigate } from "react-router-dom";

import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ErrorMessage from "utils/ErrorMessage";
import Toast from "utils/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const pwdRef = useRef();

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          setValidation("The email address is already in use");
        } else if (errorCode == "auth/invalid-email") {
          setValidation("The email address is not valid.");
        } else if (errorCode == "auth/operation-not-allowed") {
          setValidation("Operation not allowed.");
        } else if (errorCode == "auth/weak-password") {
          setValidation("The password is too weak.");
        }
      });
  };

  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setMessageType("success");
    } catch (error) {
      setMessage("Error sending reset email.");
      setMessageType("error");
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };


  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Login Success:", user);
        // Handle user information and redirection here
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageType("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [messageType]);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-5/6 bg-neutral-900 rounded-3xl shadow max-w-md p-6 overflow-auto scrollbar-thin">
          <h1 className="text-2xl text-center justify-center font-bold text-white pb-4">
            Sign in
          </h1>
          <div className="text-white  border bg-gradient-to-r from-teal-500 to-yellow-300 rounded p-0.5">
            <span className="flex justify-center gap-3 w-full bg-neutral-950 rounded p-1">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 p-2" />
              <button onClick={handleGoogleLogin}>Sign in with Google</button>
            </span>
          </div>
          <div className="text-lg font-semibold flex justify-center text-white p-3">
            or
          </div>
          <div className="flex flex-col">
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
                <EnvelopeIcon className="w-4 h-4" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg pl-10 w-full font-medium block flex-1 text-sm p-2.5"
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
                <LockClosedIcon className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                ref={pwdRef}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="font-medium text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 pr-10 p-2.5"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={handleShowPasswordToggle}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </div>
            </div>
            <button
              className="font-semibold flex justify-end items-center text-yellow-300 mb-3"
              onClick={() => setIsOpen(true)}
            >
              Forgot password?
            </button>

            <button
              type="submit"
              onClick={onLogin}
              className="w-full bg-gradient-to-r font-semibold from-teal-600 via-teal-500 to-yellow-300 text-white py-2 px-2 rounded-md flex items-center justify-center space-x-2"
            >
              <span>Login</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center h-3 my-5">
              {validation && ErrorMessage(validation)}
            </div>
          </div>

          <p className="text-white flex justify-center">
            No account yet?&nbsp;{" "}
            <NavLink className="text-teal-600 font-semibold" to="/admin/signup">
              Sign up
            </NavLink>
          </p>

          {message && Toast(message, messageType)}
        </div>
        {/* Popup (Modal) */}
        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded-md"
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
      </div>
    </div>
  );
};

export default Login;
