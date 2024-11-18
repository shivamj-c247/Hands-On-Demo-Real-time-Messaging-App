import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback.jsx";
import React from 'react'
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
// import NavBar from "../components/NavBar.jsx";
// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {

  const { user } = useAuth();
  // console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NavBar/>
      {children}</ErrorBoundary>
  );
};
