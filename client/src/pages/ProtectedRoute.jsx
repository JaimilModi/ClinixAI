import React from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/sign-up" />;
  }

  return children;
};

export default ProtectedRoute;
