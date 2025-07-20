import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const from = location.state?.from?.pathname || "/";

 const handleSocialLogin = async (provider) => {
  if (isLoggingIn) return;
  setIsLoggingIn(true);

  try {
    let result;
    if (provider === "google") {
      result = await googleSignIn();
    } else if (provider === "github") {
      result = await githubSignIn();
    }

    const user = result.user;
    console.log(user);

    const userInfo = {
      email: user?.email,
      name: user?.displayName,
      photoURL: user?.photoURL,
      role: "user",
      created_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
    };

    // Try to insert user to database, allow 409 to pass
    try {
      await axiosInstance.post("/users", userInfo);
    } catch (err) {
      if (err.response?.status === 409) {
        console.warn("User already exists. Proceeding to login.");
      } else {
        throw err;
      }
    }

    // Redirect to intended page
    navigate(from, { replace: true });
  } catch (error) {
    console.error("Social login error:", error);
    if (error.code === "auth/popup-closed-by-user") {
      alert("You closed the login popup. Please try again.");
    } else if (error.code === "auth/cancelled-popup-request") {
      alert("Login already in progress. Please wait.");
    } else {
      alert("An error occurred during login. Please try again.");
    }
  } finally {
    setIsLoggingIn(false);
  }
};

  return (
    <div className="text-center mt-6 space-y-4 max-w-md mx-auto">
      <p className="text-gray-500 dark:text-gray-400">Or sign in with</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => handleSocialLogin("google")}
          disabled={isLoggingIn}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition w-full sm:w-auto justify-center disabled:opacity-50"
          aria-label="Login with Google"
        >
          <FaGoogle size={20} />
          Google
        </button>

        <button
          onClick={() => handleSocialLogin("github")}
          disabled={isLoggingIn}
          className="flex items-center gap-2 px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md shadow-md transition w-full sm:w-auto justify-center disabled:opacity-50"
          aria-label="Login with GitHub"
        >
          <FaGithub size={20} />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
