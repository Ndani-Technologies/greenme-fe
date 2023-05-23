import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import UsersManagement from "../pages/Management/UserManagement";
import Profile from "../pages/UserDetail/UserDetail";
import BenchmarkingQA from "../pages/BenchmarkingQA/BenchmarkingQA";
import Comparison from "../pages/Authentication/Benchmarking-Comparison/Comparison";
import BenchmarkingEdit from "../pages/Benchmarking_Edit_Question/Benchmarking";
import BenchmarkAdmin from "../pages/Benchmark-Admin/BenchmarkAdmin";
import QAComparison from "../pages/Benchmark-QA-Comparison/QAComparison";
import BenchmarkingDashboard from "../pages/Benchmarking-Dashboard/Benchmarking";
import Benchmarking from "../pages/Benchmarking/Benchmarking";
import BenhmarkSummary from "../pages/Benchmarking-Summary/Summary";
import BenchmarkSummaryAdmin from "../pages/Benchmak-Summary-Admin/BenchmarkingSummaryAdmin";
import UserReport from "../pages/Actions-userReport/UserReport";
import AdminReport from "../pages/Actions-Admin Report/AdminReport";
import ActionUserSummary from "../pages/Action-User-Summary/ActionUserSummary";
import ActionAdminSummary from "../pages/Action-Admin-Summary/ActionAdminSummary";
import ActionComparison from "../pages/ActionComparison/ActionComparison";
import ActionAdminDashboard from "../pages/Action-Admin-Dashboard/ActionAdminDashboard";
import { components } from "react-select";
import AdminRelation from "../pages/Action-Admin-Relationship/AdminRelation";
import ActionUserDetail from "../pages/Action-User-Detail/ActionUserDetail";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
  { path: "/Profile", component: <Profile /> },
  { path: "/UsersManagement", component: <UsersManagement /> },
  //benchmarking user
  { path: "/benchmarking", component: <BenchmarkingDashboard /> },
  { path: `/benchmarking/:id`, component: <Benchmarking /> },
  { path: `/adminbenchmarking/:id`, component: <BenchmarkingEdit /> },
  { path: "/benchmarking/summary/:id", component: <BenhmarkSummary /> },
  //benchmarking admin
  { path: "/adminbenchmarking", component: <BenchmarkAdmin /> },
  {
    path: `/adminbenchmarking/summary/:id`,
    component: <BenchmarkSummaryAdmin />,
  },
  {
    path: `/adminbenchmarking/questions/summary/:id`,
    component: <BenchmarkSummaryAdmin />,
  },
  { path: "/adminbenchmarking/questions", component: <BenchmarkingQA /> },
  { path: "/adminbenchmarking/compare", component: <Comparison /> },
  { path: "/adminbenchmarking/questions/compare", component: <QAComparison /> },

  //User Recomendations pages
  { path: "/userreport", component: <UserReport /> },
  { path: "/usersummary", component: <ActionUserSummary /> },
  { path: "/actionuserdetail", component: <ActionUserDetail /> },
  //Admin Recomendations pages
  { path: "/adminreport", component: <AdminReport /> },
  ,
  { path: "/adminsummary", component: <ActionAdminSummary /> },
  { path: "/actioncomparison", component: <ActionComparison /> },
  { path: "/actionadmindashboard", component: <ActionAdminDashboard /> },
  { path: "/AdminRelationship", component: <AdminRelation /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
