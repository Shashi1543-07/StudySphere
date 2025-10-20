import React from "react";
import { Link } from "react-router-dom";

const SubjectsPage = () => {
  const subjects = [
    {
      title: "Mathematics-1",
      description: "Master the fundamentals of calculus, algebra, and analytical geometry.",
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Electrical Engineering",
      description: "Learn about circuits, machines, and electromagnetic systems.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Physics",
      description: "Explore the physical laws that shape modern technology.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Computer Programming",
      description: "Develop problem-solving skills through structured programming concepts.",
      color: "from-green-500 to-emerald-400",
    },
    {
      title: "HISP-1",
      description: "Enhance your health, information skills, and sportsmanship.",
      color: "from-red-500 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a001a] to-[#1a033d] text-white relative overflow-hidden flex flex-col items-center justify-start">
      {/* 🌌 Floating particle background */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>

      {/* Page Title */}
      <div className="text-center relative z-10 mt-16 mb-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
          Choose Your Subject ✨
        </h1>
        <p className="text-gray-300 text-lg">
          Explore your courses, labs, and resources — all in one glowing hub.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-16 relative z-10">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            to={`/subject/${subject.title.replace(/\s+/g, "-")}`}
            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              className={`rounded-2xl p-6 bg-gradient-to-br ${subject.color} bg-opacity-80 backdrop-blur-md text-center text-white shadow-lg hover:shadow-purple-500/30`}
            >
              <h3 className="text-2xl font-bold mb-2">{subject.title}</h3>
              <p className="text-white/90">{subject.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="mb-10 relative z-10">
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SubjectsPage;
