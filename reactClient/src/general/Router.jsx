import { Route, Routes } from "react-router-dom";
import React from 'react'
import { RoutePaths } from "./RoutePaths.jsx";
import { Home } from "../pages/Home.jsx";
import { NotFound } from "./NotFound.jsx";
import { Layout } from "./Layout.jsx";
import SignIn from "../pages/Login.jsx";
import SignUp from "../pages/Register.jsx";
import EnableMFA from "../pages/EnableMfa.jsx";
import VerifyMFA from "../pages/VerifyMFA.jsx";
import VerifyRecoveryCode from "../pages/VerifyRecoveryCodes.jsx";
import SharedCodeView from "../pages/SharedCodeView.jsx";

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      path={RoutePaths.ENABLE_MFA}
      element={
        <Layout>
          <EnableMFA />
        </Layout>
      }
    />
    <Route
      path={RoutePaths.VERIFY_MFA}
      element={
          <VerifyMFA />
      }
    />
    <Route
      path={RoutePaths.VERIFY_RECOVERY_CODE}
      element={
          <VerifyRecoveryCode />
      }
    />
    <Route
      path="/login"
      element={
        <SignIn/>
      }
    />
    <Route
      path="/register"
      element={
        <SignUp/>
      }
    />
    <Route
      path={RoutePaths.SHARE_CODE}
      element={
        <SharedCodeView/>
      }
    />
    <Route
      path="*"
      element={
          <NotFound />
      }
    />
  </Routes>
);
