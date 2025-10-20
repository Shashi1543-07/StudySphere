import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ResourceListPage = () => {
  const { subjectId, type } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔠 Normalize subject and type to match Firestore format
  const formattedSubject = subjectId
    .split("-")
    .map((word, index) =>
      /^[0-9]+$/.test(word)
        ? `-${word}`
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
    .replace(" -", "-");

  const formattedType = type?.toLowerCase().trim(); // <- normalize tab type

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const q = query(collection(db, "resources"), where("subject", "==", formattedSubject));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (r) =>
              r.type?.toLowerCase().trim() === formattedType // ✅ case-insensitive match
          );

        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [formattedSubject, formattedType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a001a] to-[#1a033d] text-white relative overflow-hidden flex flex-col items-center p-8">
      {/* 🌌 Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none"></div>

      {/* 🏛️ Header */}
      <div className="text-center relative z-10 mt-10 mb-8">
        <h1 className="text-4xl font-extrabold mb-3 drop-shadow-lg">
          {formattedSubject} — {type}
        </h1>
        <p className="text-gray-300 text-lg">
          Explore all available {type.toLowerCase()} for this subject.
        </p>
      </div>

      {/* 📚 Resource List */}
      <div className="relative z-10 max-w-3xl w-full">
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : resources.length > 0 ? (
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li
                key={index}
                className="p-5 bg-white/10 rounded-xl backdrop-blur-md border border-purple-500/30 shadow-lg hover:scale-[1.02] transform transition-all duration-300"
              >
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-white text-lg font-medium underline transition-all"
                >
                  {resource.title || "Open Resource"}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center italic">
            No {type.toLowerCase()} available yet.
          </p>
        )}
      </div>

      {/* 🔙 Back button */}
      <div className="flex gap-6 mt-12 relative z-10">
        <Link
          to={`/subject/${subjectId}`}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ← Back to {formattedSubject}
        </Link>
      </div>
    </div>
  );
};

export default ResourceListPage;
