import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import SignUpPage from "../src/pages/SignUpPage";
import ForgotPasswordPage from "../src/pages/ForgotPasswordPage";
import UserDashboardPage from "../src/pages/UserDashboardPage";
import EditProfilePage from "../src/pages/EditProfilePage";
import MyProfilePage from "../src/pages/MyProfilePage";
import NotificationPage from "../src/pages/NotificationPage";
import LandingPage from "../src/pages/LandingPage";
import PaymentPage from "../src/pages/PaymentPage";
import AttendancePage from "../src/pages/AttendancePage";
import LoginPage from "../src/pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import UserDetailPage from "./pages/UserDetailPage";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />}/>
          <Route path="/user/:userId" element={<UserDetailPage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
