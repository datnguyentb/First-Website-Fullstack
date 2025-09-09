import PropTypes from 'prop-types';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading({ small, type, main }) {
    switch (type) {
        case 'wave-2':
            return (
                <div className={cx('music-waves-2')}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            );

        case 'bounce-loading':
            return (
                <div className={cx('bounce-loading', { main })}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );

        case 'wave':
            return (
                <div className={cx('music-waves')}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            );

        default:
            return (
                <div className={cx('wrapper', { small }, { main })}>
                    <div className={cx('spinner')}></div>
                </div>
            );
    }
}

Loading.propTypes = {
    small: PropTypes.bool,
    type: PropTypes.oneOf(['spinner', 'wave', 'dots']), // dễ quản lý
};

Loading.defaultProps = {
    type: 'spinner',
};

export default Loading;
