import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminBar from "../../components/AdminBar";
import { adminEmail, q, addItem, uploadFile, watchAuth } from "../../firebase";
import { onSnapshot } from "firebase/firestore";

export default function LabPage() {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    const unsubAuth = watchAuth(setUser);
    const unsub = onSnapshot(q(`subjects/${subjectName}/lab`), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsub();
      unsubAuth();
    };
  }, [subjectName]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const path = `uploads/${subjectName}/lab/${Date.now()}_${file.name}`;
      const url = await uploadFile(path, file);
      await addItem(`subjects/${subjectName}/lab`, { name: file.name, url });
    }
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#0b0b2a] text-white flex flex-col items-center py-20 px-4 relative">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">
        {subjectName.toUpperCase()} — LAB ⚡
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-2xl">
        Lab manuals / experiment PDFs. {isAdmin ? "You can upload." : "Uploads are restricted to admin."}
      </p>

      {isAdmin && (
        <label className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full font-semibold transition-transform hover:scale-110 shadow-lg mb-10 text-black">
          Upload Lab Files
          <input type="file" accept="application/pdf" multiple className="hidden" onChange={handleUpload} />
        </label>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No lab files yet. 🧪</p>
        ) : (
          items.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-300/50 transition-all text-center"
            >
              {it.name}
            </a>
          ))
        )}
      </div>

      <button
        onClick={() => navigate(`/subject/${subjectName}`)}
        className="mt-16 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full font-semibold text-black transition-transform hover:scale-110 shadow-lg"
      >
        ← Back
      </button>

      <AdminBar />
    </div>
  );
}
