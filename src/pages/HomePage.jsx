import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealLogo, setRevealLogo] = useState(true);
  const featureRefs = useRef([]);

  // Handle scroll events for parallax + progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);

      featureRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) ref.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Logo reveal animation
    setTimeout(() => setRevealLogo(false), 2500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D card tilt effect
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
    <div className="relative min-h-screen overflow-x-hidden text-white bg-[#0b0b2a]">
      {/* ====== Floating Stars Background ====== */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-50 animate-twinkle"
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

      {/* ====== Scroll Progress Bar ====== */}
      <div
        className="fixed top-0 left-0 h-[4px] bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ====== Sticky Navbar ====== */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-md">
        <div className="flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-bold text-purple-300 tracking-wide hover:scale-105 transition-transform">
            StudySphere 🚀
          </h1>
          <button
            onClick={() => navigate("/subjects")}
            className="text-sm font-semibold bg-purple-600 px-4 py-2 rounded-full hover:scale-110 hover:shadow-lg transition-all"
          >
            Explore Subjects
          </button>
        </div>
      </nav>

      {/* ====== Animated Logo Reveal ====== */}
      {revealLogo && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 animate-fadeOut">
          <h1 className="text-5xl font-extrabold text-purple-400 animate-pulse">
            StudySphere
          </h1>
          <p className="text-sm mt-3 text-gray-400">Loading knowledge...</p>
        </div>
      )}

      {/* ====== Hero Image Section ====== */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <img
          src="/vnit_.jpg"
          alt="VNIT Nagpur"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${zoomEffect})`,
            opacity: 1 - fadeEffect * 0.7,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b0b2a] transition-opacity duration-500"
          style={{ opacity: 0.6 + fadeEffect * 0.4 }}
        ></div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 transition-all duration-500"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - fadeEffect * 1.2,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-300 drop-shadow-lg">
            🏛️ Visvesvaraya National Institute of Technology, Nagpur
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 mb-4 drop-shadow-xl">
            Welcome to StudySphere
          </h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Your academic galaxy 🌌 — access notes, explore ideas, and level up your learning experience.
          </p>
        </div>
      </div>

      {/* ====== Features Section ====== */}
      <div className="relative z-10 flex flex-col items-center mt-24 px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-8 text-purple-300 text-center">
          Why Choose StudySphere?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl justify-center">
          {[
            {
              title: "All Notes in One Place",
              desc: "Access organized notes and important materials across all your subjects.",
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
              className="feature-card p-8 text-center bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl transition-all duration-300 hover:shadow-purple-500/30 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Footer ====== */}
      <footer className="mt-20 py-8 text-center border-t border-white/20 bg-white/5 backdrop-blur-md shadow-inner">
        <p className="text-sm text-gray-300 hover:text-purple-400 transition-all">
          ~ Designed by <span className="font-semibold">SHASHI</span>
        </p>
        <p className="text-xs text-gray-500 hover:text-gray-300">
          shashitherider2004@gmail.com
        </p>
      </footer>
    </div>
  );
}
