"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useAuthStore from "../../../store/useStore";

export default function Signup(): JSX.Element {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login, isAuthenticated, user } = useAuthStore();

  const validateInputs = () => {
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value
    ) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        { name, email, password }
      );
      const { token, userId } = res.data;

      const user = { token, userId, name };

      login(user);

      router.push("/");
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/rooms");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
          Sign Up
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
