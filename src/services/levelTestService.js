import axios from 'axios'; // Import axios directly for this specific endpoint

/**
 * Submits the level test audio for evaluation.
 * @param {Blob} audioBlob The recorded audio data.
 * @returns {Promise<string>} The transcription result from the server.
 */
export const submitLevelTest = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audioFile', audioBlob, 'level-test.webm'); // Changed key to 'audioFile' and extension to '.webm'

  try {
    const response = await axios.post('http://3.34.91.248:8080/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios sets this automatically for FormData, but good to be explicit
      },
    });
    console.log('API response for level test:', response.data);
    return response.data; // Server returns a string like "변환에 성공하였습니다.\n[transcribed text]"
  } catch (error) {
    console.error('Error submitting level test:', error);
    throw error;
  }
};
