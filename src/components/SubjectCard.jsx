import React from "react";

export default function SubjectCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 hover:bg-white/20 transition-all p-6 rounded-2xl shadow-lg cursor-pointer"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
