import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './StatCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function StatCard({ to, title, number, icon, describe }) {
    let Comp = 'div';
    if (to) {
        Comp = Link;
    }

    return (
        <Comp to={to} className={cx('wrapper')}>
            <div className={cx('card-icon')}>{icon}</div>
            <div className={cx('card-title')}>{title}</div>
            <div className={cx('card-desc')}>{describe}</div>
        </Comp>
    );
}

StatCard.propTypes = {
    to: PropTypes.string,
    title: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default StatCard;
