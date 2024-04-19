"use client";

import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import axios from "axios";
import userSignUp from "@/libs/userSignUp";
import Link from "next/link";
import Loading from "../../components/CustomLoading";
import { useRouter } from "next/navigation";



const RegistrationForm = () => {
  const router = useRouter();
  const [isFill, setIsFill] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    telephone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.telephone
    ) {
      setIsFill(false);
      return;
    }

    try {
      const response = await userSignUp(formData);
      console.log("Registration successful:", response);
      router.push("/");
      router.refresh();
      alert("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div className="h-[100vh] p-5 bg-gradient-to-tl from-red-600 to-slate-950">
        <div className="mt-[60px] w-[60vw] sm:w-[30vw] mx-auto flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto flex flex-col px-20 py-8 gap-5 rounded-xl glass bg-gradient-to-tl from-red-600  to-gray-700"
          >
            <div className=" text-xl text-white">Registration Form</div>
            <input
              type="text"
              placeholder="Name..."
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field bg-black text-white rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="email"
              placeholder="Email..."
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field bg-black text-white rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field bg-black text-white rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="string"
              placeholder="Telephone..."
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="input-field bg-black text-white rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              id="signin"
              type="submit"
              className="w-40 glass btn btn-error bg-red-600"
            >
              Register
            </button>
            {!isFill && (
              <div
                role="alert"
                className="text-red-600 mt-2 bg-black rounded-md px-4 py-2 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-5 w-5 mr-1 align-middle text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 4a1 1 0 012 0v5a1 1 0 11-2 0V4zm2 10a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="align-middle text-white">
                  Warning: Please fill in all information!
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default RegistrationForm;
