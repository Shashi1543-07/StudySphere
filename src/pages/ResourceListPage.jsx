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

  const formattedType = type?.toLowerCase().trim();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const q = query(collection(db, "resources"), where("subject", "==", formattedSubject));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (r) => r.type?.toLowerCase().trim() === formattedType
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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center text-white bg-[var(--bg)]">
      {/* 🌌 Floating background particles */}
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

      {/* 🏛️ Header */}
      <div className="relative z-10 text-center mt-20 mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-[var(--accent1)] drop-shadow-[0_0_25px_var(--accent1)]">
          {formattedSubject} — {type}
        </h1>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Explore all available {type.toLowerCase()} for this subject.
        </p>
      </div>

      {/* 📚 Resource List */}
      <div className="relative z-10 max-w-3xl w-full px-6">
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : resources.length > 0 ? (
          <ul className="flex flex-col gap-6">
            {resources.map((resource, index) => (
              <li
                key={index}
                className="card-neon hover:scale-[1.02] transform transition-all duration-300"
              >
                <div className="card-inner text-center">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent1)] hover:text-white text-lg font-semibold underline transition-all"
                  >
                    {resource.title || "Open Resource"}
                  </a>
                </div>
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
      <div className="relative z-10 mt-16 mb-10">
        <Link to={`/subject/${subjectId}`} className="btn-neon">
          <div className="inner">← Back to {formattedSubject}</div>
        </Link>
      </div>
    </div>
  );
};

export default ResourceListPage;
