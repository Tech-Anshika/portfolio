import React, { useRef, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} autoPlay loop>
        <source src="/retro-theme.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        style={{
          position: "fixed",
          left: 18,
          bottom: 18,
          zIndex: 80,
          background: "var(--accent)",
          border: "2px solid var(--accent-d)",
          borderRadius: 6,
          width: 54,
          height: 54,
          display: "grid",
          placeItems: "center",
          boxShadow: "0 6px 0 0 var(--accent-d)",
          cursor: "pointer"
        }}
        title="Toggle Music"
      >
        {playing ? <FaVolumeUp size={22} color="#082a27" /> : <FaVolumeMute size={22} color="#082a27" />}
      </button>
    </>
  );
};

export default MusicPlayer;
