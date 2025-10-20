import React from "react";
import { BookOpen, Lightbulb } from "lucide-react";

export default function StudyTipsPage() {
  const tips = [
    { id: 1, title: "Focus on Concepts", text: "Understand why things work, not just how. This helps with deeper learning." },
    { id: 2, title: "Take Regular Breaks", text: "Use the Pomodoro technique: 25 minutes of studying, 5 minutes of rest." },
    { id: 3, title: "Use Active Recall", text: "After reading a topic, close your book and try to explain it aloud." },
    { id: 4, title: "Test Yourself Often", text: "Quizzes and flashcards boost memory retention effectively." },
    { id: 5, title: "Teach What You Learn", text: "Explaining a topic to someone else helps reinforce your own understanding." },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto pt-28">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <BookOpen className="w-8 h-8 text-indigo-400" />
        <h1 className="text-3xl font-bold glow-text">Study Tips</h1>
      </div>

      <p className="text-gray-300 text-center mb-8">
        Boost your learning efficiency with these proven strategies.
      </p>

      <div className="grid gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="glow-card p-5 hover:scale-[1.02] transition-transform duration-300 fade-in"
            style={{ animationDelay: `${tip.id * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="text-yellow-400 w-5 h-5" />
              <h2 className="text-xl font-semibold text-indigo-300">{tip.title}</h2>
            </div>
            <p className="text-gray-400">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
