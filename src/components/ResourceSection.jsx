import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function ResourceSection({ subject, type }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const q = query(
        collection(db, "resources"),
        where("subject", "==", subject),
        where("type", "==", type)
      );
      const snapshot = await getDocs(q);
      setResources(snapshot.docs.map((doc) => doc.data()));
    };
    fetchResources();
  }, [subject, type]);

  if (resources.length === 0)
    return (
      <p className="text-gray-400 italic text-center mt-4">
        No resources uploaded yet.
      </p>
    );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {resources.map((res, index) => (
        <a
          key={index}
          href={res.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center text-white shadow-md transition-all hover:scale-105"
        >
          <h4 className="font-semibold mb-1">{res.title}</h4>
          <p className="text-xs text-gray-300">{res.type}</p>
        </a>
      ))}
    </div>
  );
}
