import React from 'react';
import { GameStatus } from './types';
import { COLORS } from './constants';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  gameStatus: GameStatus;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, gameStatus }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.BOARD,
    border: `2px solid ${COLORS.BORDER}`,
    borderRadius: '10px',
    padding: '15px 25px',
    marginBottom: '20px',
    minWidth: '400px',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  };

  const scoreItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  };

  const scoreLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#888',
    marginBottom: '5px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const scoreValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: COLORS.TEXT
  };

  const highScoreValueStyle: React.CSSProperties = {
    ...scoreValueStyle,
    color: '#ffd700'
  };

  const statusStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  };

  const statusLabelStyle: React.CSSProperties = {
    ...scoreLabelStyle,
    color: '#888'
  };

  const statusValueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const getStatusDisplay = () => {
    switch (gameStatus) {
      case GameStatus.WAITING:
        return {
          text: '待开始',
          color: '#888',
          backgroundColor: 'rgba(136, 136, 136, 0.2)'
        };
      case GameStatus.PLAYING:
        return {
          text: '游戏中',
          color: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)'
        };
      case GameStatus.PAUSED:
        return {
          text: '已暂停',
          color: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.2)'
        };
      case GameStatus.GAME_OVER:
        return {
          text: '游戏结束',
          color: '#f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.2)'
        };
      default:
        return {
          text: '未知',
          color: '#888',
          backgroundColor: 'rgba(136, 136, 136, 0.2)'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="score-board" style={containerStyle}>
      {/* 当前分数 */}
      <div className="score-item" style={scoreItemStyle}>
        <div className="score-label" style={scoreLabelStyle}>当前分数</div>
        <div className="score-value" style={scoreValueStyle}>{score}</div>
      </div>

      {/* 游戏状态 */}
      <div style={statusStyle}>
        <div className="score-label" style={statusLabelStyle}>状态</div>
        <div style={{
          ...statusValueStyle,
          color: statusDisplay.color,
          backgroundColor: statusDisplay.backgroundColor
        }}>
          {statusDisplay.text}
        </div>
      </div>

      {/* 最高分数 */}
      <div className="score-item" style={scoreItemStyle}>
        <div className="score-label" style={scoreLabelStyle}>最高分数</div>
        <div className="score-value" style={highScoreValueStyle}>
          {highScore}
          {score > 0 && score === highScore && gameStatus === GameStatus.GAME_OVER && (
            <span className="new-record" style={{
              fontSize: '12px',
              color: '#ffd700',
              marginLeft: '8px'
            }}>
              ✨ 新纪录!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;