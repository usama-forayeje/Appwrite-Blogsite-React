import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";// Corrected router import
import authService from "../appwrite/auth";
import { login } from "../fetchers/authSlice";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState(null);

  const logIn = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        userData && dispatch(login(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "An error occurred while logging in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signUp" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-200 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(logIn)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}

          <Input
            label="Password"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
