import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './EventTheme.module.scss';
import hoaMai from '~/assets/flowers/1.png';
import hoaDao from '~/assets/flowers/2.png';

const cx = classNames.bind(styles);

export default function TetEffect() {
    const containerRef = useRef(null);

    useEffect(() => {
        const flowerClass = cx('flower');
        const images = [hoaMai, hoaDao]; // Danh sách ảnh

        function createFlower() {
            const flower = document.createElement('div');
            flower.className = flowerClass;

            // Chọn ngẫu nhiên ảnh
            const img = images[Math.floor(Math.random() * images.length)];
            flower.style.backgroundImage = `url(${img})`;

            // Vị trí ngang ngẫu nhiên
            flower.style.left = Math.random() * window.innerWidth + 'px';
            // Kích thước ngẫu nhiên
            const size = Math.random() * 20 + 30; // 30–50px
            flower.style.width = `${size}px`;
            flower.style.height = `${size}px`;

            const duration = Math.random() * 5 + 15; // 5–10s
            flower.style.animationDuration = duration + 's';

            flower.style.setProperty('--rotation', `${Math.random() * 360}deg`);

            containerRef.current.appendChild(flower);

            setTimeout(() => flower.remove(), duration * 1000);
        }

        const interval = setInterval(createFlower, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div className={cx('flower-container')} ref={containerRef}></div>;
}
