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
    { id: 2, script: "마을 사람이 한 말을 다시 듣고 선택해 주세요!", choices: ["어제 잠은 잘 잤어?", "밥은 먹었어?", "내일 시간 돼?"], answer: "밥은 먹었어?" },
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
          <div style={{
            fontFamily: 'Pretendard', 
            color: '#333',
            textAlign: 'left',
            padding: '0 20px',
            marginTop: '-150px' // -100px에서 -150px로 더 위로 올림
          }}>
            {isCorrect ? (
              <div>
                {/* 정답 표시 - 파란색 원 안에 흰색 O */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#53BBFD',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '10px auto', // 20px에서 10px로 줄임
                  marginBottom: '20px' // 30px에서 20px로 줄임
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '40px',
                    fontWeight: 'bold'
                  }}>
                    O
                  </span>
                </div>

                {/* 정답 텍스트 */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '15px', // 20px에서 15px로 줄임
                  color: '#333'
                }}>
                  정답 : {feedback.correctAnswer || currentProblem.answer}
                </h3>

                {/* 설명 텍스트 */}
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px', // 25px에서 20px로 줄임
                  color: '#666'
                }}>
                  {feedback.hint || "주어 you가 생략되어 명령으로 오해할 수 있지만, please를 붙이면 공손한 요청이 돼요."}
                </p>

                {/* 예시 제목 */}
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px', // 15px에서 12px로 줄임
                  color: '#333'
                }}>
                  &lt;예시&gt;
                </h4>

                {/* 예시 문장들 */}
                <div style={{ marginBottom: '12px' }}> {/* 15px에서 12px로 줄임 */}
                  <p style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                    Work a little faster.
                  </p>
                  <p style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}> {/* 15px에서 12px로 줄임 */}
                    = "좀 더 빨리 일해라."
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}> {/* 25px에서 20px로 줄임 */}
                  <p style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                    Work a little faster, please.
                  </p>
                  <p style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}> {/* 15px에서 12px로 줄임 */}
                    = "조금만 더 빨리 해주세요."
                  </p>
                </div>

                {/* 버튼들 */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px', // 15px에서 12px로 줄임
                  marginTop: '20px' // 30px에서 20px로 줄임
                }}>
                  <button 
                    onClick={handleNext} 
                    style={{
                      padding: '15px 30px',
                      fontSize: '18px',
                      fontFamily: 'Pretendard',
                      fontWeight: '600',
                      background: '#FF8C00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    다른 문제
                  </button>

                  <button 
                    onClick={() => navigate('/problem-intro')}
                    style={{
                      padding: '15px 30px',
                      fontSize: '18px',
                      fontFamily: 'Pretendard',
                      fontWeight: '600',
                      background: '#53BBFD',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    다음
                  </button>

                  <button 
                    onClick={() => navigate('/roadmap')} 
                    style={{
                      padding: '15px 30px',
                      fontSize: '18px',
                      fontFamily: 'Pretendard',
                      fontWeight: '600',
                      background: '#D7D7D7',
                      color: '#333',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    학습 종료
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* 오답 표시 - 빨간색 X */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  margin: '10px 0',
                  marginBottom: '20px',
                }}>
                  <span style={{
                    color: '#FF3939', // 빨간색으로 변경
                    fontSize: '70px',
                    fontWeight: 'bold'
                  }}>
                    X
                  </span>
                </div>

                {/* 정답 텍스트 */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '15px', // 20px에서 15px로 줄임
                  color: '#333'
                }}>
                  정답 : <span style={{ color: '#53BBFD' }}>{feedback.correctAnswer || currentProblem.answer}</span>
                </h3>

                {/* 설명 텍스트 */}
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px', // 25px에서 20px로 줄임
                  color: '#666'
                }}>
                  {feedback.hint || "주어 you가 생략되어 명령으로 오해할 수 있지만, please를 붙이면 공손한 요청이 돼요."}
                </p>

                {/* 예시 제목 */}
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px', // 15px에서 12px로 줄임
                  color: '#333'
                }}>
                  &lt;예시&gt;
                </h4>

                {/* 예시 문장들 */}
                <div style={{ marginBottom: '12px' }}> {/* 15px에서 12px로 줄임 */}
                  <p style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                    Work a little faster.
                  </p>
                  <p style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}> {/* 15px에서 12px로 줄임 */}
                    = "좀 더 빨리 일해라."
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}> {/* 25px에서 20px로 줄임 */}
                  <p style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                    Work a little faster, please.
                  </p>
                  <p style={{ fontSize: '16px', marginBottom: '12px', color: '#666' }}> {/* 15px에서 12px로 줄임 */}
                    = "조금만 더 빨리 해주세요."
                  </p>
                </div>

                {/* 버튼들 */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px', 
                  marginTop: '20px' 
                }}>
                  <button 
                    onClick={handleNext} 
                    style={{
                      padding: '15px 30px',
                      fontSize: '18px',
                      fontFamily: 'Pretendard',
                      fontWeight: '600',
                      background: '#FF8C00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    다른 문제
                  </button>

                  <button 
                    onClick={() => navigate('/problem-success')} 
                    style={{
                      padding: '15px 30px',
                      fontSize: '18px',
                      fontFamily: 'Pretendard',
                      fontWeight: '600',
                      background: '#D7D7D7',
                      color: '#333',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    학습 종료
                  </button>
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

export default ProblemPage;