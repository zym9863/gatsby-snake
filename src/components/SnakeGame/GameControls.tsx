import React from 'react';
import { Direction, GameStatus } from './types';
import { COLORS } from './constants';

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onReset: () => void;
  onDirectionChange: (direction: Direction) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  onStart,
  onReset,
  onDirectionChange
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: COLORS.BUTTON,
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    margin: '0 10px'
  };

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: COLORS.BUTTON_HOVER,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  };

  const directionButtonStyle: React.CSSProperties = {
    backgroundColor: COLORS.BUTTON,
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    margin: '4px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const getStartButtonText = () => {
    switch (gameStatus) {
      case GameStatus.WAITING:
        return '开始游戏';
      case GameStatus.PLAYING:
        return '暂停游戏';
      case GameStatus.PAUSED:
        return '继续游戏';
      case GameStatus.GAME_OVER:
        return '重新开始';
      default:
        return '开始游戏';
    }
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, buttonHoverStyle);
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, buttonStyle);
  };

  const handleDirectionButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = COLORS.BUTTON_HOVER;
    e.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleDirectionButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = COLORS.BUTTON;
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div className="game-controls" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px'
    }}>
      {/* 主控制按钮 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          className="control-button game-button"
          style={buttonStyle}
          onClick={onStart}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          {getStartButtonText()}
        </button>
        
        {gameStatus === GameStatus.GAME_OVER && (
          <button
            className="control-button game-button"
            style={buttonStyle}
            onClick={onReset}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            重置游戏
          </button>
        )}
      </div>

      {/* 移动端方向控制 */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>
          移动端控制
        </div>
        <div>
          <button
            className="direction-button"
            style={directionButtonStyle}
            onClick={() => onDirectionChange(Direction.UP)}
            onMouseEnter={handleDirectionButtonHover}
            onMouseLeave={handleDirectionButtonLeave}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ↑
          </button>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className="direction-button"
            style={directionButtonStyle}
            onClick={() => onDirectionChange(Direction.LEFT)}
            onMouseEnter={handleDirectionButtonHover}
            onMouseLeave={handleDirectionButtonLeave}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ←
          </button>
          <button
            className="direction-button"
            style={directionButtonStyle}
            onClick={() => onDirectionChange(Direction.DOWN)}
            onMouseEnter={handleDirectionButtonHover}
            onMouseLeave={handleDirectionButtonLeave}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ↓
          </button>
          <button
            className="direction-button"
            style={directionButtonStyle}
            onClick={() => onDirectionChange(Direction.RIGHT)}
            onMouseEnter={handleDirectionButtonHover}
            onMouseLeave={handleDirectionButtonLeave}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;