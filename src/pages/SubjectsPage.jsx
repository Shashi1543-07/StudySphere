import React from "react";
import { Link } from "react-router-dom";

const SubjectsPage = () => {
  const subjects = [
    {
      title: "Mathematics-1",
      description:
        "Master the fundamentals of calculus, algebra, and analytical geometry.",
    },
    {
      title: "Electrical Engineering",
      description:
        "Learn about circuits, machines, and electromagnetic systems.",
    },
    {
      title: "Physics",
      description:
        "Explore the physical laws that shape modern technology.",
    },
    {
      title: "Computer Programming",
      description:
        "Develop problem-solving skills through structured programming concepts.",
    },
    {
      title: "HISP-1",
      description:
        "Enhance your health, information skills, and sportsmanship.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg,#020409)] text-white relative overflow-hidden flex flex-col items-center justify-start">
      {/* 🌌 Floating Particles */}
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
              animationDelay: Math.random() * 5 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* 🏛️ Header */}
      <div className="text-center relative z-10 mt-16 mb-12">
        <h1 className="text-5xl font-extrabold mb-3 tracking-wide text-[var(--accent1,#3fe9ff)] drop-shadow-[0_0_20px_var(--accent1,#3fe9ff)]">
          Choose Your Subject ✨
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore your courses, labs, and resources — all in one glowing hub.
        </p>
      </div>

      {/* 📘 Subject Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            to={`/subject/${subject.title.replace(/\s+/g, "-")}`}
            className="group block transform transition-all duration-500 hover:scale-105"
          >
            <div className="card-neon">
              <div className="card-inner text-center">
                <h3 className="card-title mb-2">{subject.title}</h3>
                <p className="text-white/80 text-sm">
                  {subject.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ⬅️ Back to Home Button */}
      <div className="mb-12 relative z-10">
        <Link to="/" className="btn-neon">
          <div className="inner">← Back to Home</div>
        </Link>
      </div>
    </div>
  );
};

export default SubjectsPage;
