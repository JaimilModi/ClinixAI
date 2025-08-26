import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <Navigate to="/" replace state={{ message: "Please sign in first!" }} />
    );
  }

  return children;
};

export default ProtectedRoute;
