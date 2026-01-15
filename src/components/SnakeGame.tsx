import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SnakeGame.module.css';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const CELL_SIZE = 16;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const BASE_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SnakeGame({ isOpen, onClose }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('humancorp-snake-highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameover'>('playing');

  const directionRef = useRef<Direction>('RIGHT');
  const nextDirectionRef = useRef<Direction>('RIGHT');
  const snakeRef = useRef<Position[]>([]);
  const fruitRef = useRef<Position>({ x: 0, y: 0 });
  const scoreRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const lastMoveTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const placeTarget = useCallback(() => {
    const snake = snakeRef.current;
    let fruitPos: Position;
    let attempts = 0;
    do {
      fruitPos = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
      attempts++;
    } while (snake.some(s => s.x === fruitPos.x && s.y === fruitPos.y) && attempts < 1000);
    fruitRef.current = fruitPos;
  }, []);

  const reset = useCallback(() => {
    const startX = Math.floor(GRID_WIDTH / 2);
    const startY = Math.floor(GRID_HEIGHT / 2);

    snakeRef.current = [];
    for (let i = 0; i < 5; i++) {
      snakeRef.current.push({ x: startX - 4 + i, y: startY });
    }

    directionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    scoreRef.current = 0;
    speedRef.current = BASE_SPEED;
    setScore(0);
    setGameState('playing');
    placeTarget();
    lastMoveTimeRef.current = performance.now();
  }, [placeTarget]);

  // Initialize game
  useEffect(() => {
    if (isOpen) {
      reset();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, reset]);

  // Handle keyboard
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (gameState === 'gameover') {
        if (e.key === ' ' || e.key === 'Enter') {
          reset();
        }
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
        return;
      }

      if (gameState !== 'playing') return;

      const currentDir = directionRef.current;
      if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentDir !== 'RIGHT') {
        e.preventDefault();
        nextDirectionRef.current = 'LEFT';
      }
      if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentDir !== 'LEFT') {
        e.preventDefault();
        nextDirectionRef.current = 'RIGHT';
      }
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && currentDir !== 'DOWN') {
        e.preventDefault();
        nextDirectionRef.current = 'UP';
      }
      if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && currentDir !== 'UP') {
        e.preventDefault();
        nextDirectionRef.current = 'DOWN';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gameState, onClose, reset]);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const moveSnake = () => {
      directionRef.current = nextDirectionRef.current;
      const snake = snakeRef.current;
      const dir = directionRef.current;
      const head = snake[snake.length - 1];

      const newHead: Position = { x: head.x, y: head.y };
      if (dir === 'LEFT') newHead.x -= 1;
      if (dir === 'RIGHT') newHead.x += 1;
      if (dir === 'UP') newHead.y -= 1;
      if (dir === 'DOWN') newHead.y += 1;

      // Wall collision
      if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
        gameOver();
        return;
      }

      // Self collision
      for (const seg of snake) {
        if (seg.x === newHead.x && seg.y === newHead.y) {
          gameOver();
          return;
        }
      }

      snake.push(newHead);

      // Eat fruit
      if (newHead.x === fruitRef.current.x && newHead.y === fruitRef.current.y) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        speedRef.current = Math.max(MIN_SPEED, BASE_SPEED - Math.floor(scoreRef.current / 50) * SPEED_INCREMENT);
        placeTarget();
      } else {
        snake.shift();
      }
    };

    const gameOver = () => {
      setGameState('gameover');
      if (scoreRef.current > highScore) {
        setHighScore(scoreRef.current);
        localStorage.setItem('humancorp-snake-highscore', scoreRef.current.toString());
      }
    };

    const draw = () => {
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ff7f';
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#000';
      const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border-subtle').trim() || '#333';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= GRID_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
        ctx.stroke();
      }
      for (let y = 0; y <= GRID_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(GRID_WIDTH * CELL_SIZE, y * CELL_SIZE);
        ctx.stroke();
      }

      // Draw fruit
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(
        fruitRef.current.x * CELL_SIZE + 2,
        fruitRef.current.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );

      // Draw snake
      const snake = snakeRef.current;
      snake.forEach((segment, i) => {
        const isHead = i === snake.length - 1;
        ctx.fillStyle = isHead ? '#fff' : accentColor;
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      });
    };

    const loop = (time: number) => {
      if (gameState !== 'playing') return;

      if (time - lastMoveTimeRef.current > speedRef.current) {
        moveSnake();
        lastMoveTimeRef.current = time;
      }

      draw();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, gameState, highScore, placeTarget]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>SNAKE</div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>SCORE</span>
            <span className={styles.statValue}>{score.toString().padStart(6, '0')}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>HIGH</span>
            <span className={styles.statValue}>{highScore.toString().padStart(6, '0')}</span>
          </div>
        </div>

        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            width={GRID_WIDTH * CELL_SIZE}
            height={GRID_HEIGHT * CELL_SIZE}
            className={styles.canvas}
          />

          {gameState === 'paused' && (
            <div className={styles.pauseOverlay}>
              <div className={styles.pauseText}>PAUSED</div>
              <div className={styles.pauseHint}>Press SPACE to resume</div>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className={styles.gameoverOverlay}>
              <div className={styles.gameoverText}>GAME OVER</div>
              <div className={styles.gameoverScore}>Score: {score}</div>
              {score === highScore && score > 0 && (
                <div className={styles.newHighScore}>NEW HIGH SCORE!</div>
              )}
              <div className={styles.gameoverHint}>Press SPACE to play again</div>
            </div>
          )}
        </div>

        <div className={styles.hint}>
          WASD or Arrow keys · SPACE to pause · ESC to close
        </div>
      </div>
    </div>
  );
}
