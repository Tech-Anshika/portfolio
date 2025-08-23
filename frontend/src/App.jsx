import React from "react";
import "./styles.css";

import HUD from "./components/HUD";
import ChatWidget from "./components/ChatWidget";
import MusicPlayer from "./components/MusicPlayer";
import BackgroundSprites from "./components/BackgroundSprites";

import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import "./ChatWidget.css";


const App = () => {
  return (
    <>
      <HUD />
      <BackgroundSprites />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ChatWidget />
      <MusicPlayer />
    </>
  );
};

export default App;
