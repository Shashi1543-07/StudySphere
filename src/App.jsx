import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";
import ResourceListPage from "./pages/ResourceListPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage"; // ✅ Added import
import "./index.css";

const App = () => {
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const pressTimer = useRef(null);
  const hideTimer = useRef(null);

  // 🧠 PC Shortcut Combo: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyCombo = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        activateAdminMode();
      }
    };
    window.addEventListener("keydown", handleKeyCombo);
    return () => window.removeEventListener("keydown", handleKeyCombo);
  }, []);

  // 🧠 Mobile Long-Press Logic
  const handleTouchStart = () => {
    pressTimer.current = setTimeout(() => activateAdminMode(), 2500);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
  };

  // ✨ Activate Admin Mode
  const activateAdminMode = () => {
    setShowAdminButton(true);
    setShowToast(true);

    // Smooth fade-out of toast after 3 seconds
    setTimeout(() => {
      const toast = document.querySelector(".admin-toast");
      if (toast) {
        toast.classList.add("fade-out");
        setTimeout(() => setShowToast(false), 700);
      }
    }, 3000);

    resetHideTimer();
  };

  // 🕒 Hide gear after 15 seconds of inactivity
  const resetHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowAdminButton(false);
    }, 15000);
  };

  // 👀 Detect user activity while admin button is visible
  useEffect(() => {
    const handleActivity = () => {
      if (showAdminButton) resetHideTimer();
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [showAdminButton]);

  // 🔐 Redirect to Firebase Auth Login page
  const handleAdminAccess = () => {
    window.location.href = "/admin-login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#0a001a] to-[#1a033d] text-white relative overflow-hidden">
        {/* ✨ Starry background */}
        <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />

        {/* 🔝 Navbar */}
        <Navbar />

        {/* 🌌 Page routes */}
        <div className="pt-20 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subject/:subjectId" element={<SubjectDetailPage />} />
            <Route path="/subject/:subjectId/:type" element={<ResourceListPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} /> {/* ✅ Added route */}

            {/* 🚫 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                  <h1 className="text-5xl font-bold mb-4">404</h1>
                  <p className="text-lg text-gray-300 mb-8">
                    The page you’re looking for doesn’t exist.
                  </p>
                  <a
                    href="/"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Back to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>

        {/* 🕵️ Invisible touch area for mobile long press */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed bottom-6 right-6 w-10 h-10 opacity-0 z-40"
        ></div>

        {/* ⚙️ Floating Admin Button */}
        {showAdminButton && (
          <div
            onClick={handleAdminAccess}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg hover:scale-110 hover:shadow-purple-400/40 transition-all cursor-pointer z-50"
            title="Admin Access"
          >
            ⚙️
          </div>
        )}

        {/* ✨ Toast Message */}
        {showToast && (
          <div
            className="admin-toast fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold animate-fadeIn z-50 transition-all duration-700"
          >
            ✨ Admin Mode Activated
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
