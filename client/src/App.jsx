import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUser, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import WriteSymptom from "./pages/WriteSymptom";
import ReviewReport from "./pages/ReviewReport";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/sign-in" />;
  }

  return children;
};

const App = () => {
  // const { getToken } = useAuth();
  // useEffect(() => {
  // getToken().then((token) => console.log(token));
  // }, []);

  return (
    <div className="min-h-screen bg-pink-50">
      <Toaster />
      <Navbar />
      <main className="pt-20 px-4 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
