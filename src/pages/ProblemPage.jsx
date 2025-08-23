import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import AudioPlayer from '../components/specific/AudioPlayer';
import { checkAnswer } from '../services/learningService';
import audioSrc from '../assets/dummy2.m4a'; // Placeholder audio for the problem

const ProblemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };

  // This would likely come from a service based on stageId
  const problems = [
    { id: 1, script: "농장주인이 한 말을 다시 듣고 선택해 주세요!", choices: ["오늘 날씨 어때?", "오늘 한잔 어때?", "오늘 기분 어때?"], answer: "오늘 기분 어때?" },
    { id: 2, script: "두 번째 문제입니다.", choices: ["Choice A", "Choice B", "Choice C"], answer: "Choice B" },
  ];
  const totalProblems = problems.length;

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState({ correctAnswer: '', hint: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChoiceClick = async (choice) => {
    setIsLoading(true);
    try {
      const currentProblem = problems[currentProblemIndex];
      const result = await checkAnswer(stageId, currentProblem.id, choice);
      
      setIsCorrect(result.isCorrect);
      if (!result.isCorrect) {
        setFeedback({ correctAnswer: result.correctAnswer, hint: result.hint });
      }
      setShowResult(true);

    } catch (error) {
      console.error("Failed to check answer", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setFeedback({ correctAnswer: '', hint: '' });
    if (currentProblemIndex < totalProblems - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      alert('Congratulations! You have completed this stage.');
      navigate('/roadmap');
    }
  };

  const currentProblem = problems[currentProblemIndex];

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
    <div style={{width: '100%', height: '100%', position: 'relative', background: '#EAF7FF', overflow: 'hidden', padding: '20px', boxSizing: 'border-box'}}>
      <StatusBar />
      
      <div style={{position: 'absolute', top: '70px', left: '20px'}}>
        <AudioPlayer src={audioSrc} />
        <p style={{fontFamily: 'Pretendard', fontWeight: '600', color: '#333', margin: '10px 0 0 5px'}}>
          {currentProblemIndex + 1} / {totalProblems}
        </p>
      </div>

      <div style={{textAlign: 'center', marginTop: '200px'}}>
        {!showResult ? (
          <div>
            <h2 style={{fontFamily: 'Pretendard', color: '#333', minHeight: '100px'}}>{currentProblem.script}</h2>
            <div style={{ marginTop: '30px' }}>
              {currentProblem.choices.map((choice, index) => (
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
                <button onClick={handleNext} style={{...buttonStyle, background: '#53BBFD', color: 'white', marginTop: '20px'}}>Next Problem</button>
              </div>
            ) : (
              <div>
                <h2>Incorrect ❌</h2>
                <p>The correct answer is: <strong>"{feedback.correctAnswer}"</strong></p>
                <p>Hint: {feedback.hint}</p>
                <button onClick={handleNext} style={{...buttonStyle, background: '#53BBFD', color: 'white', marginTop: '20px'}}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>

      {isLoading && <Spinner />}
    </div>
  );
};

export default ProblemPage;
