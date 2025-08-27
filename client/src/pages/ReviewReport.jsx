import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { motion } from "framer-motion";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewReport = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf", input);

      const { data } = await axios.post("/api/review-report", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

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
            <FileText className="w-8 h-8 text-teal-600 animate-pulse" />
            <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide">
              ClinixAI Report Reviewer
            </h1>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-600">Upload PDF</p>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-4 mt-3 outline-none text-sm rounded-xl border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 text-gray-600 transition"
            required
          />
          <p className="text-xs text-gray-500 font-light mt-1">
            Only PDF files are supported.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-400 to-purple-600 text-white px-4 py-3 mt-8 text-sm rounded-xl cursor-pointer shadow-lg hover:opacity-95 transition"
          >
            {loading ? (
              <span className="w-5 h-5 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
            ) : (
              <Sparkles className="w-5" />
            )}
            Review PDF
          </button>
        </motion.form>

        <motion.div
          variants={cardVariant}
          className="w-full p-8 bg-white rounded-3xl shadow-xl flex flex-col border border-teal-200"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-purple-700">
              AI Analysis Results
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center mt-10 text-gray-400">
              <FileText className="w-16 h-16 animate-bounce mb-4" />
              <p>
                Upload a PDF and click{" "}
                <span className="text-teal-600 font-semibold">
                  "Review PDF"
                </span>{" "}
                to receive AI-powered insights.
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

export default ReviewReport;
