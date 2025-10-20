import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md shadow-lg text-white">
      <div className="flex items-center gap-2">
        <FaRocket className="text-purple-400 text-2xl" />
        <span className="text-xl font-bold">StudySphere</span>
      </div>
      <div className="flex gap-8">
        <Link
          to="/"
          className={`${
            isActive("/") ? "text-purple-400 border-b-2 border-purple-400" : "hover:text-purple-300"
          } transition-all font-medium`}
        >
          Home
        </Link>
        <Link
          to="/subjects"
          className={`${
            isActive("/subjects") ? "text-purple-400 border-b-2 border-purple-400" : "hover:text-purple-300"
          } transition-all font-medium`}
        >
          Subjects
        </Link>
      </div>
    </nav>
  );
}
