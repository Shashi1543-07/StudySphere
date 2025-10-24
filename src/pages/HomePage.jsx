import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealLogo, setRevealLogo] = useState(true);
  const featureRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);

      featureRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) ref.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setRevealLogo(false), 2500);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e, index) => {
    const card = featureRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / 15).toFixed(2);
    const rotateY = ((rect.width / 2 - x) / 15).toFixed(2);
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (index) => {
    const card = featureRefs.current[index];
    if (card) {
      card.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const fadeEffect = Math.min(scrollY / 300, 1);
  const zoomEffect = 1 + Math.min(scrollY / 2000, 0.1);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-[var(--bg)]">
      {/* 🌌 Soft animated blue glow background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent1)] opacity-30 animate-twinkle"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
            }}
          ></div>
        ))}
      </div>

      {/* 🔵 Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)] z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* 🚀 Logo Loading Screen */}
      {revealLogo && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 animate-fadeOut">
          <h1 className="text-5xl font-extrabold text-[var(--accent1)] animate-pulse">
            StudySphere
          </h1>
          <p className="text-sm mt-3 text-gray-400">Loading knowledge...</p>
        </div>
      )}

      {/* 🏛️ Hero Section (VNIT Banner + Title ABOVE image) */}
      <div className="relative w-full overflow-hidden mt-[90px]">
        {/* Hero Text Block */}
        <div className="relative z-20 text-center py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--accent1)] drop-shadow-md mb-3">
            🏛️ Visvesvaraya National Institute of Technology, Nagpur
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-xl">
            Welcome to StudySphere
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-[var(--text-dim)]">
            Your academic galaxy 🌌 — access notes, explore ideas, and level up
            your learning experience.
          </p>
        </div>

        {/* VNIT Background Image */}
        <div className="relative w-full h-[85vh] overflow-hidden">
          <img
            src="/vnit_.jpg"
            alt="VNIT Nagpur"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out brightness-[0.55]"
            style={{
              transform: `scale(${zoomEffect})`,
              opacity: 1 - fadeEffect * 0.2,
            }}
          />
          {/* Overlay gradient to blend bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.3)] to-[var(--bg)]"></div>
        </div>
      </div>

      {/* ✨ Features Section */}
      <div className="relative z-10 flex flex-col items-center mt-24 px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-8 text-[var(--accent1)] text-center">
          Why Choose StudySphere?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl justify-center">
          {[
            {
              title: "All Notes in One Place",
              desc: "Access organized notes and materials for all your subjects.",
            },
            {
              title: "Smart Learning",
              desc: "Use summarized content and study techniques that help you learn faster.",
            },
            {
              title: "Built for Students",
              desc: "Simple, efficient, and responsive — designed just for you.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="feature-card p-8 text-center cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-3 text-[var(--accent1)]">
                {feature.title}
              </h3>
              <p className="text-[var(--text-dim)] text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 💎 Branding Footer (Home page only) */}
      <footer className="mt-20 py-8 text-center border-t border-[rgba(255,255,255,0.05)] bg-[rgba(15,17,17,0.7)] backdrop-blur-md relative z-20">
        <p className="text-sm text-[var(--text-dim)]">
          © 2025{" "}
          <span className="text-[var(--accent1)] font-semibold">StudySphere</span>{" "}
          | Designed by{" "}
          <span className="text-[var(--accent1)] font-semibold">Shashi</span> |{" "}
          <a
            href="mailto:shashitherider2004@gmail.com"
            className="hover:text-[var(--accent1)] transition-all"
          >
            shashitherider2004@gmail.com
          </a>{" "}
          | All rights reserved 🚀
        </p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent1)] to-transparent opacity-50"></div>
      </footer>
    </div>
  );
}
