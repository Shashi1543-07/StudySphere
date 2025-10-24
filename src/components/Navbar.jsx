import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[rgba(10,12,12,0.9)] border-b border-[var(--border)] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🔹 Left: Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-[var(--accent1)] hover:text-[var(--accent2)] tracking-wide transition-all"
        >
          StudySphere 🚀
        </Link>

        {/* 🔹 Right: Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/" className="btn-neon">
            <div className="blob1"></div>
            <div className="inner">Home</div>
          </Link>

          <Link to="/subjects" className="btn-neon">
            <div className="blob1"></div>
            <div className="inner">Subjects</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
