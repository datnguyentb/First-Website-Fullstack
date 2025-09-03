import PropTypes from 'prop-types';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading({ small }) {
    const className = cx('wrapper', { small });
    return (
        <div className={className}>
            <div className={cx('spinner')}></div>
        </div>
    );
}

Loading.propTypes = {
    small: PropTypes.bool,
};

export default Loading;
