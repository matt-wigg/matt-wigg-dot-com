"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a new Audio object and set the source
    if (audioRef.current === null) {
      audioRef.current = new Audio(tracks[currentTrack].source);
    }

    const audio = audioRef.current;

    // Define what to do when the track ends
    const handleTrackEnd = () => {
      nextSong();
    };

    if (audio) {
      audio.addEventListener("ended", handleTrackEnd);
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.removeEventListener("ended", handleTrackEnd);
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = tracks[currentTrack].source;
      audio.load();
      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentTrack, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => {
      const audio = audioRef.current;
      if (audio) {
        if (!prevIsPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
      return !prevIsPlaying;
    });
  };

  const changeTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setIsPlaying(true);
  };

  const nextSong = () => {
    changeTrack((currentTrack + 1) % tracks.length);
  };

  const restartOrPreviousTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
        audio.play();
      } else {
        changeTrack((currentTrack - 1 + tracks.length) % tracks.length);
      }
    }
  };

  const { artist, title } = tracks[currentTrack];

  return (
    <div
      className={`${style.audioContainer} bg-white dark:bg-zinc-950 hidden md:block`}
    >
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
          <Button
            className={style.playerButton}
            style={{ padding: 0 }}
            onClick={restartOrPreviousTrack}
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
              <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
            </svg>
          </Button>
          <Button
            className={isPlaying ? style.isPlaying : style.playerButton}
            style={{ padding: 0 }}
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
          </Button>
          <Button
            className={style.playerButton}
            style={{ padding: 0 }}
            onClick={nextSong}
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
              <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
