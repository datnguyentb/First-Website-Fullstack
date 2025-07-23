// src/components/Loading/index.jsx
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('spinner')}></div>
        </div>
    );
}

export default Loading;
