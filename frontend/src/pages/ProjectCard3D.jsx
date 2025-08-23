import React from "react";

const ProjectCard3D = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((proj, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg transform hover:rotate-1 hover:scale-105 transition duration-500"
        >
          <h3 className="text-xl font-bold text-white">{proj.title}</h3>
          <p className="text-gray-200 mt-2">{proj.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard3D;
