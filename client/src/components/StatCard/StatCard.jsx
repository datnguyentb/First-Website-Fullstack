import classNames from 'classnames/bind';
import styles from './StatCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function StatCard({ to, title, number }) {
    let Comp = 'div';
    if (to) {
        Comp = Link;
    }

    return (
        <Comp to={to} className={cx('wrapper', 'card')}>
            <h3 className={cx('cardTitle')}>{title}</h3>
            <p className={cx('cardValue')}>{number == 0 ? '0' : number ? number : 'Uknown'}</p>
        </Comp>
    );
}

export default StatCard;
