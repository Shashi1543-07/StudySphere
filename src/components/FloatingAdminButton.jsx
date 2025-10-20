import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingAdminButton() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const secretKey = import.meta.env.VITE_ADMIN_KEY;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("key");
    if (key === secretKey) setVisible(true);
  }, [secretKey]);

  if (!visible) return null;

  const handleClick = () => {
    navigate(`/admin?key=${secretKey}`);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-transform duration-200 animate-pulse border border-purple-300"
      title="Admin Panel"
    >
      🔑
    </button>
  );
}
