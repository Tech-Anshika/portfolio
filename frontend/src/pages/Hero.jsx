import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="section hero" id="home">
      <div className="pixel-card" style={{ maxWidth: 720, margin: "0 auto" }}>
        <img src="/profile.jpg" alt="Anshika" className="avatar" />
        <h1>ANSHIKA TYAGI // IIoT</h1>
        <p>
          AI • ML • IoT • Cybersecurity • App Dev (React Native/Flutter)<br/>
          Research @ IIIT Delhi & IIT Guwahati • Winner: BuildWithDelhi 2.0
        </p>
        <div style={{ marginTop: 16 }}>
          <a href="#projects" className="btn">View Projects</a>
        </div>
      </div>

      <a href="#about" className="arrow" aria-label="Scroll Down">
        <FaArrowDown />
      </a>
    </section>
  );
};

export default Hero;
