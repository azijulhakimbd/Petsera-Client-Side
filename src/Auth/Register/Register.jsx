import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserAlt,
  FaLock,
  FaGoogle,
  FaGithub,
  FaUserCircle,
} from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { createUser, googleSignIn, githubSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImageAndGetUrl = async (file, userId) => {
    const storage = getStorage();
    const imageRef = ref(storage, `userProfiles/${userId}/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    if (!fullName || !email || !password) {
      return setFirebaseError("Please fill in all required fields.");
    }
    if (password.length < 6) {
      return setFirebaseError("Password must be at least 6 characters.");
    }

    try {
      setSubmitting(true);
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      let photoURL = null;
      if (imageFile) {
        photoURL = await uploadImageAndGetUrl(imageFile, user.uid);
      }

      await updateProfile(user, {
        displayName: fullName,
        photoURL,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setFirebaseError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setSubmitting(true);
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.error(err);
      setFirebaseError("Google sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGitHubRegister = async () => {
    try {
      setSubmitting(true);
      await githubSignIn();
      navigate("/");
    } catch (err) {
      console.error(err);
      setFirebaseError("GitHub sign in failed.");
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
          Create an account
        </h2>

        {firebaseError && (
          <p className="text-sm text-red-500 text-center mb-4">
            {firebaseError}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label
              htmlFor="profileImage"
              className="text-sm  font-medium text-white"
            >
              Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm  pl-10 pr-3 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 mt-1"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              submitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handleGoogleRegister}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
          >
            <FaGoogle /> Google
          </button>

          <button
            onClick={handleGitHubRegister}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-md text-white font-semibold transition"
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
