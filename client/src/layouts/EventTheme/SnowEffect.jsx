import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './EventTheme.module.scss';

const cx = classNames.bind(styles);

function SnowEffect() {
    const snowRef = useRef(null);

    useEffect(() => {
        const snowflakeClass = cx('snowflake');

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.className = snowflakeClass;
            snowflake.textContent = '❄';

            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

            const duration = Math.random() * 4 + 6;
            snowflake.style.animationDuration = duration + 's';

            snowRef.current.appendChild(snowflake);

            setTimeout(() => snowflake.remove(), duration * 1000);
        }

        const interval = setInterval(createSnowflake, 400);

        return () => clearInterval(interval);
    }, []);

    return <div className={cx('snow')} ref={snowRef}></div>;
}

export default SnowEffect;
