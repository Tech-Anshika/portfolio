import React from "react";

const projects = [
  { 
    title: "YOLOv12 Building Detection", 
    desc: "Custom dataset + YOLOv12 for buildings; high precision mapping.",
    link: "https://github.com/Tech-Anshika/YOLOv12_Training"
  },
  { 
    title: "DetectX (Top-5 BWD 2.0)", 
    desc: "YOLOv8-L (98% mAP) + multilingual safety chatbot + RN app.",
    link: "https://github.com/Tech-Anshika/YOLOv8L-Object-Detection-Project"
  },
  { 
    title: "PCOSense", 
    desc: "Wearable sensors + Flutter app + AI chatbot + cycle calendar.",
    link: "https://github.com/Tech-Anshika/flutter-development-Apk-PCOSense-"
  },
  { 
    title: "Fake News Detector", 
    desc: "TF-IDF + Logistic Regression, strong accuracy, clean pipeline.",
    link: "https://github.com/Tech-Anshika/Fake-News-Detection" // अगर repo अलग है तो बदल दो
  },
  { 
    title: "Gesture Wheelchair", 
    desc: "MPU6050 gestures, ultrasonic collision avoid, ESP32 control.",
    link: "https://github.com/Tech-Anshika/Automated-Wheelchair-Prototype-with-Hand-Gesture-and-Bluetooth-Control-"
  },
  { 
    title: "Miner Safety IoT", 
    desc: "Live web dashboard + hazard alerts (IIIT Delhi).",
    link: "https://github.com/Tech-Anshika/Miner-Safety-IoT" // अगर repo अलग है तो बदल दो
  },
];

const Projects = () => {
  return (
    <section className="section" id="projects">
      <h2>Projects</h2>
      <div className="grid grid-2">
        {projects.map((p,i)=>(
          <div key={i} className="pixel-card">
            <h3 style={{ marginBottom: 6 }}>{p.title}</h3>
            <p>{p.desc}</p>
            <div style={{ marginTop: 12 }}>
              <a className="btn" href={p.link} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
