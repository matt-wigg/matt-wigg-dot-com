'use client';
import React, { useState } from 'react';
import {
  CloudArrowUpIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'; // Added DocumentTextIcon for file representation
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

    if (audioFile !== null) {
      // Check file size
      if (audioFile.size > 500000) {
        alert('File size exceeds the limit of 500KB.');
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-1');

      try {
        const response = await fetch('/api/whisper', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const result = await response.json();
        setText(result.text);
      } catch (error: any) {
        console.error('Error transcribing audio:', error);
        console.log(error);
      } finally {
        setLoading(false);
        setAudioFile(null); // Clear the staged file
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
      title='Matt-Whisper-ASR v0.9-alpha'
      content={
        <>
          <p className='pb-4'>
            <span className='pb-4'>
              You can upload or record audio files and transcribe them to text.
              Maximum file size is 500 KB.
            </span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='md:col-span-3'>
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
                  className={`
                    // Layout
                    flex 
                    items-center 
                    justify-center 
                    px-4 
                    py-2

                    // Colors
                    bg-white 
                    hover:text-yellow-400 
                    hover:bg-gray-100 
                    focus:ring-yellow-400 

                    // Border
                    border 
                    border-gray-700 
                    rounded-md 

                    // Interaction
                    focus:outline-none 
                    focus:ring-1 

                    // Dark mode
                    dark:bg-zinc-950 
                    dark:hover:bg-zinc-900 

                    ${
                      loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }
                  `}
                >
                  {loading ? (
                    <ArrowPathIcon className='h-5 w-5 mr-4 text-gray-600 dark:text-gray-400 animate-spin' />
                  ) : audioFile ? (
                    <DocumentTextIcon className='h-5 w-5 mr-4 text-gray-600 dark:text-gray-400' />
                  ) : (
                    <CloudArrowUpIcon className='h-5 w-5 mr-4 text-gray-600 dark:text-gray-400' />
                  )}
                  {audioFile ? audioFile.name : 'Select an audio file'}
                </label>
              </div>
              <div className='md:col-span-1'>
                <Button
                  onClick={handleClearFile}
                  className='w-full bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-6 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  disabled={loading}
                >
                  Clear File
                </Button>
              </div>
              <div className='md:col-span-2'>
                <Button
                  type='submit'
                  className='w-full bg-white dark:bg-zinc-950 rounded-md px-6 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  disabled={!audioFile || loading}
                >
                  <div className='flex items-center justify-center'>
                    {loading ? (
                      <ArrowPathIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin' />
                    ) : (
                      'Transcribe File'
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </form>
          <AudioRecorder onRecord={handleRecord} />
          <span className='block mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
            Transcription:
          </span>
          <p className='text-sm dark:text-gray-300'>{text}</p>
        </>
      }
    />
  );
};

export default AudioForm;
