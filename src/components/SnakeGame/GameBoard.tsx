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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '7px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 10
  };

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let backgroundColor = COLORS.BOARD;
    let borderRadius = '2px';
    let content = '';

    if (isSnakeHead) {
      backgroundColor = COLORS.SNAKE_HEAD;
      borderRadius = '50%';
    } else if (isSnakeBody) {
      backgroundColor = COLORS.SNAKE;
      borderRadius = '4px';
    } else if (isFood) {
      backgroundColor = COLORS.FOOD;
      borderRadius = '50%';
      content = '🍎';
    }

    const cellStyle: React.CSSProperties = {
      width: `${GAME_CONFIG.GRID_SIZE}px`,
      height: `${GAME_CONFIG.GRID_SIZE}px`,
      backgroundColor,
      borderRadius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      transition: 'all 0.1s ease'
    };

    return (
      <div
        key={`${x}-${y}`}
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
          <div style={{ textAlign: 'center' }}>
            <div>点击开始游戏</div>
            <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.8 }}>
              或按空格键开始
            </div>
          </div>
        );
      case GameStatus.PAUSED:
        return (
          <div style={{ textAlign: 'center' }}>
            <div>游戏暂停</div>
            <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.8 }}>
              按空格键继续
            </div>
          </div>
        );
      case GameStatus.GAME_OVER:
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ff6b6b' }}>游戏结束</div>
            <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.8 }}>
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