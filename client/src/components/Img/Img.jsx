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
    ...props
}) {
    const [imgSrc, setImgSrc] = useState(src || fallback); // fallback nếu src rỗng

    useEffect(() => {
        setImgSrc(src || fallback);
    }, [src, fallback]);

    const handleError = () => {
        if (imgSrc !== fallback) {
            setImgSrc(fallback);
        }
    };

    const classNames = cx(
        {
            circle,
            shadow,
            bordered,
        },
        className,
    );

    return (
        <div className={cx('wrapper')}>
            <img src={imgSrc} alt={alt} onError={handleError} loading="lazy" className={classNames} {...props} />
        </div>
    );
}

export default Img;
