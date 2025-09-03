import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from '~/components/Img';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Slider({ ArrImg, autoSlide, direction }) {
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const resetInterval = () => {
        if (!autoSlide) return; // Không chạy nếu không truyền autoSlide

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === ArrImg.length - 1 ? 0 : prevIndex + 1));
        }, autoSlide);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? ArrImg.length - 1 : prevIndex - 1));
        resetInterval();
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === ArrImg.length - 1 ? 0 : prevIndex + 1));
        resetInterval();
    };

    useEffect(() => {
        if (autoSlide) {
            resetInterval();
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [autoSlide]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${100 * currentIndex}%)`;
            sliderRef.current.style.transition = 'transform 0.5s ease';
        }
    }, [currentIndex]);

    return (
        <div className={cx('wrapper')}>
            <div ref={sliderRef} className={cx('slider-cover')}>
                {ArrImg.map((src, index) => (
                    <div className={cx('item')} key={index}>
                        <Img src={src} />
                    </div>
                ))}
            </div>
            {direction && (
                <>
                    <div onClick={handlePrev} className={cx('icon-direc', 'left-icon')}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div onClick={handleNext} className={cx('icon-direc', 'right-icon')}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </>
            )}
        </div>
    );
}

Slider.propTypes = {
    ArrImg: PropTypes.array.isRequired,
    autoSlide: PropTypes.bool,
    direction: PropTypes.bool,
};

export default Slider;
