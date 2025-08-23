import React from "react";

const skills = [
  "React Native","Flutter","Python","Java","C",
  "AI & ML","IoT","Cybersecurity","WSN","Soft Computing",
  "Jupyter","Arduino IDE","VS Code","Colab","Figma"
];

const Skills = () => {
  return (
    <section className="section" id="skills">
      <h2>Skills</h2>
      <div className="grid grid-3">
        {skills.map((s,i)=>(
          <div key={i} className="pixel-card">{s}</div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
