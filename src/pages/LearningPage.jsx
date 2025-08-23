import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import { checkAnswer } from '../services/learningService'; // Import the service

const LearningPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };

  const questions = [
    { id: 1, question: "How do you greet someone in the morning?", choices: ["Good evening", "Good morning", "Good afternoon"], answer: "Good morning" },
    { id: 2, question: "What do you say to ask for the bill?", choices: ["Check, please", "Where is the bathroom?", "I need a menu"], answer: "Check, please" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState({ correctAnswer: '', hint: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChoiceClick = async (choice) => {
    setIsLoading(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const result = await checkAnswer(stageId, currentQuestion.id, choice);
      
      setIsCorrect(result.isCorrect);
      if (!result.isCorrect) {
        setFeedback({ correctAnswer: result.correctAnswer, hint: result.hint });
      }
      setShowResult(true);

    } catch (error) {
      console.error("Failed to check answer", error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setFeedback({ correctAnswer: '', hint: '' });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Congratulations! You have completed this stage.');
      navigate('/roadmap');
    }
  };

  const handleEndLearning = () => {
    navigate('/roadmap');
  };

  const currentQuestion = questions[currentQuestionIndex];

  const buttonStyle = {
    display: 'block',
    width: '100%',
    margin: '10px 0',
    padding: '20px',
    fontSize: '18px',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: '#333',
    background: 'white',
    border: '2px solid #A0D8FF',
    borderRadius: '15px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: '#EAF7FF', overflow: 'hidden', padding: '20px', boxSizing: 'border-box', textAlign: 'center'}}>
      <StatusBar />
      <h1 style={{marginTop: '80px', fontFamily: 'Pretendard', color: '#333'}}>Learning Stage {stageId}</h1>
      
      <div style={{ marginTop: '40px' }}>
        {!showResult ? (
          <div>
            <h2 style={{fontFamily: 'Pretendard', color: '#333', minHeight: '100px'}}>{currentQuestion.question}</h2>
            <div style={{ marginTop: '30px' }}>
              {currentQuestion.choices.map((choice, index) => (
                <button 
                  key={index} 
                  onClick={() => handleChoiceClick(choice)} 
                  disabled={isLoading}
                  style={buttonStyle}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{fontFamily: 'Pretendard', color: '#333'}}>
            {isCorrect ? (
              <div>
                <h2>Correct! ✅</h2>
                <button onClick={handleNext} style={{...buttonStyle, background: '#53BBFD', color: 'white', marginTop: '20px'}}>Next Question</button>
              </div>
            ) : (
              <div>
                <h2>Incorrect ❌</h2>
                <p>The correct answer is: <strong>"{feedback.correctAnswer}"</strong></p>
                <p>Hint: {feedback.hint}</p>
                <div style={{ marginTop: '20px' }}>
                  <button onClick={handleNext} style={{...buttonStyle, background: '#53BBFD', color: 'white', margin: '5px', display: 'inline-block', width: 'auto'}}>Next</button>
                  <button onClick={handleEndLearning} style={{...buttonStyle, background: '#f0f0f0', margin: '5px', display: 'inline-block', width: 'auto'}}>End Learning</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isLoading && <Spinner />}
    </div>
  );
};

export default LearningPage;
