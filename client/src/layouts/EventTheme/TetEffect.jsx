import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './EventTheme.module.scss';

const cx = classNames.bind(styles);

export default function TetEffect() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function createFirework(x, y) {
            const count = 100;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x,
                    y,
                    angle: random(0, Math.PI * 2),
                    speed: random(1, 5),
                    radius: random(2, 4),
                    life: 100,
                    color: `hsl(${random(0, 360)}, 100%, 50%)`,
                });
            }
        }

        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed + 0.5; // gravity
                p.life--;
                if (p.life <= 0) particles.splice(i, 1);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            requestAnimationFrame(update);
        }

        const interval = setInterval(() => {
            createFirework(random(100, canvas.width - 100), random(100, canvas.height / 2));
        }, 1500);

        update();

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className={cx('tet-canvas')}></canvas>;
}
