import React, { useEffect, useRef, useState } from "react";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

const GameMusic = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/game-theme.mp3" loop />
      <button
        onClick={togglePlay}
        className="music-btn"
      >
        {playing ? <FaMusic /> : <FaVolumeMute />}
      </button>
    </>
  );
};

export default GameMusic;
