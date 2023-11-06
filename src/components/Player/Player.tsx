"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import style from "./Player.module.css";

const tracks = [
  {
    id: 0,
    artist: "Hovvdy",
    title: "Ruby",
    source:
      "https://matt-wigg-dot-com-music.s3.us-west-1.amazonaws.com/ruby-hovvdy.mp3",
  },
  {
    id: 1,
    artist: "Sad Night Dynamite",
    title: "Krunk",
    source:
      "https://matt-wigg-dot-com-music.s3.us-west-1.amazonaws.com/krunk.mp3",
  },
];

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const { artist, title, source } = tracks[currentTrack];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number>(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const restartAndPrevious = () => {
    if (currentTrack - 1 < 0) {
      setCurrentTrack(tracks.length - 1);
    } else {
      setCurrentTrack(currentTrack - 1);
    }
    if (!isPlaying) setIsPlaying(true);
  };

  const nextSong = useCallback(() => {
    setCurrentTrack((prevTrack) => {
      if (prevTrack === tracks.length - 1) return 0;
      else return prevTrack + 1;
    });
    if (!isPlaying) setIsPlaying(true);
  }, [isPlaying]);

  const startTimer = useCallback(() => {
    // Clear any timers already running
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (audioRef.current && audioRef.current.ended) {
        nextSong();
      }
    }, 1000);
  }, [nextSong]);

  useEffect(() => {
    audioRef.current = new Audio(source);
  }, [source]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
      startTimer();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(tracks[currentTrack].source);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying]);

  return (
    <div className={style.auioContainer}>
      <div className={style.audioDetail}>
        <div className={style.trackInfo}>
          <div className={style.audioTitle}>{title}</div>
          <div className={style.audioSubTitle}>{artist}</div>
        </div>
        <div className={style.musicVisual}>
          <span className={isPlaying ? style.musicBars : style.paused} />
          <span className={isPlaying ? style.musicBars : style.paused} />
          <span className={isPlaying ? style.musicBars : style.paused} />
          <span className={isPlaying ? style.musicBars : style.paused} />
          <span className={isPlaying ? style.musicBars : style.paused} />
          <span className={isPlaying ? style.musicBars : style.paused} />
        </div>
        <div className={style.buttonContainer}>
          <button className={style.playerButton} onClick={restartAndPrevious}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
            </svg>
          </button>
          <button
            className={isPlaying ? style.isPlaying : style.playerButton}
            onClick={togglePlayPause}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={isPlaying ? "M8 7h3v10H8zm5 0h3v10h-3z" : "M7 6v12l10-6z"}
              ></path>
            </svg>
          </button>
          <button className={style.playerButton} onClick={() => nextSong()}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
