import { Edit, Sparkles, Stethoscope } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

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
        "/api/ai/generate-article", //TODO
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
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

  return (
    <div className="min-h-screen w-full bg-pink-50 p-6 lg:p-10 text-slate-700 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <form
          onSubmit={onSubmitHandler}
          className="w-full p-6 bg-white rounded-2xl shadow-lg border border-pink-200"
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="w-7 h-7 text-pink-600" />
            <h1 className="text-2xl font-bold text-pink-700">
              ClinixAI Health Report Generator
            </h1>
          </div>
          <p className="mt-6 text-sm font-medium text-gray-700">
            Symptom / Health Concern
          </p>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-100"
            placeholder="e.g. Persistent cough, chest pain, fatigue..."
            required
          />
          <p className="mt-5 text-sm font-medium text-gray-700">Report Depth</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            {articLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
                  selectedLength.text === item.text
                    ? "bg-pink-100 text-pink-700 border-pink-500"
                    : "text-gray-500 border-gray-300 hover:bg-gray-100"
                }`}
                key={index}
              >
                {item.text}
              </span>
            ))}
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer shadow-md hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Sparkles className="w-5" />
            )}
            Generate Health Report
          </button>
        </form>

        <div className="w-full p-6 bg-white rounded-2xl shadow-lg flex flex-col border border-pink-200 min-h-[500px] lg:min-h-[600px]">
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-pink-600" />
            <h1 className="text-2xl font-bold text-pink-700">
              AI Health Report
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400 text-center">
                <Stethoscope className="w-12 h-12" />
                <p>
                  Enter a symptom and click{" "}
                  <span className="text-pink-600 font-medium">
                    "Generate Health Report"
                  </span>{" "}
                  to get AI-powered insights.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 h-full overflow-y-scroll text-sm text-slate-700 leading-relaxed">
              <div className="prose prose-sm prose-pink max-w-none reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteSymptom;
