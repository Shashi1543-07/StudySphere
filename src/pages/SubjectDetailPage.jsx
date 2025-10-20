import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🧠 Smart normalization — handles both dashes and numbers correctly
  const formattedSubject = subjectId
    .split("-")
    .map((word, index) => {
      return /^[0-9]+$/.test(word)
        ? `-${word}`
        : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(" -", "-");

  // 🔥 Real-time Firestore fetching with flexible subject matching
  useEffect(() => {
    const q = query(
      collection(db, "resources"),
      where("subject", "==", formattedSubject)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setResources(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching Firestore data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [formattedSubject]);

  // ✅ Subject Tabs — matches all expected subjects and types
  const subjectTabs = {
    "Mathematics-1": ["Notes", "M-1 Tutorial", "Links"],
    "Electrical Engineering": ["Notes", "EE LAB", "Links"],
    Physics: ["Notes", "PHY LAB", "Links"],
    "Computer Programming": ["Notes", "CP LAB", "Links"],
    "HISP-1": ["Notes", "Links"],
  };

  const tabs = subjectTabs[formattedSubject] || ["Notes", "Links"];

  // ✅ Navigate to ResourceListPage when tab clicked
  const handleTabClick = (tab) => {
    navigate(`/subject/${subjectId}/${encodeURIComponent(tab)}`);
  };

  // ✅ Normalize type comparison for case-insensitive match
  const hasResourcesForTab = (tab) =>
    resources.some(
      (r) =>
        r.type?.toLowerCase().trim() === tab.toLowerCase().trim()
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a001a] to-[#1a033d] text-white relative overflow-hidden flex flex-col items-center justify-start p-8">
      {/* 🌌 Particle background */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>

      {/* 🏛️ Title Section */}
      <div className="text-center relative z-10 mt-10 mb-8">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
          {formattedSubject}
        </h1>
        <p className="text-gray-300 text-lg">
          Explore curated study materials, tutorials, and labs for this subject.
        </p>
      </div>

      {/* 📚 Subject Tabs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mt-8 relative z-10">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(tab)}
            className="cursor-pointer rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 backdrop-blur-lg shadow-lg hover:scale-105 transform transition-all duration-300 p-6 text-center border border-purple-500/30 hover:shadow-purple-400/40"
          >
            <h3 className="text-2xl font-semibold mb-3 text-white">{tab}</h3>
            <p className="text-gray-400 text-sm italic">
              {loading
                ? "Loading..."
                : hasResourcesForTab(tab)
                ? `Click to view ${tab.toLowerCase()}`
                : `No ${tab.toLowerCase()} available yet.`}
            </p>
          </div>
        ))}
      </div>

      {/* 🔙 Back Button */}
      <div className="flex justify-center mt-12 relative z-10">
        <Link
          to="/subjects"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ← Back to Subjects
        </Link>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
