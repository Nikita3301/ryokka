import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "src/firebase/firebase";

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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const pwdRef = useRef();
  const pwdConfirmRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState("");

  const SignUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        console.error("Error in user Credential");
        return;
      }
      const token = credential.accessToken;
      const user = result.user;

      navigate("/home");

      console.log(user, token);
    } catch (error) {
      toast.error(
        "There was an issue signing up with Google. Please try again."
      );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setValidation("");
    if (
      (pwdRef.current.value.length || pwdConfirmRef.current.value.length) < 6
    ) {
      setValidation("The password must contain at least 6 characters");
      return;
    }
    if (pwdRef.current.value !== pwdConfirmRef.current.value) {
      setValidation("The entered passwords do not match");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/login");
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

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-5/6 bg-neutral-900 rounded-3xl shadow max-w-md p-6 overflow-auto scrollbar-thin">
          <h1 className="text-2xl text-center justify-center font-bold text-white pb-4">
            Create new account
          </h1>

          <div className="text-white border bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-400 rounded-2xl p-0.5">
            <span className="flex justify-center gap-3 w-full bg-neutral-950 rounded-2xl p-1">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 p-2" />
              <button onClick={SignUpWithGoogle}>Sign up with Google</button>
            </span>
          </div>
          <div className="text-lg font-semibold flex justify-center text-white p-3">
            or
          </div>

          <form className="flex flex-col">
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
                type="email"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
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

            <div className="relative mb-6">
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
                required
                placeholder="Password"
                className="bg-neutral-900 text-white rounded-xl pl-10 w-full font-medium block flex-1 text-sm p-2.5 border-2 border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-500"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={handleShowPasswordToggle}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4 text-white" />
                ) : (
                  <EyeIcon className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="repeatPassword"
                className="block mb-2 text-sm font-medium text-white"
              >
                Repeat Password
              </label>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="w-4 h-4 text-white" />
              </div>
              <input
                type="password"
                ref={pwdConfirmRef}
                name="repeatPassword"
                id="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                placeholder="Repeat password"
                className="bg-neutral-900 text-white rounded-xl pl-10 w-full font-medium block flex-1 text-sm p-2.5 border-2 border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-500"
              />
            </div>

            <button
              type="submit"
              onClick={onSubmit}
              className="w-full bg-gradient-to-r font-semibold from-teal-600 via-teal-500 to-yellow-300 text-white py-2 px-2 rounded-md flex items-center justify-center space-x-2"
            >
              <span>Sign up</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center h-3 my-5">
              {validation && ErrorMessage(validation)}
            </div>
          </form>

          <p className="text-white flex justify-center">
            Already have an account?&nbsp;
            <NavLink
              className="text-yellow-400 font-semibold"
              to="/admin/login"
            >
              Sign in
            </NavLink>
          </p>
        </div>

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

export default Signup;
