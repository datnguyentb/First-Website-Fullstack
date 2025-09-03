import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Img.module.scss';
import { noImage } from '../../assets/imgs/background';

const cx = classNames.bind(styles);

function Img({
    src,
    alt = '',
    fallback = noImage.no_image,
    className = '',
    circle = false,
    shadow = false,
    bordered = false,
    darkOverlay = false,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src || fallback);

    useEffect(() => {
        setImgSrc(src || fallback);
    }, [src, fallback]);

    const handleError = () => {
        if (imgSrc !== fallback) {
            setImgSrc(fallback);
        }
    };

    const imgClassNames = cx(
        {
            circle,
            shadow,
            bordered,
            'dark-overlay': darkOverlay,
        },
        className,
    );

    return (
        <div className={cx('wrapper')}>
            <img src={imgSrc} alt={alt} onError={handleError} loading="lazy" className={imgClassNames} {...props} />
            {darkOverlay && <div className={cx('dark-overlay')}></div>}
        </div>
    );
}

Img.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    fallback: PropTypes.string,
    className: PropTypes.string,
    circle: PropTypes.bool,
    shadow: PropTypes.bool,
    bordered: PropTypes.bool,
    darkOverlay: PropTypes.bool,
};

export default Img;
