import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    // Normally you'd send this to your backend API here
    console.log("Contact form data:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Thanks for contacting Petsera! We'll get back to you soon.",
        });
        reset();
        resolve();
      }, 1500);
    });
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-25 px-6 sm:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Contact Info */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions, suggestions, or want to volunteer? Reach out — we
            love hearing from you!
          </p>

          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-pink-500 text-2xl" />
              <span>Petsera HQ, Dhanmondi, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-500 text-2xl" />
              <a href="tel:+8801234567890" className="hover:underline">
                +880 1234 567890
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-pink-500 text-2xl" />
              <a
                href="mailto:contact@petsera.org"
                className="hover:underline break-all"
              >
                contact@petsera.org
              </a>
            </div>

            <div className="flex space-x-6 text-pink-600 dark:text-pink-400 text-3xl mt-4">
              <a href="https://facebook.com/petsera" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook className="hover:text-pink-700 dark:hover:text-pink-300 transition" />
              </a>
              <a href="https://twitter.com/petsera" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter className="hover:text-pink-700 dark:hover:text-pink-300 transition" />
              </a>
              <a href="https://instagram.com/petsera" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="hover:text-pink-700 dark:hover:text-pink-300 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-pink-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-6"
          noValidate
        >
          <label className="flex flex-col">
            <span className="mb-1 font-semibold">Name *</span>
            <input
              type="text"
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
              className={`rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 mt-1 text-sm">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-semibold">Email *</span>
            <input
              type="email"
              placeholder="Your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-semibold">Message *</span>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              {...register("message", { required: "Message is required" })}
              className={`rounded-md border px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <span className="text-red-500 mt-1 text-sm">
                {errors.message.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
