import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import AudioPlayer from '../components/specific/AudioPlayer';
import { checkAnswer } from '../services/learningService';
import audioSrc from '../assets/dummy2.m4a';

const ProblemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };

  const problems = [
    { id: 1, script: "농장주인이 한 말을 다시 듣고 선택해 주세요!", choices: ["오늘 날씨 어때?", "오늘 기분 어때?", "오늘 한 잔 어때?"], answer: "오늘 기분 어때?" },
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
      console.error('Failed to check answer', error);
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
      // 모든 문제를 완료했을 때 ProblemSuccess 페이지로 이동
      navigate('/problem-success', {
        state: {
          stageId,
          stageName: 'Picker',
          stageLevel: 10
        }
      });
    }
  };

  const currentProblem = problems[currentProblemIndex];

  const buttonStyle = {
    display: 'block',
    width: '90%', // 너비를 90%로 줄여서 양쪽 여백 추가
    margin: '8px auto', // 상하 여백 줄이고 가운데 정렬
    padding: '15px 20px', // 상하 패딩 줄이고 좌우 패딩 유지
    fontSize: '18px',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: '#A6A6A6',
    background: '#D7D7D7', // 더 진한 회색으로 변경
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: '#F5F5F5',
      overflow: 'hidden', 
      padding: '20px', 
      boxSizing: 'border-box'
    }}>
      <StatusBar />
      
      {/* 뒤로가기 버튼 */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '20px',
        cursor: 'pointer'
      }}>
        <div style={{ fontSize: '24px', color: '#333' }}>‹</div>
      </div>
      
      {/* 오디오 플레이어와 진행률 */}
      {!showResult && ( // 정답/오답 표시할 때는 숨김
        <div style={{
          position: 'absolute', 
          top: '190px', 
          left: '30px'
        }}>
          <AudioPlayer src={audioSrc} />
          <p style={{
            fontFamily: 'Pretendard', 
            fontWeight: '600', 
            margin: '8px 10px 0 5px',
            fontSize: '25px'
          }}>
            <span style={{ color: '#FF8C00' }}>10</span>
            <span style={{ color: '#333' }}>/10</span>
            {/*{currentProblemIndex + 1} / {totalProblems}*/}
          </p>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div style={{
        textAlign: 'left', // center에서 left로 변경
        marginTop: '300px',
        padding: '0 20px'
      }}>
        {!showResult ? (
          <div>
            <h2 style={{
              fontFamily: 'Pretendard', 
              color: '#333', 
              minHeight: '100px',
              fontSize: '20px',
              lineHeight: '1.5',
              marginBottom: '30px',
              textAlign: 'left' // h2도 왼쪽 정렬
            }}>
              {currentProblem.script}
            </h2>
            <div style={{ 
              marginTop: '30px',
              position: 'absolute', 
              bottom: '200px', 
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%'
            }}>
              {currentProblem.choices.map((choice, index) => (
                <button key={index} onClick={() => handleChoiceClick(choice)} disabled={isLoading} style={buttonStyle}>
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: 'Pretendard', color: '#333' }}>
            {isCorrect ? (
              <div>
                <h2>Correct! ✅</h2>
                <button
                  onClick={handleNext}
                  style={{ ...buttonStyle, background: '#53BBFD', color: 'white', marginTop: '20px' }}
                >
                  Next Problem
                </button>
              </div>
            ) : (
              <div>
                <h2>Incorrect ❌</h2>
                <p>
                  The correct answer is: <strong>"{feedback.correctAnswer}"</strong>
                </p>
                <p>Hint: {feedback.hint}</p>
                <button
                  onClick={handleNext}
                  style={{ ...buttonStyle, background: '#53BBFD', color: 'white', marginTop: '20px' }}
                >
                  Next
                </button>
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
