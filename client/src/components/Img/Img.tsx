import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Img.module.scss';
import { noImage } from '../../assets/imgs/background';
import { ImgProps } from './ImgTypes';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

// ĐỔI TẠI ĐÂY: Sử dụng URL của Backend (ví dụ port 5000 hoặc từ file env)
const BACKEND_URL = 'http://localhost:5000';

const formatImgSrc = (src: any, fallback: string) => {
    if (!src) return fallback;
    if (typeof src === 'string') {
        if (src.startsWith('http') || src.startsWith('blob:')) {
            return src;
        }
        return baseUrl(src);
    }
    return fallback;
};

const Img: React.FC<ImgProps> = ({
    src,
    alt = '',
    fallback = noImage.no_image,
    className = '',
    circle = false,
    shadow = false,
    bordered = false,
    darkOverlay = false,
    ...props
}) => {
    // Định dạng src chuẩn ngay từ lần đầu tiên khởi tạo state
    const [imgSrc, setImgSrc] = useState(() => formatImgSrc(src, fallback));

    useEffect(() => {
        setImgSrc(formatImgSrc(src, fallback));
    }, [src, fallback]);

    const handleError = () => {
        // Nếu ảnh định dạng xong vẫn lỗi (sai tên file, file không tồn tại trên server...)
        // thì lập tức nhảy thẳng về ảnh fallback lỗi mặc định luôn
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
};

export default Img;
