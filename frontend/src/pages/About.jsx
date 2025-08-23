import React from "react";

const About = () => {
  return (
    <section className="section" id="about">
      <h2>About</h2>
      <div className="pixel-card">
        <p>
          B.Tech (IIoT) — 8.55 CGPA • Delhi<br/>
          Focus: AI/ML, IoT, Cybersecurity, App Dev. Hands-on with YOLOv8/12, WSN,
          Firebase, ESP32, Arduino, Flutter, React Native.
        </p>
        <p style={{ marginTop: 10 }}>
          <b>Internships:</b> IIIT Delhi (Miner Safety IoT Dashboard), IIT Guwahati (AI Threat Intelligence).
        </p>
      </div>
    </section>
  );
};

export default About;
