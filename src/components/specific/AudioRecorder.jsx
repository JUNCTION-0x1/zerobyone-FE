import React, { useState, useRef } from 'react';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setError('');
    setTranscription('');
    setAudioURL('');
    setAudioBlob(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('마이크 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleUploadAndTranscribe = async () => {
    if (!audioBlob) {
      setError('녹음된 오디오 파일이 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    setIsLoading(true);
    setError('');
    setTranscription('');

    try {
      const response = await fetch('http://localhost:3001/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '알 수 없는 서버 오류가 발생했습니다.' }));
        throw new Error(errorData.message || `서버 오류: ${response.statusText}`);
      }

      const result = await response.json();
      setTranscription(result.transcription);
    } catch (err) {
      console.error('Error uploading/transcribing audio:', err);
      setError(err.message || '오디오 변환 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>오디오 녹음 및 텍스트 변환</h2>
      <div>
        {!isRecording ? (
          <button onClick={startRecording} disabled={isLoading}>
            녹음 시작
          </button>
        ) : (
          <button onClick={stopRecording} disabled={isLoading}>
            녹음 중지
          </button>
        )}
      </div>
      {audioURL && (
        <div style={{ marginTop: '20px' }}>
          <h3>녹음된 오디오:</h3>
          <audio src={audioURL} controls />
          <button onClick={handleUploadAndTranscribe} disabled={isLoading} style={{ marginLeft: '10px' }}>
            {isLoading ? '변환 중...' : '텍스트로 변환하기'}
          </button>
        </div>
      )}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>오류: {error}</p>}
      {transcription && (
        <div style={{ marginTop: '20px' }}>
          <h3>변환된 텍스트:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
