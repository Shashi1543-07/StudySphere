import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AdminPage = () => {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/admin-login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Subject-resource mapping
  const subjectResources = {
    "Mathematics-1": ["Notes", "M-1 Tutorial", "Links"],
    "Electrical Engineering": ["Notes", "EE LAB", "Links"],
    Physics: ["Notes", "PHY LAB", "Links"],
    "Computer Programming": ["Notes", "CP LAB", "Links"],
    "HISP-1": ["Notes", "Links"],
  };

  // ✅ Handle upload to Firestore
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!subject || !type || !link.trim()) {
      setStatus("⚠️ Please fill in all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "resources"), {
        subject: subject
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("-"),
        type: type.trim(),
        title: title.trim() || "Untitled Resource",
        link: link.trim(),
        timestamp: new Date(),
        uploadedBy: user?.email || "unknown",
      });

      setStatus("✅ Upload successful!");
      setTitle("");
      setLink("");
      setType("");
      setSubject("");

      setTimeout(() => setStatus(""), 2500);
    } catch (error) {
      console.error("Error uploading:", error);
      setStatus("❌ Upload failed. Try again.");
    }
  };

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* 🌌 Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent1)] opacity-20 animate-twinkle"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* 🔐 Admin Upload Panel */}
      <div className="relative z-10 bg-[rgba(20,22,22,0.7)] backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-[var(--accent1)] flex justify-center items-center gap-2">
          <span role="img" aria-label="lock">📤</span> Admin Upload Panel
        </h1>

        {user && (
          <p className="text-sm text-gray-300 mb-4">
            Logged in as <span className="text-[var(--accent1)]">{user.email}</span>
          </p>
        )}

        {/* 🔽 Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4">
          {/* Subject Dropdown */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent1)]"
          >
            <option value="">Select Subject</option>
            {Object.keys(subjectResources).map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          {/* Resource Type Dropdown */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!subject}
            className="w-full p-3 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent2)]"
          >
            <option value="">Select Resource Type</option>
            {subject &&
              subjectResources[subject].map((resType) => (
                <option key={resType} value={resType}>
                  {resType}
                </option>
              ))}
          </select>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter resource title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent1)]"
          />

          {/* Link Input */}
          <input
            type="text"
            placeholder="Paste resource link here"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent2)]"
          />

          {/* Upload Button */}
          <button
            type="submit"
            className="btn-neon w-full mt-2"
          >
            <div className="blob1"></div>
            <div className="inner">Upload Resource</div>
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p
            className={`mt-4 text-sm font-semibold ${
              status.includes("✅")
                ? "text-green-400"
                : status.includes("❌")
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {status}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate("/")}
            className="btn-neon w-full"
          >
            <div className="blob1"></div>
            <div className="inner">← Back to Home</div>
          </button>

          <button
            onClick={handleLogout}
            className="btn-neon w-full"
          >
            <div className="blob1"></div>
            <div className="inner">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
