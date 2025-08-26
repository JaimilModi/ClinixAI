import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 flex flex-col pt-20">
      {/* Sign-in Warning */}
      {location.state?.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-200 text-red-700 px-6 py-3 text-center rounded-lg shadow-md m-4"
        >
          {location.state.message}
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 flex-1">
        {/* Left Side */}
        <motion.div
          className="text-center md:text-left max-w-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-4">
            Welcome to <span className="text-primary">ClinixAI</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your AI-powered healthcare assistant. Describe your symptoms, upload
            reports, and get AI-driven insights instantly.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <motion.button
              onClick={() => navigate("/write-symptom")}
              className="px-6 py-3 bg-primary hover:bg-pink-600 text-white rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Write Symptom
            </motion.button>
            <motion.button
              onClick={() => navigate("/review-report")}
              className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Review Report
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side (Hospital Illustration) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="Medical AI Assistant"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="px-6 md:px-16 py-12 bg-white rounded-t-3xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Why Choose ClinixAI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-xl text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
              alt="Symptom Checker"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-700 mb-2">
              AI Symptom Checker
            </h3>
            <p className="text-gray-600">
              Describe symptoms in natural language and let AI analyze them.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-xl text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3815/3815284.png"
              alt="Smart Reports"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-700 mb-2">
              Smart Reports
            </h3>
            <p className="text-gray-600">
              Upload medical reports and receive structured, AI-reviewed
              insights.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-xl text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Secure Data"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-700 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your medical data is encrypted and only accessible by you.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Footer Section */}
      <motion.div
        className="text-center py-16 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">
          Ready to experience AI-powered healthcare?
        </h2>
        <p className="text-gray-700 mb-6">
          Start today with ClinixAI and make your health smarter.
        </p>
        <button
          onClick={() => navigate("/write-symptom")}
          className="px-8 py-3 bg-primary hover:bg-pink-700 text-white rounded-xl shadow-lg"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
