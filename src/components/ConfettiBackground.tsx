import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: "confetti" | "heart" | "petal";
  opacity: number;
}

interface Balloon {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  swaySpeed: number;
  swayOffset: number;
  stringLength: number;
}

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let balloons: Balloon[] = [];
    const colors = [
      "#B76E79", // genuine rose gold
      "#FFC0CB", // soft pink
      "#FAF9F6", // warm white
      "#D4AF37", // elegant gold
      "#FFF0F5", // lavender blush
      "#FFD1DC", // soft pinkish rose
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create initial confetti
    const createParticle = (initTop = false): Particle => {
      const types: ("confetti" | "heart" | "petal")[] = ["confetti", "petal", "heart"];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * canvas.width,
        y: initTop ? Math.random() * -canvas.height : Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 1.5 + 1.0,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        type,
        opacity: Math.random() * 0.4 + 0.6,
      };
    };

    // Create balloons rising
    const createBalloon = (initBottom = false): Balloon => {
      const balloonColors = ["#B76E79", "#FFC0CB", "#FFD1DC", "#FFF0F5"];
      return {
        x: Math.random() * canvas.width,
        y: initBottom ? canvas.height + Math.random() * 100 : Math.random() * canvas.height + canvas.height,
        size: Math.random() * 20 + 20,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        speedY: Math.random() * 0.8 + 0.4,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        stringLength: Math.random() * 40 + 30,
      };
    };

    // Populate initially
    for (let i = 0; i < 75; i++) {
      particles.push(createParticle(false));
    }
    for (let i = 0; i < 6; i++) {
      balloons.push(createBalloon(false));
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      context.moveTo(x, y + size / 4);
      context.quadraticCurveTo(x, y, x + size / 2, y);
      context.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      context.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
      context.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
      context.quadraticCurveTo(x, y, x, y + size / 4);
      context.closePath();
      context.fill();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      context.ellipse(x, y, size, size / 2, Math.PI / 4, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    };

    const drawBalloon = (
      context: CanvasRenderingContext2D,
      b: Balloon,
      time: number
    ) => {
      const swayX = Math.sin(time * b.swaySpeed + b.swayOffset) * 15;
      const currentX = b.x + swayX;

      context.save();
      context.globalAlpha = 0.7;

      // Draw Balloon String
      context.beginPath();
      context.moveTo(currentX, b.y + b.size);
      context.bezierCurveTo(
        currentX - 5,
        b.y + b.size + b.stringLength / 2,
        currentX + 5,
        b.y + b.size + (b.stringLength * 3) / 4,
        currentX,
        b.y + b.size + b.stringLength
      );
      context.strokeStyle = "rgba(180, 180, 180, 0.4)";
      context.lineWidth = 1.5;
      context.stroke();

      // Draw Balloon Shape (ellipse)
      const gradient = context.createRadialGradient(
        currentX - b.size / 3,
        b.y - b.size / 3,
        b.size / 10,
        currentX,
        b.y,
        b.size
      );
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.2, b.color);
      gradient.addColorStop(1, b.color);

      context.fillStyle = gradient;
      context.beginPath();
      context.ellipse(currentX, b.y, b.size * 0.85, b.size, 0, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      // Draw Balloon tie (triangle at the bot)
      context.fillStyle = b.color;
      context.beginPath();
      context.moveTo(currentX, b.y + b.size - 2);
      context.lineTo(currentX - 6, b.y + b.size + 6);
      context.lineTo(currentX + 6, b.y + b.size + 6);
      context.closePath();
      context.fill();

      context.restore();
    };

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Balloons
      balloons.forEach((b, index) => {
        b.y -= b.speedY;
        drawBalloon(ctx, b, frameCount);

        // Reset if balloon floats off the top
        if (b.y < -b.size * 2) {
          balloons[index] = createBalloon(true);
        }
      });

      // Render Confetti and Hearts
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frameCount / 30 + index) * 0.5;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === "heart") {
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
        } else if (p.type === "petal") {
          drawPetal(ctx, 0, 0, p.size);
        } else {
          // Classic rectangle confetti
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        }

        ctx.restore();

        // Recycle if below screen
        if (p.y > canvas.height + 20) {
          particles[index] = createParticle(true);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="confetti-background-canvas" className="fixed inset-0 pointer-events-none z-10" />;
}
