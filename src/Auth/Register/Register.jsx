import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaLock, FaImage, FaEnvelope } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../../Context/AuthContext';




const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext)
  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

    try {
      setUploading(true);
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!profilePic) {
      return Swal.fire('Upload Error', 'Please upload a profile picture.', 'warning');
    }

    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;
      console.log(user);
      

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: profilePic,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      const res = await axiosInstance.post('/users', userInfo);

      if (res.data.insertedId || res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Welcome to our platform!',
        }).then(() => {
          navigate(from, { replace: true });
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire('Error', error.message || 'Registration failed', 'error');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/DwcRJwWL/Hero-slider.jpg')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Full Name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">Name is required</p>}
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FaImage /> Upload Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md"
            />
            {uploading ? (
              <Skeleton height={32} className="mt-2" />
            ) : profilePic ? (
              <img
                src={profilePic}
                alt="Preview"
                className="w-16 h-16 rounded-full mt-3 object-cover border"
              />
            ) : null}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              uploading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
            Login
          </Link>
        </p>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
