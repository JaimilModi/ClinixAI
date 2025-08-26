import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import WriteSymptom from "./pages/WriteSymptom";
import ReviewReport from "./pages/ReviewReport";
import Home from "./pages/Home";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Home message="Please sign in first to access this page." />;
  }

  return children;
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/write-symptom"
          element={
            <ProtectedRoute>
              <WriteSymptom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review-report"
          element={
            <ProtectedRoute>
              <ReviewReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
