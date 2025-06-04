import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Img.module.scss';

const cx = classNames.bind(styles);

function Img({
    src,
    alt = '',
    fallback = '/images/fallback.jpg',
    className = '',
    circle = false,
    shadow = false,
    bordered = false,
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        setImgSrc(fallback);
    };

    const classNames = `${cx(
        {
            circle,
            shadow,
            bordered,
        },
        className,
    )}`;

    return (
        <div className={cx('wrapper')}>
            <img src={imgSrc} alt={alt} onError={handleError} loading="lazy" className={classNames} {...props} />
        </div>
    );
}

export default Img;
