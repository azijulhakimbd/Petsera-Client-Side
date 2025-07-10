import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { signIn, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [firebaseError, setFirebaseError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    if (!email || !password) {
      setFirebaseError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setFirebaseError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setFirebaseError("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFirebaseError("");
    try {
      setSubmitting(true);
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setFirebaseError("Google login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGitHubLogin = async () => {
    setFirebaseError("");
    try {
      setSubmitting(true);
      await githubSignIn();
      navigate("/");
    } catch (err) {
      setFirebaseError("GitHub login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url(https://i.postimg.cc/DwcRJwWL/Hero-slider.jpg)",
      }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Login to your account
        </h2>

        {firebaseError && (
          <p className="text-sm text-red-600 text-center mb-4">
            {firebaseError}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium mb-1 block text-white"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaUserAlt />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium mb-1 block text-white"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              submitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } transition`}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login */}
        <div className="my-6 flex items-center justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
          >
            <FaGoogle /> Google
          </button>

          <button
            onClick={handleGitHubLogin}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-md text-white font-semibold transition"
          >
            <FaGithub /> GitHub
          </button>
        </div>

        {/* Link to Register */}
        <p className="text-sm text-center mt-4 text-white">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
