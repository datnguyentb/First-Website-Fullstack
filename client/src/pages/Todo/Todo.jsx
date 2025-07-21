import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Todo.module.scss';
import todoListdb from '~/databseFake/todoListdb';
import { TodoItem, Focus } from './components';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function Todo() {
    useEffect(() => {
        document.title = 'Twirl | Todo';
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('sticky-wall-wrapper')}>
                    <div>
                        <div className={cx('sticky-wall', 'row', 'gy-5', 'gx-5')}>
                            {todoListdb.map((item, index) => (
                                <TodoItem key={index} item={item} className={cx('col-3')} />
                            ))}
                            <TodoItem blank className={cx('col-3')} />
                        </div>
                    </div>
                </div>
                <div className={cx('focus', 'mt-5')}>
                    <Focus />
                </div>
            </div>
        </>
    );
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
