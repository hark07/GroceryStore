import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    const savedPassword = localStorage.getItem("adminPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminPassword", password);
        setToken(response.data.token);
        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-3 border border-gray-300 outline-none"
              type="email"
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div className="mb-3 min-w-72 relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-3 border border-gray-300 outline-none pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="admin123"
              required
            />
            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[43px] cursor-pointer text-gray-500"
            >
              {showPassword ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15c-2.76 0-5-2.24-5-5s2.24-5 5-5a5 5 0 010 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                // Eye Slash Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4.03 3.97A9.935 9.935 0 001 10c.73 2.89 4 7 9 7 1.69 0 3.26-.47 4.6-1.28l-1.46-1.46A6.997 6.997 0 0110 17c-3.87 0-7.16-3.13-7.93-6 .35-1.37 1.21-2.73 2.38-3.9L4.03 3.97zM12.12 9.88l-1.41-1.41a3 3 0 01-3.18 3.18l-1.41-1.41A5 5 0 0012.12 9.88zM15.9 14.32l1.42 1.42 1.4-1.4-1.41-1.42A9.935 9.935 0 0019 10c-.73-2.89-4-7-9-7-1.03 0-2.01.15-2.93.42l1.5 1.5A6.997 6.997 0 0117.93 10c-.35 1.37-1.21 2.73-2.38 3.9l.35.42z" />
                </svg>
              )}
            </span>
          </div>

          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
