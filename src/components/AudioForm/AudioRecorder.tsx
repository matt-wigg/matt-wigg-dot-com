import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import {
  MicrophoneIcon,
  StopIcon,
  ArrowUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

type AudioRecorderProps = {
  onRecord: (blob: Blob) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecord }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioBlob) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
    }
  }, [audioBlob]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
      setStream(s);
      const mediaRecorder = new MediaRecorder(s);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();

      const audioChunks: BlobPart[] = [];
      mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
        audioChunks.push(event.data);
        setAudioBlob(new Blob(audioChunks, { type: 'audio/webm' }));
      });

      setRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setRecording(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    onRecord(audioBlob!);
    setIsLoading(false);
  };

  return (
    <div className='pt-4'>
      <div
        className='controls'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          paddingBottom: '1rem',
        }}
      >
        {!recording && !isLoading && (
          <Button
            onClick={startRecording}
            className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
          >
            <div className='flex items-center'>
              <MicrophoneIcon className='h-5 w-5 mr-2 text-gray-600' />
              Start Recording
            </div>
          </Button>
        )}

        {recording && (
          <Button
            onClick={stopRecording}
            className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
          >
            <div className='flex items-center'>
              <StopIcon className='h-5 w-5 mr-2 text-gray-600' />
              Stop Recording
            </div>
          </Button>
        )}

        {isLoading ? (
          <Button
            className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
            disabled
          >
            <div className='flex items-center'>
              <ArrowPathIcon className='h-5 w-5 mr-2 text-gray-600 animate-spin' />
              Staging Recording
            </div>
          </Button>
        ) : (
          audioBlob &&
          !recording && (
            <Button
              onClick={handleSubmit}
              className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
            >
              <div className='flex items-center'>
                <ArrowUpIcon className='h-5 w-5 mr-2 text-gray-600' />
                Stage Recording File
              </div>
            </Button>
          )
        )}
      </div>
      {audioBlob && !recording && (
        <div
          style={{
            display: recording ? 'none' : 'block',
            paddingBottom: '1rem',
          }}
        >
          <div className='flex justify-center items-center'>
            <audio className='w-full' ref={audioRef} controls />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
