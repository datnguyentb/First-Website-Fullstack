import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Todo.module.scss';

const cx = classNames.bind(styles);
function Todo() {
    return <div className={cx('wrapper')}></div>;
}

Todo.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Todo;
