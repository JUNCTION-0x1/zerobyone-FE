import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChoiceClick = async (choice) => {
    setIsLoading(true);
    // Simulate API call to check answer
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isAnswerCorrect = choice === questions[currentQuestionIndex].answer;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    setIsLoading(false);
  };

  const handleNext = () => {
    setShowResult(false);
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

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden', padding: '20px', boxSizing: 'border-box', textAlign: 'center'}}>
      <h1 style={{marginTop: '60px'}}>Learning Stage {stageId}</h1>
      
      <div style={{ marginTop: '40px' }}>
        {!showResult ? (
          <div>
            <h2>{currentQuestion.question}</h2>
            <div style={{ marginTop: '30px' }}>
              {currentQuestion.choices.map((choice, index) => (
                <button 
                  key={index} 
                  onClick={() => handleChoiceClick(choice)} 
                  disabled={isLoading}
                  style={{ display: 'block', width: '100%', margin: '10px 0', padding: '15px', fontSize: '18px' }}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {isCorrect ? (
              <div>
                <h2>Correct!</h2>
                <button onClick={handleNext} style={{ marginTop: '20px', padding: '15px' }}>Next Question</button>
              </div>
            ) : (
              <div>
                <h2>Incorrect</h2>
                <p>The correct answer is: <strong>"{currentQuestion.answer}"</strong></p>
                <p>Hint: This is a common morning greeting.</p>
                <div style={{ marginTop: '20px' }}>
                  <button onClick={handleNext} style={{ margin: '5px', padding: '15px' }}>Next</button>
                  <button onClick={handleEndLearning} style={{ margin: '5px', padding: '15px' }}>End Learning</button>
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
