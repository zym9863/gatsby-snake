import React, { useState, useEffect, useCallback } from 'react';
import { Position, Direction, GameStatus } from './types';
import { GAME_CONFIG } from './constants';
import { 
  generateRandomFood, 
  checkCollision, 
  moveSnake, 
  checkFoodCollision, 
  getOppositeDirection,
  getHighScore,
  setHighScore 
} from './utils';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import '../../styles/game.css';

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(GAME_CONFIG.INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(GAME_CONFIG.INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(Direction.UP);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.WAITING);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScoreState] = useState<number>(0);

  useEffect(() => {
    setHighScoreState(getHighScore());
  }, []);

  const resetGame = useCallback(() => {
    setSnake(GAME_CONFIG.INITIAL_SNAKE);
    setFood(generateRandomFood(GAME_CONFIG.INITIAL_SNAKE));
    setDirection(Direction.UP);
    setScore(0);
    setGameStatus(GameStatus.WAITING);
  }, []);

  const startGame = useCallback(() => {
    if (gameStatus === GameStatus.WAITING || gameStatus === GameStatus.GAME_OVER) {
      if (gameStatus === GameStatus.GAME_OVER) {
        resetGame();
        setTimeout(() => setGameStatus(GameStatus.PLAYING), 100);
      } else {
        setGameStatus(GameStatus.PLAYING);
      }
    } else if (gameStatus === GameStatus.PLAYING) {
      setGameStatus(GameStatus.PAUSED);
    } else if (gameStatus === GameStatus.PAUSED) {
      setGameStatus(GameStatus.PLAYING);
    }
  }, [gameStatus, resetGame]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameStatus !== GameStatus.PLAYING) return;
    
    if (newDirection !== getOppositeDirection(direction)) {
      setDirection(newDirection);
    }
  }, [direction, gameStatus]);

  const gameLoop = useCallback(() => {
    if (gameStatus !== GameStatus.PLAYING) return;

    setSnake(currentSnake => {
      const newSnake = moveSnake(currentSnake, direction);
      const head = newSnake[0];

      // 检查碰撞
      if (checkCollision(head, currentSnake)) {
        setGameStatus(GameStatus.GAME_OVER);
        if (score > highScore) {
          setHighScore(score);
          setHighScoreState(score);
        }
        return currentSnake;
      }

      // 检查是否吃到食物
      if (checkFoodCollision(head, food)) {
        setScore(prevScore => prevScore + 10);
        setFood(generateRandomFood(newSnake));
        return [...newSnake, currentSnake[currentSnake.length - 1]];
      }

      return newSnake;
    });
  }, [direction, food, gameStatus, score, highScore]);

  // 游戏循环
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      const gameInterval = setInterval(gameLoop, GAME_CONFIG.GAME_SPEED);
      return () => clearInterval(gameInterval);
    }
  }, [gameLoop, gameStatus]);

  // 键盘控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection(Direction.RIGHT);
          break;
        case ' ':
          e.preventDefault();
          startGame();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          if (gameStatus === GameStatus.GAME_OVER) {
            resetGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection, startGame, resetGame, gameStatus]);

  return (
    <div className="snake-game-container">
      <h1 className="snake-game-title">
        贪吃蛇游戏
      </h1>
      
      <ScoreBoard 
        score={score} 
        highScore={highScore} 
        gameStatus={gameStatus}
      />
      
      <GameBoard 
        snake={snake} 
        food={food} 
        gameStatus={gameStatus}
      />
      
      <GameControls 
        gameStatus={gameStatus}
        onStart={startGame}
        onReset={resetGame}
        onDirectionChange={changeDirection}
      />
      
      <div className="game-instructions">
        <p><strong>操作说明：</strong></p>
        <p>方向键/WASD - 控制方向</p>
        <p>空格键 - 开始/暂停游戏</p>
        <p>R键 - 游戏结束后重新开始</p>
      </div>
    </div>
  );
};

export default SnakeGame;