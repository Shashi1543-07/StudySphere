// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="relative z-20 mt-16 text-center text-sm text-gray-400 py-6 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(15,17,17,0.7)] backdrop-blur-md">
      <p className="text-[var(--text-dim)]">
        © 2025{" "}
        <span className="text-[var(--accent1)] font-semibold">StudySphere</span> | 
        Designed by{" "}
        <span className="text-[var(--accent1)] font-semibold">Shashi</span> | 
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
  );
};

export default Footer;
