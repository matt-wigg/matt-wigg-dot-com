import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';

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
      {!recording && !isLoading && (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      {recording && <Button onClick={stopRecording}>Stop Recording</Button>}
      {isLoading ? (
        <Button>Decoding Recording</Button>
      ) : (
        audioBlob &&
        !recording && (
          <>
            <span
              style={{
                display: recording ? 'none' : 'block',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              }}
            ></span>
            <audio ref={audioRef} controls />
            <span style={{ padding: '0.5rem' }}>
              <Button onClick={handleSubmit} color='success'>
                Upload
              </Button>
            </span>
          </>
        )
      )}
    </div>
  );
};

export default AudioRecorder;
