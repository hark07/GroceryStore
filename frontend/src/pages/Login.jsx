import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(
          currentState === "Sign Up"
            ? "Registration successful!"
            : "Login successful!"
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Request failed, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!token && stored) {
      setToken(stored);
    }
  }, [token, setToken]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none"
          placeholder="Enter Your Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none"
        placeholder="Enter Your Email"
        required
      />

      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none pr-10"
          placeholder="Enter Your Password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5a5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.707 1.293 1.293 2.707l3.764 3.764A10.944 10.944 0 0 0 1 12c1.737 4.215 6 7 11 7 2.088 0 4.047-.578 5.733-1.566l3.56 3.56 1.414-1.414-18-18Zm8.325 9.739 2.532 2.532A2.5 2.5 0 0 1 9.5 12c0-.263.042-.516.118-.755l1.414 1.414ZM12 5c4.407 0 8.165 2.675 9.743 6.476-.65 1.58-1.678 2.975-2.965 4.016l-2.266-2.267a5 5 0 0 0-6.962-6.962L7.445 4.78A10.899 10.899 0 0 1 12 5Z" />
            </svg>
          )}
        </span>
      </div>

      <div className="w-full flex justify-between text-sm mt-[8px]">
        <span className="text-gray-500">Forgot your password?</span>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white font-light px-8 py-2 mt-4 w-full rounded hover:bg-green-600 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
