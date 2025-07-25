# Snake Game

[中文](README.md) | **English**

This is a Snake game built with Gatsby and React TypeScript.

## Features

- 🐍 Classic Snake game mechanics
- 🎮 Keyboard and touch screen control support
- 📱 Responsive design with mobile device support
- 🏆 High score saving
- 🎨 Modern UI design
- ⚡ Smooth gameplay experience

## Game Controls

- **Arrow Keys** or **WASD** - Control snake movement direction
- **Spacebar** - Start/Pause/Resume game
- **R Key** - Restart game after game over
- **Touch Buttons** - Direction control on mobile devices

## Development and Running

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run develop
```

The game will run at `http://localhost:8000`.

### Build Production Version
```bash
npm run build
```

### Type Checking
```bash
npm run typecheck
```

## Tech Stack

- **Gatsby** - Static site generator
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Styling and animations

## Game Rules

1. Control the snake to move and collect food (red dots)
2. Each food eaten makes the snake longer and increases score by 10 points
3. Avoid hitting the boundaries or your own body
4. Challenge for higher scores!

## Project Structure

```
src/
├── components/
│   └── SnakeGame/
│       ├── SnakeGame.tsx      # Main game component
│       ├── GameBoard.tsx      # Game canvas
│       ├── GameControls.tsx   # Control buttons
│       ├── ScoreBoard.tsx     # Score display
│       ├── types.ts           # Type definitions
│       ├── constants.ts       # Game constants
│       ├── utils.ts           # Utility functions
│       └── index.ts           # Export file
├── pages/
│   └── index.tsx              # Main page
└── styles/
    └── game.css               # Game styles
```

## License

MIT License