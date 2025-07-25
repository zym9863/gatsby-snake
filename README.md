# 贪吃蛇游戏

这是一个使用Gatsby和React TypeScript构建的贪吃蛇游戏。

## 功能特性

- 🐍 经典贪吃蛇游戏玩法
- 🎮 键盘和触摸屏控制支持
- 📱 响应式设计，支持移动设备
- 🏆 最高分记录保存
- 🎨 现代化UI设计
- ⚡ 流畅的游戏体验

## 游戏控制

- **方向键** 或 **WASD** - 控制蛇的移动方向
- **空格键** - 开始/暂停/继续游戏
- **R键** - 游戏结束后重新开始
- **触摸按钮** - 移动设备上的方向控制

## 开发和运行

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run develop
```

游戏将在 `http://localhost:8000` 上运行。

### 构建生产版本
```bash
npm run build
```

### 类型检查
```bash
npm run typecheck
```

## 技术栈

- **Gatsby** - 静态站点生成器
- **React** - UI框架
- **TypeScript** - 类型安全的JavaScript
- **CSS3** - 样式和动画

## 游戏规则

1. 控制蛇移动收集食物（红色圆点）
2. 每吃到一个食物，蛇会变长，分数增加10分
3. 避免撞到边界或自己的身体
4. 挑战更高分数！

## 项目结构

```
src/
├── components/
│   └── SnakeGame/
│       ├── SnakeGame.tsx      # 主游戏组件
│       ├── GameBoard.tsx      # 游戏画布
│       ├── GameControls.tsx   # 控制按钮
│       ├── ScoreBoard.tsx     # 分数显示
│       ├── types.ts           # 类型定义
│       ├── constants.ts       # 游戏常量
│       ├── utils.ts           # 工具函数
│       └── index.ts           # 导出文件
├── pages/
│   └── index.tsx              # 主页面
└── styles/
    └── game.css               # 游戏样式
```

## 许可证

MIT License
