import apiClient from './api';

/**
 * Submits the user's answer for a learning question.
 * @param {number} stageId The ID of the current stage.
 * @param {number} questionId The ID of the current question.
 * @param {string} answer The user's selected answer.
 * @returns {Promise<{isCorrect: boolean, correctAnswer: string, hint: string}>} The result of the answer check.
 */
export const checkAnswer = async (stageId, questionId, answer) => {
  try {
    // The actual API call would look something like this:
    // const response = await apiClient.post('/learning/check-answer', {
    //   stageId,
    //   questionId,
    //   answer,
    // });
    // return response.data;

    // For now, we return a mock response after a delay.
    console.log('Submitting answer to mock API...', { stageId, questionId, answer });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This mock logic should be replaced by the backend response.
    const isCorrect = answer === 'Good morning' || answer === 'Check, please';
    const mockResponse = {
      isCorrect,
      correctAnswer: isCorrect ? answer : (questionId === 1 ? 'Good morning' : 'Check, please'),
      hint: isCorrect ? '' : 'This is a common phrase.',
    };
    console.log('Mock API response for answer check:', mockResponse);
    return mockResponse;

  } catch (error) {
    console.error('Error checking answer:', error);
    throw error;
  }
};
