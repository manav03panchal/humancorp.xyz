import { useEffect, useRef } from 'react';
import styles from './CanvasSnake.module.css';

interface CanvasSnakeProps {
  color: string;
}

export function CanvasSnake({ color }: CanvasSnakeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    let snake: { x: number; y: number }[] = [];
    let direction = { x: 1, y: 0 };
    let food: { x: number; y: number } | null = null;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initSnake() {
      if (!canvas) return;
      const startX = Math.floor(canvas.width / gridSize / 4);
      const startY = Math.floor(canvas.height / gridSize / 2);
      snake = [];
      for (let i = 0; i < 8; i++) {
        snake.push({ x: startX - i, y: startY });
      }
      direction = { x: 1, y: 0 };
      spawnFood();
    }

    function spawnFood() {
      if (!canvas) return;
      food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize)),
      };
    }

    function changeDirection() {
      const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];
      const valid = dirs.filter(
        (d) => !(d.x === -direction.x && d.y === -direction.y)
      );
      direction = valid[Math.floor(Math.random() * valid.length)];
    }

    function update() {
      if (!canvas) return;

      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      const maxX = Math.floor(canvas.width / gridSize);
      const maxY = Math.floor(canvas.height / gridSize);
      if (head.x < 0) head.x = maxX - 1;
      if (head.x >= maxX) head.x = 0;
      if (head.y < 0) head.y = maxY - 1;
      if (head.y >= maxY) head.y = 0;

      snake.unshift(head);

      if (food && head.x === food.x && head.y === food.y) {
        spawnFood();
      } else {
        snake.pop();
      }

      if (Math.random() < 0.02) {
        changeDirection();
      }

      if (food && Math.random() < 0.1) {
        const dx = food.x - head.x;
        const dy = food.y - head.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0 && direction.x !== -1) direction = { x: 1, y: 0 };
          else if (dx < 0 && direction.x !== 1) direction = { x: -1, y: 0 };
        } else {
          if (dy > 0 && direction.y !== -1) direction = { x: 0, y: 1 };
          else if (dy < 0 && direction.y !== 1) direction = { x: 0, y: -1 };
        }
      }
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snake.forEach((segment, i) => {
        const alpha = 0.4 - (i / snake.length) * 0.25;
        ctx.strokeStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.lineWidth = 2;
        ctx.strokeRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 4,
          gridSize - 4
        );
      });

      if (food) {
        ctx.fillStyle = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(
          food.x * gridSize + gridSize / 2,
          food.y * gridSize + gridSize / 2,
          gridSize / 2 - 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    function gameLoop() {
      update();
      draw();
    }

    resize();
    initSnake();

    const interval = setInterval(gameLoop, 150);
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
