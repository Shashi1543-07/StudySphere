import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminBar from "../../components/AdminBar";
import { adminEmail, q, addItem, watchAuth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";

export default function LinksPage() {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [user, setUser] = useState(null);

  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    const unsubAuth = watchAuth(setUser);
    const unsub = onSnapshot(q(`subjects/${subjectName}/links`), (snap) => {
      setLinks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsub();
      unsubAuth();
    };
  }, [subjectName]);

  const extractYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleAdd = async () => {
    if (!newLink.trim()) return;
    await addItem(`subjects/${subjectName}/links`, { url: newLink.trim() });
    setNewLink("");
  };

  return (
    <div className="min-h-screen bg-[#0b0b2a] text-white flex flex-col items-center py-20 px-4 relative">
      <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">
        {subjectName.toUpperCase()} — Study Links 🔗
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-2xl">
        Add useful YouTube/reference links. Public can view; only admin can add.
      </p>

      {isAdmin && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <input
            type="text"
            value={newLink}
            placeholder="Paste YouTube/URL"
            onChange={(e) => setNewLink(e.target.value)}
            className="w-80 px-4 py-2 rounded-lg text-black focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold transition-transform hover:scale-110 shadow-lg"
          >
            Add
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {links.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No links yet. 📺</p>
        ) : (
          links.map((item) => {
            const id = extractYouTubeId(item.url || "");
            return id ? (
              <iframe
                key={item.id}
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video"
                allowFullScreen
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform"
              ></iframe>
            ) : (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-center break-all"
              >
                {item.url}
              </a>
            );
          })
        )}
      </div>

      <button
        onClick={() => navigate(`/subject/${subjectName}`)}
        className="mt-16 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-transform hover:scale-110 shadow-lg"
      >
        ← Back
      </button>

      <AdminBar />
    </div>
  );
}
