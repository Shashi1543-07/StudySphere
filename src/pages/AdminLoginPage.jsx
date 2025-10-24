import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Add Lucide icons

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* 🌌 Floating glow dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent1)] opacity-20 animate-twinkle"
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

      {/* 🔹 Login Card */}
      <div className="relative z-10 bg-[rgba(20,22,22,0.7)] backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-[var(--accent1)]">
          🔐 Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent1)]"
            required
          />

          {/* Password Input + Eye Button */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 bg-[#111313]/60 border border-[var(--border)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent2)]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--accent1)] transition-all"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Login Button */}
          <button type="submit" disabled={loading} className="btn-neon w-full mt-2">
            <div className="blob1"></div>
            <div className="inner">{loading ? "Logging in..." : "Login"}</div>
          </button>
        </form>

        {/* Back to Home Button */}
        <button onClick={() => navigate("/")} className="btn-neon w-full mt-6">
          <div className="blob1"></div>
          <div className="inner">← Back to Home</div>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
