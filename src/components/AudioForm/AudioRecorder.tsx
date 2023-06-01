import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import {
  MicrophoneIcon,
  StopIcon,
  ArrowUpIcon,
  ArrowPathIcon,
  XCircleIcon,
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
    setAudioBlob(null);
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

  const clearRecording = () => {
    setAudioBlob(null);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className='py-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {!recording && (
          <div className='md:col-span-3'>
            <Button
              onClick={startRecording}
              disabled={isLoading}
              className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
            >
              <div className='flex items-center'>
                <>
                  <MicrophoneIcon
                    className={`h-5 w-5 mr-2 ${
                      isLoading ? 'text-gray-600' : 'text-yellow-400'
                    } group-hover:text-yellow-400 dark:group-hover:text-yellow-400`}
                  />
                </>
                {audioBlob ? 'New Recording' : 'Start Recording'}
              </div>
            </Button>
          </div>
        )}

        {recording && (
          <div className='md:col-span-3'>
            <Button
              onClick={stopRecording}
              disabled={isLoading}
              className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
            >
              <div className='flex items-center'>
                <StopIcon className='h-5 w-5 mr-2 text-red-600' />
                Stop Recording
              </div>
            </Button>
          </div>
        )}
        {audioBlob && !recording && (
          <div className='md:col-span-1'>
            <Button
              onClick={clearRecording}
              disabled={isLoading}
              className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
            >
              <div className='flex items-center'>
                <XCircleIcon
                  className={`h-5 w-5 mr-2  ${
                    isLoading ? 'text-gray-600' : 'text-red-600'
                  }`}
                />
                Clear Recording
              </div>
            </Button>
          </div>
        )}
        {isLoading ? (
          <div className='md:col-span-2'>
            <Button className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'>
              <div className='flex items-center'>
                <ArrowPathIcon className='h-5 w-5 mr-2 text-gray-600 animate-spin' />
                Staging...
              </div>
            </Button>
          </div>
        ) : (
          audioBlob &&
          !recording && (
            <div className='md:col-span-2'>
              <Button
                onClick={handleSubmit}
                className='w-full bg-white hover:bg-gray-100 rounded-md px-6 py-2 border border-gray-700 flex items-center justify-center'
              >
                <div className='flex items-center'>
                  <ArrowUpIcon className='h-5 w-5 mr-2 text-blue-600' />
                  Stage Recording
                </div>
              </Button>
            </div>
          )
        )}
      </div>
      {audioBlob && (
        <div className='pt-4 w-full'>
          <hr className='mb-4 border-t border-gray-700 dark:border-gray-600' />
          <audio className='w-full' ref={audioRef} controls />
          <hr className='mt-4 border-t border-gray-700 dark:border-gray-600' />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
