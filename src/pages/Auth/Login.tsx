import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  setLoading,
  setError,
} from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../../components/ui";
import Logo from "../../components/layout/Logo";
import axiosInstance from "../../services/api";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Call backend login API (adjust URL/shape to your backend)
      const resp = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { token, refreshToken, user } = resp.data || {};

      // Fallback mock if backend not ready
      const finalUser = user || {
        id: "1",
        username,
        email: `${username}@example.com`,
        name: username,
        role: "admin",
      };
      const finalToken = token || "mock-token";
      const finalRefresh = refreshToken || "mock-refresh-token";

      dispatch(
        setCredentials({
          user: finalUser,
          token: finalToken,
          refreshToken: finalRefresh,
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Brand / Promo Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 border-r border-gray-800">
          <div>
            <Logo className="" width={200} height={28} />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white leading-tight">
              Unified Network Intelligence
            </h2>
            <p className="text-gray-300">
              Discover, monitor, and manage your entire network with real-time
              insights, powerful automation, and beautiful visualizations.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-blue-400">✓</span>
                Topology discovery and mapping
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400">✓</span>
                Device inventory and configuration
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400">✓</span>
                Performance and log analytics
              </li>
            </ul>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Exaware Routing Ltd. — NMS 2.1.6
          </div>
        </div>

        {/* Auth Panel */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-xl shadow-lg p-8">
              <div className="mb-8 text-center">
                <div className="flex justify-center items-center lg:hidden">
                  <Logo className="mx-auto mb-4" width={180} height={24} />
                </div>
                <h1 className="text-2xl font-semibold text-white">
                  Welcome back
                </h1>
                <p className="text-gray-400 mt-1">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm hover:text-gray-300"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center text-sm text-gray-300">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!username || !password}
                >
                  Sign in
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-6 text-center">
                By signing in, you agree to the Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
