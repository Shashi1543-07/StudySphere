import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🧠 Normalize subject name (handles dashes and numbers)
  const formattedSubject = subjectId
    .split("-")
    .map((word, index) => {
      return /^[0-9]+$/.test(word)
        ? `-${word}`
        : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(" -", "-");

  // 🔥 Firestore listener
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

  // ✅ Subject tabs
  const subjectTabs = {
    "Mathematics-1": ["Notes", "M-1 Tutorial", "Links"],
    "Electrical Engineering": ["Notes", "EE LAB", "Links"],
    Physics: ["Notes", "PHY LAB", "Links"],
    "Computer Programming": ["Notes", "CP LAB", "Links"],
    "HISP-1": ["Notes", "Links"],
  };

  const tabs = subjectTabs[formattedSubject] || ["Notes", "Links"];

  // ✅ Handle tab click
  const handleTabClick = (tab) => {
    navigate(`/subject/${subjectId}/${encodeURIComponent(tab)}`);
  };

  // ✅ Check if tab has resources
  const hasResourcesForTab = (tab) =>
    resources.some(
      (r) => r.type?.toLowerCase().trim() === tab.toLowerCase().trim()
    );

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center text-white bg-[var(--bg)]">
      {/* ✨ Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent1,#3fe9ff)] opacity-20 animate-twinkle"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 6 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* 🏛️ Title Section */}
      <div className="relative z-10 text-center mt-20 mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-[var(--accent1)] drop-shadow-[0_0_25px_var(--accent1)]">
          {formattedSubject}
        </h1>
        <p className="text-gray-300 mt-2 max-w-xl mx-auto">
          Explore curated study materials, tutorials, and labs for this subject.
        </p>
      </div>

      {/* 📚 Subject Tabs */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full mt-8 px-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(tab)}
            className="cursor-pointer card-neon transform hover:scale-[1.03] transition-all duration-300"
          >
            <div className="card-inner text-center">
              <h3 className="card-title mb-3">{tab}</h3>
              <p className="text-gray-400 text-sm italic">
                {loading
                  ? "Loading..."
                  : hasResourcesForTab(tab)
                  ? `Click to view ${tab.toLowerCase()}`
                  : `No ${tab.toLowerCase()} available yet.`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔙 Back Button */}
      <div className="relative z-10 mt-16 mb-12">
        <Link to="/subjects" className="btn-neon">
          <div className="inner">← Back to Subjects</div>
        </Link>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
