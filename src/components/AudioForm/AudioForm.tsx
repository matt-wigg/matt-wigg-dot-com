'use client';
import React, { useState } from 'react';
import {
  CloudArrowUpIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
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
      setText('');

      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', 'whisper-1');

      try {
        const response = await fetch('/api/openai/whisper', {
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

  const baseClasses =
    'flex items-center justify-center px-4 py-2 bg-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400 dark:bg-zinc-950';
  const enabledClasses =
    'hover:border-yellow-400 hover:bg-gray-100 dark:hover:bg-zinc-900';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <ContentCard
      show={show}
      title='Matt-Whisper-ASR v0.9-alpha'
      content={
        <>
          <p className='pb-4'>
            <span className='pb-4'>
              You can upload or record audio files and transcribe them to text.
              Maximum file size is 500KB. The audio recorder is not compatible
              with Safari.
            </span>
          </p>
          <span className='block mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
            Transcription:
          </span>
          <div
            className={`overflow-y-auto h-52 border mb-4 border-gray-700 rounded-lg p-4 bg-white dark:bg-zinc-950 ${
              !text ? 'dark:text-gray-600' : 'font-bold dark:text-yellow-400'
            }`}
          >
            {text
              ? text
              : loading
              ? 'Processing...'
              : 'Upload an audio file to transcribe it.'}
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                  className={`${baseClasses} ${
                    loading ? disabledClasses : enabledClasses
                  } 

                    ${
                      loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }
                  `}
                >
                  {audioFile ? (
                    <DocumentTextIcon className='h-5 w-5 mr-2 text-gray-600' />
                  ) : (
                    <CloudArrowUpIcon className='h-5 w-5 mr-2 text-yellow-400' />
                  )}
                  {audioFile ? audioFile.name : 'Select an audio file'}
                </label>
              </div>
              {audioFile && (
                <>
                  <div className='md:col-span-1'>
                    <Button
                      onClick={handleClearFile}
                      className='w-full flex items-center justify-center'
                      disabled={!audioFile || loading}
                    >
                      <XCircleIcon
                        className={`h-5 w-5 mr-2  ${
                          loading ? 'text-gray-600' : 'text-red-600'
                        }`}
                      />

                      {!audioFile ? 'No file selected' : 'Clear File'}
                    </Button>
                  </div>
                  <div className='md:col-span-2'>
                    <Button
                      type='submit'
                      className={`
    w-full 
    flex 
    items-center 
    justify-center 
  `}
                      disabled={!audioFile || loading}
                      title={!audioFile ? 'audio file required' : ''}
                    >
                      <div className='flex items-center justify-center'>
                        {loading ? (
                          <>
                            <ArrowPathIcon className='h-5 w-5 mr-2 text-gray-600 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin' />
                            Transcribing...
                          </>
                        ) : !audioFile ? (
                          'No file selected '
                        ) : (
                          <>
                            <CheckCircleIcon className='h-5 w-5 mr-2 text-green-600 group-hover:text-yellow-400 dark:group-hover:text-yellow-400' />
                            {'Transcribe File'}
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
          <AudioRecorder onRecord={handleRecord} />
        </>
      }
    />
  );
};

export default AudioForm;
