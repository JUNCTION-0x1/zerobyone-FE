import apiClient from './api';

/**
 * Submits the level test audio for evaluation.
 * @param {Blob} audioBlob The recorded audio data.
 * @returns {Promise<{level: string, levelName: string}>} The level test result.
 */
export const submitLevelTest = async (audioBlob) => {
  // When integrating with a real backend, you'll likely send the audio
  // as FormData.
  const formData = new FormData();
  formData.append('audio', audioBlob, 'level-test.wav');

  try {
    // The actual API call would look something like this:
    // const response = await apiClient.post('/level-test', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    // return response.data;

    // For now, we return a mock response after a delay.
    console.log('Submitting level test to mock API...', formData.get('audio'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockResponse = { level: '인턴', levelName: 'A2' };
    console.log('Mock API response for level test:', mockResponse);
    return mockResponse;

  } catch (error) {
    console.error('Error submitting level test:', error);
    // You might want to throw a custom error or handle it here
    throw error;
  }
};
