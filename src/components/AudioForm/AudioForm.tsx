'use client';
import React, { useState } from 'react';
import { CloudArrowUpIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ContentCard from '@/components/ContentCard/ContentCard';
import Button from '@/components/Button';

import AudioRecorder from './AudioRecorder';

const AudioForm = ({ show }: { show: boolean }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setAudioFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('clicked');

    if (audioFile !== null) {
      setLoading(true);

      try {
        // Make the request to the OpenAI Whisper ASR API here
        // and handle the response, updating the text state variable with the transcribed text
      } catch (error: any) {
        console.error('Error transcribing audio:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRecord = (blob: Blob) => {
    const file = new File([blob], 'recorded_audio.webm', {
      type: 'audio/webm',
    });
    setAudioFile(file);
  };

  const handleClearFile = () => {
    setAudioFile(null);
  };

  return (
    <ContentCard
      show={show}
      title='Whisper ASR API'
      content={
        <>
          <form onSubmit={handleSubmit}>
            <div className='flex'>
              <input
                type='file'
                accept='audio/*'
                onChange={handleFileChange}
                className='hidden'
                id='fileUpload'
                disabled={loading}
              />
              <label
                htmlFor='fileUpload'
                className='flex-grow border-2 border-gray-700 dark:border-gray-700 p-2 rounded-md cursor-pointer flex items-center justify-center'
              >
                {loading ? (
                  <ArrowPathIcon className='mr-2 h-6 w-6 text-gray-600 dark:text-gray-400 animate-spin' />
                ) : (
                  <CloudArrowUpIcon className='mr-2 h-6 w-6 text-gray-600 dark:text-gray-400' />
                )}
                {audioFile ? audioFile.name : 'Select an audio file'}
              </label>
              <div>
                <Button
                  onClick={handleClearFile}
                  className='ml-4 w-full mb-2 bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-6 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  disabled={loading}
                >
                  Clear File
                </Button>
                <Button
                  type='submit'
                  className='ml-4 w-full bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-6 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  disabled={!audioFile || loading}
                >
                  {loading ? (
                    <ArrowPathIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin' />
                  ) : (
                    'Transcribe'
                  )}
                </Button>
              </div>
            </div>
          </form>
          <AudioRecorder onRecord={handleRecord} />
          <p className='mt-4 text-lg dark:text-gray-300'>{text}</p>
        </>
      }
    />
  );
};

export default AudioForm;
