import { Edit, Sparkles, Stethoscope } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { motion } from "framer-motion";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteSymptom = () => {
  const articLength = [
    { length: 500, text: "Brief (up to 500 words)" },
    { length: 1000, text: "Detailed (500-1000 words)" },
    { length: 1500, text: "Comprehensive (1000+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `You are ClinixAI, a medical AI assistant. Generate a patient-friendly health report about the symptom: "${input}" with insights, possible causes, prevention, and when to see a doctor. Length: ${selectedLength.text}.`;

      const { data } = await axios.post(
        "/api/write-symptom",
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-white to-purple-50 p-6 lg:p-12 text-slate-700 pt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <motion.form
          onSubmit={onSubmitHandler}
          variants={cardVariant}
          className="w-full p-8 bg-white rounded-3xl shadow-xl border border-teal-200 flex flex-col"
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-teal-600 animate-pulse" />
            <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide">
              ClinixAI Health Report
            </h1>
          </div>
          <p className="mt-6 text-sm font-medium text-gray-600">
            Enter your symptom or health concern
          </p>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-4 mt-3 outline-none text-sm rounded-xl border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
            placeholder="e.g. Persistent cough, chest pain, fatigue..."
            required
          />
          <p className="mt-6 text-sm font-medium text-gray-600">Report Depth</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            {articLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-5 py-2 border rounded-full cursor-pointer font-medium transition ${
                  selectedLength.text === item.text
                    ? "bg-teal-100 text-teal-700 border-teal-500"
                    : "text-gray-500 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 py-3 mt-8 text-sm rounded-xl cursor-pointer shadow-lg hover:opacity-95 transition"
          >
            {loading ? (
              <span className="w-5 h-5 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
            ) : (
              <Sparkles className="w-5" />
            )}
            Generate Health Report
          </button>
        </motion.form>

        <motion.div
          variants={cardVariant}
          className="w-full p-8 bg-white rounded-3xl shadow-xl flex flex-col border border-teal-200"
        >
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-purple-700">
              AI Health Report
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center mt-10 text-gray-400">
              <Stethoscope className="w-16 h-16 animate-bounce mb-4" />
              <p>
                Enter a symptom and click{" "}
                <span className="text-teal-600 font-semibold">
                  "Generate Health Report"
                </span>{" "}
                to get AI-powered insights.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mt-5 text-sm text-slate-700 leading-relaxed"
            >
              <div className="prose prose-sm prose-teal max-w-none reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WriteSymptom;
