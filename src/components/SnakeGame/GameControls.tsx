import React from 'react';
import { Direction, GameStatus } from './types';

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

  return (
    <div className="game-controls" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px'
    }}>
      {/* 主控制按钮 */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          className="control-button game-button"
          onClick={onStart}
        >
          {getStartButtonText()}
        </button>
        
        {gameStatus === GameStatus.GAME_OVER && (
          <button
            className="control-button game-button"
            onClick={onReset}
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
        gap: '8px'
      }}>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>
          移动端控制
        </div>
        <div>
          <button
            className="direction-button"
            style={{ width: '50px', height: '50px', margin: '2px' }}
            onClick={() => onDirectionChange(Direction.UP)}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ↑
          </button>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className="direction-button"
            style={{ width: '50px', height: '50px', margin: '2px' }}
            onClick={() => onDirectionChange(Direction.LEFT)}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ←
          </button>
          <button
            className="direction-button"
            style={{ width: '50px', height: '50px', margin: '2px' }}
            onClick={() => onDirectionChange(Direction.DOWN)}
            disabled={gameStatus !== GameStatus.PLAYING}
          >
            ↓
          </button>
          <button
            className="direction-button"
            style={{ width: '50px', height: '50px', margin: '2px' }}
            onClick={() => onDirectionChange(Direction.RIGHT)}
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