import React, { useState } from "react";

const projects = [
  { title: "YOLOv12 Building Detection", tags: ["AI", "Computer Vision"] },
  { title: "DetectX - Safety Equipment Detection", tags: ["AI", "IoT"] },
  { title: "PCOSense - Health Monitoring", tags: ["Flutter", "Health"] },
  { title: "Fake News Detection", tags: ["ML", "NLP"] },
  { title: "Gesture-Controlled Wheelchair", tags: ["IoT", "Embedded"] },
];

const AIRecommend = () => {
  const [interest, setInterest] = useState("");
  const [recommended, setRecommended] = useState([]);

  const handleRecommend = () => {
    const rec = projects.filter((p) =>
      p.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase()))
    );
    setRecommended(rec);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-bold mb-10 neon-text">AI Project Recommendations</h2>
      <input
        type="text"
        placeholder="Enter your interest (e.g., AI, IoT, ML)"
        className="p-3 rounded-lg text-black w-64 mb-4"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <button
        onClick={handleRecommend}
        className="px-6 py-3 neon-button font-bold mb-8"
      >
        Recommend Projects
      </button>
      <div className="flex flex-col gap-4">
        {recommended.length === 0 && <p className="text-white">No recommendations yet.</p>}
        {recommended.map((p) => (
          <div key={p.title} className="p-4 bg-black/50 rounded-xl neon-button">
            {p.title} - Tags: {p.tags.join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommend;
