import React, { useEffect, useState } from "react";
import { adminEmail, auth, watchAuth, login, logout } from "../firebase";

export default function AdminBar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(adminEmail || "");
  const [password, setPassword] = useState("");

  useEffect(() => watchAuth(setUser), []);

  const isAdmin = user?.email === adminEmail;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setOpen(false);
      setPassword("");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!user ? (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg"
          >
            Admin Login
          </button>
          {open && (
            <form
              onSubmit={handleLogin}
              className="mt-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 w-72"
            >
              <div className="text-sm text-gray-200 mb-2">Login as Admin</div>
              <input
                className="w-full mb-2 px-3 py-2 rounded text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full mb-3 px-3 py-2 rounded text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full px-3 py-2 rounded bg-purple-600 hover:bg-purple-700 font-semibold">
                Login
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm">
          <div className="mb-2">Logged in: {user.email}</div>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${isAdmin ? "bg-green-600" : "bg-red-600"}`}>
              {isAdmin ? "ADMIN" : "NOT ADMIN"}
            </span>
            <button onClick={logout} className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 font-semibold">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
