import React, { use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";


const SocialLogin = () => {
  const { googleSignIn,githubSignIn,} = use(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const handleSocialLogin = async (provider) => {
    try {
      let result;
      if (provider === "google") {
        result = await googleSignIn();
      } else if (provider === "github") {
        result = await githubSignIn ();
      }

      const user = result.user;
      

      // Prepare user info for backend
      const userInfo = {
        email: user?.email,
        name:user?.displayName,
        photoURL:user?.photoURL,
        role: "user", 
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      console.log(user.displayName);
      
      
      // Send user info to backend
      const res = await axiosInstance.post("/users", userInfo);
      

      // Navigate to desired page
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  return (
    <div className="text-center mt-6 space-y-4 max-w-md mx-auto">
      <p className="text-gray-500 dark:text-gray-400">Or sign in with</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => handleSocialLogin("google")}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition w-full sm:w-auto justify-center"
          aria-label="Login with Google"
        >
          <FaGoogle size={20} />
          Google
        </button>

        <button
          onClick={() => handleSocialLogin("github")}
          className="flex items-center gap-2 px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md shadow-md transition w-full sm:w-auto justify-center"
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
