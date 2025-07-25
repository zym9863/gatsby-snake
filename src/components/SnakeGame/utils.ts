import { Position, Direction } from './types';
import { GAME_CONFIG } from './constants';

export const generateRandomFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE),
      y: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE)
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  return newFood;
};

export const checkCollision = (head: Position, snake: Position[]): boolean => {
  // 检查边界碰撞
  if (head.x < 0 || head.x >= GAME_CONFIG.BOARD_SIZE || 
      head.y < 0 || head.y >= GAME_CONFIG.BOARD_SIZE) {
    return true;
  }
  
  // 检查自身碰撞
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
};

export const getHighScore = (): number => {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
  }
  return 0;
};

export const setHighScore = (score: number): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('snakeHighScore', score.toString());
  }
};