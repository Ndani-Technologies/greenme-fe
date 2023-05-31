import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//AuthenticationInner pages

import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";

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
  { path: "/auth-404-basic", component: <Basic404 /> },
];

export { authProtectedRoutes, publicRoutes };
