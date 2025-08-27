import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const renderHeading = (text, colorClass = "text-black") =>
    [...text].map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className={colorClass}
      >
        {char}
      </motion.span>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50 flex flex-col pt-20">
      {location.state?.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-200 text-red-700 px-6 py-3 text-center rounded-lg shadow-md m-4"
        >
          {location.state.message}
        </motion.div>
      )}

      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 flex-1">
        <motion.div
          className="text-center md:text-left max-w-lg"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <div className="flex flex-wrap justify-center md:justify-start">
              {renderHeading("Welcome to ", "text-slate-700")}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start">
              {renderHeading("ClinixAI", "text-teal-600")}
            </div>
          </h1>

          <motion.p
            className="text-lg text-slate-700 mb-6"
            variants={fadeUpVariant}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            Your AI-powered healthcare assistant. Describe your symptoms, upload
            reports, and get AI-driven insights instantly.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center md:justify-start"
            variants={fadeUpVariant}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate("/write-symptom")}
              className="px-6 py-3 rounded-xl shadow-lg text-white bg-gradient-to-r from-teal-400 to-purple-600"
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #38b2ac, #805ad5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Write Symptom
            </motion.button>
            <motion.button
              onClick={() => navigate("/review-report")}
              className="px-6 py-3 rounded-xl shadow-lg text-white bg-gradient-to-r from-teal-400 to-purple-600"
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #38b2ac, #805ad5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Review Report
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          custom={1}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="Medical AI Assistant"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </motion.div>
      </div>

      <motion.div
        className="px-6 md:px-16 py-12 bg-white rounded-t-3xl shadow-lg"
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-10">
          Why Choose ClinixAI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/2966/2966487.png",
              title: "AI Symptom Checker",
              desc: "Describe symptoms in natural language and let AI analyze them.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/3815/3815284.png",
              title: "Smart Reports",
              desc: "Upload medical reports and receive structured, AI-reviewed insights.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              title: "Secure & Private",
              desc: "Your medical data is encrypted and only accessible by you.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-teal-50 rounded-2xl shadow-md hover:shadow-xl text-center"
              variants={fadeUpVariant}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-700 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-center py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 relative inline-block"
          variants={fadeUpVariant}
          custom={0}
        >
          Ready to experience AI-powered healthcare?
        </motion.h2>

        <motion.p
          className="text-slate-700 mb-6"
          variants={fadeUpVariant}
          custom={1}
        >
          Start today with ClinixAI and make your health smarter.
        </motion.p>

        <motion.button
          onClick={() => navigate("/write-symptom")}
          className="px-8 py-3 rounded-xl shadow-lg text-white bg-gradient-to-r from-teal-400 to-purple-600"
          whileHover={{
            scale: 1.05,
            background: "linear-gradient(to right, #38b2ac, #805ad5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
