/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { loginUser } from "../features/auth";
import { useUser } from "../config/userContext";

function LoginForm({ setIsLoggedIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrors, setError] = useState(null);
  const { handleUser, handleTaskLabels, handleBookmarkLabels } = useUser();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      console.log(res);
      if (res?.user) {
        handleUser(res?.user);
      }

      if (res?.taskLabels) {
        handleTaskLabels(res?.taskLabels);
      }

      if (res?.bookmarkLabels) {
        handleBookmarkLabels(res?.bookmarkLabels);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[350px] bg-gray-100 rounded-lg flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-2 space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-lg font-semibold tracking-tight">Welcome back</h1>
          <p className="text-md text-gray-500">
            Enter your credentials to login
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 min-w-full">
            <label htmlFor="email" className="text-md text-left">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 min-w-full">
            <label htmlFor="password" className="text-md text-left">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="bg-gray-200 border border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isLoading}
            className="bg-gray-400 hover:bg-purple-500 rounded-md py-2 mt-2 text-sm font-medium transition-colors"
          >
            {isLoading ? "Please wait ..." : "Login"}
          </button>

          {loginErrors && (
            <p className="bg-red-400 p-2">{JSON.stringify(loginErrors)}</p>
          )}
        </form>
      </main>
    </div>
  );
}

export default LoginForm;
