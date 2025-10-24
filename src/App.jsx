import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectDetailPage from "./pages/SubjectDetailPage";
import ResourceListPage from "./pages/ResourceListPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
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
  const handleTouchEnd = () => clearTimeout(pressTimer.current);

  // ✨ Activate Admin Mode
  const activateAdminMode = () => {
    setShowAdminButton(true);
    setShowToast(true);

    // Fade-out toast after 3 s
    setTimeout(() => {
      const toast = document.querySelector(".admin-toast");
      if (toast) {
        toast.classList.add("fade-out");
        setTimeout(() => setShowToast(false), 700);
      }
    }, 3000);

    resetHideTimer();
  };

  // 🕒 Hide gear after 15 s of inactivity
  const resetHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowAdminButton(false), 5000);
  };

  // 👀 Detect user activity while admin button is visible
  useEffect(() => {
    const handleActivity = () => showAdminButton && resetHideTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [showAdminButton]);

  // 🔐 Redirect to Admin Login
  const handleAdminAccess = () => (window.location.href = "/admin-login");

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#0a001a] to-[#1a033d] text-white relative overflow-hidden">
        {/* 🌌 Starry background */}
        <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />

        {/* 🔝 Navbar */}
        <Navbar />

        {/* 🌌 Routes */}
        <div className="pt-20 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subject/:subjectId" element={<SubjectDetailPage />} />
            <Route
              path="/subject/:subjectId/:type"
              element={<ResourceListPage />}
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />

            {/* 🚫 404 fallback */}
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
                    className="bg-[radial-gradient(circle_at_80%_-10%,_#3fe9ff,_#0051ff80)]
                    text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(63,233,255,0.4)]
                    hover:shadow-[0_0_35px_rgba(63,233,255,0.7)]
                    hover:scale-105 transition"
                  >
                    Back to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>

        {/* 🕵️ Invisible touch area for mobile long-press */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed bottom-6 right-6 w-10 h-10 opacity-0 z-40"
        />

        {/* ⚙️ Floating Admin Button */}
        {showAdminButton && (
          <div
            onClick={handleAdminAccess}
            title="Admin Access"
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center
            text-2xl font-bold text-[var(--accent1)]
            bg-[radial-gradient(circle_at_80%_-10%,_#ffffff,_#0f1111)]
            border border-[rgba(63,233,255,0.25)]
            shadow-[0_0_25px_rgba(63,233,255,0.5)]
            hover:shadow-[0_0_35px_rgba(63,233,255,0.8)]
            hover:scale-110 transition-all duration-300
            cursor-pointer overflow-hidden backdrop-blur-md z-50"
          >
            ⚙️
          </div>
        )}

        {/* ✨ Admin-Mode Toast */}
        {showToast && (
          <div
            className="admin-toast fixed top-6 left-1/2 -translate-x-1/2
            px-5 py-2 rounded-full text-sm font-semibold tracking-wide
            text-white shadow-[0_0_25px_rgba(63,233,255,0.4)]
            bg-[radial-gradient(circle_at_80%_-10%,_#3fe9ff,_#0051ff80)]
            border border-[rgba(63,233,255,0.3)]
            backdrop-blur-md animate-pulse z-50 transition-all duration-700"
          >
            ✨ Admin Mode Activated
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
