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
  const { artist, title, source } = tracks[currentTrack];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This code will run on the client side after the component mounts
    audioRef.current = new Audio(source);

    return () => {
      // Cleanup function to pause and dispose of the audio if the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const setAudioSource = (source: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = source;
      audioRef.current.load();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
      return !prevIsPlaying;
    });
  };

  const changeTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setAudioSource(tracks[trackIndex].source);
    setIsPlaying(true);
  };

  const restartAndPrevious = () => {
    changeTrack(currentTrack - 1 < 0 ? tracks.length - 1 : currentTrack - 1);
  };

  const nextSong = () => {
    changeTrack(currentTrack + 1 >= tracks.length ? 0 : currentTrack + 1);
  };

  useEffect(() => {
    const audio = audioRef.current;

    // Only proceed if audio is not null
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    const intervalId = setInterval(() => {
      // Make sure audio is not null inside the interval as well
      if (audio && audio.ended) {
        nextSong();
      }
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      setAudioSource(source);

      if (isPlaying) {
        audio.play();
      }
    }

    // Cleanup function to pause if the component unmounts
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [currentTrack]);

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
          <Button
            className={`${style.playerButton} px-0 py-0`}
            onClick={restartAndPrevious}
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
            className={`${
              isPlaying ? style.isPlaying : style.playerButton
            } px-0 py-0`}
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
            className={`${style.playerButton} px-0 py-0`}
            onClick={() => nextSong()}
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
