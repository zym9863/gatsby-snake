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
    background: 'linear-gradient(135deg, rgba(26, 26, 58, 0.9) 0%, rgba(45, 27, 105, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(79, 172, 254, 0.2)',
    borderRadius: '20px',
    padding: '20px 30px',
    marginBottom: '25px',
    minWidth: '450px',
    maxWidth: '550px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(79, 172, 254, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const scoreItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative'
  };

  const scoreLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '8px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const scoreValueStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: COLORS.TEXT,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const highScoreValueStyle: React.CSSProperties = {
    ...scoreValueStyle,
    background: 'linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
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
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '6px 16px',
    borderRadius: '25px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(5px)'
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
    <div className="score-board glass-card" style={containerStyle}>
      {/* 装饰性背景 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        left: '-20%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(255, 51, 102, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      {/* 当前分数 */}
      <div className="score-item" style={scoreItemStyle}>
        <div className="score-label" style={scoreLabelStyle}>当前分数</div>
        <div className="score-value score-counter" style={scoreValueStyle}>{score}</div>
      </div>

      {/* 游戏状态 */}
      <div style={statusStyle}>
        <div className="score-label" style={statusLabelStyle}>状态</div>
        <div className="status-indicator" style={{
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
            <span className="new-record celebration" style={{
              fontSize: '12px',
              color: '#ffd700',
              marginLeft: '8px',
              display: 'inline-block'
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