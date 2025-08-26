import React from "react";
import { Route, Routes } from "react-router-dom";
import WriteSymptom from "./pages/WriteSymptom";
import ReviewReport from "./pages/ReviewReport";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write-symptom" element={<WriteSymptom />} />
        <Route path="/review-report" element={<ReviewReport />} />
      </Routes>
    </div>
  );
};

export default App;
