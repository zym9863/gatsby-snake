import React from 'react';
import { Position, GameStatus } from './types';
import { GAME_CONFIG, COLORS } from './constants';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameStatus: GameStatus;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gameStatus }) => {
  const boardStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${GAME_CONFIG.BOARD_SIZE}, ${GAME_CONFIG.GRID_SIZE}px)`,
    gridTemplateRows: `repeat(${GAME_CONFIG.BOARD_SIZE}, ${GAME_CONFIG.GRID_SIZE}px)`,
    gap: '1px',
    backgroundColor: COLORS.BORDER,
    border: `3px solid ${COLORS.BORDER}`,
    borderRadius: '10px',
    position: 'relative',
    margin: '20px 0'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 58, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 10,
    animation: 'overlayFadeIn 0.3s ease-out'
  };

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let backgroundColor = COLORS.BOARD;
    let borderRadius = '2px';
    let content = '';
    let boxShadow = 'none';
    let className = 'game-cell';

    if (isSnakeHead) {
      backgroundColor = COLORS.SNAKE_HEAD;
      borderRadius = '50%';
      boxShadow = `0 0 20px ${COLORS.SNAKE_HEAD}, 0 0 40px ${COLORS.SNAKE_HEAD}, 0 0 60px ${COLORS.SNAKE_HEAD}`;
      className = 'snake-head-glow game-cell';
    } else if (isSnakeBody) {
      backgroundColor = COLORS.SNAKE;
      borderRadius = '6px';
      boxShadow = `0 0 10px ${COLORS.SNAKE}`;
      className = 'snake-segment game-cell';
    } else if (isFood) {
      backgroundColor = COLORS.FOOD;
      borderRadius = '50%';
      content = '🍎';
      boxShadow = `0 0 25px ${COLORS.FOOD}, 0 0 50px ${COLORS.FOOD}`;
      className = 'food-pulse game-cell';
    }

    const cellStyle: React.CSSProperties = {
      width: `${GAME_CONFIG.GRID_SIZE}px`,
      height: `${GAME_CONFIG.GRID_SIZE}px`,
      backgroundColor,
      borderRadius,
      boxShadow,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      transition: 'all 0.15s ease'
    };

    return (
      <div
        key={`${x}-${y}`}
        className={className}
        style={cellStyle}
      >
        {content}
      </div>
    );
  };

  const cells = [];
  for (let y = 0; y < GAME_CONFIG.BOARD_SIZE; y++) {
    for (let x = 0; x < GAME_CONFIG.BOARD_SIZE; x++) {
      cells.push(renderCell(x, y));
    }
  }

  const getOverlayContent = () => {
    switch (gameStatus) {
      case GameStatus.WAITING:
        return (
          <div className="overlay-content" style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              marginBottom: '15px',
              background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎮 点击开始游戏
            </div>
            <div style={{ 
              fontSize: '16px', 
              opacity: 0.8,
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              或按空格键开始
            </div>
          </div>
        );
      case GameStatus.PAUSED:
        return (
          <div className="overlay-content" style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              marginBottom: '15px',
              color: '#FF9800'
            }}>
              ⏸️ 游戏暂停
            </div>
            <div style={{ 
              fontSize: '16px', 
              opacity: 0.8,
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              按空格键继续
            </div>
          </div>
        );
      case GameStatus.GAME_OVER:
        return (
          <div className="overlay-content game-over-content" style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '15px',
              color: '#ff6b6b',
              textShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
            }}>
              💀 游戏结束
            </div>
            <div style={{ 
              fontSize: '16px', 
              opacity: 0.8,
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              按空格键或点击重新开始
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="game-board" style={boardStyle}>
      {cells}
      {gameStatus !== GameStatus.PLAYING && (
        <div className={`game-overlay ${gameStatus === GameStatus.GAME_OVER ? 'game-over-overlay' : ''}`} style={overlayStyle}>
          {getOverlayContent()}
        </div>
      )}
    </div>
  );
};

export default GameBoard;