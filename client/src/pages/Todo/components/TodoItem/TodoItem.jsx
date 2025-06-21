import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TodoItem({ item, className, blank = false }) {
    const [todo, setTodo] = useState(item);
    const [isEditing, setIsEditing] = useState(false);

    function formatDateToLongString(isoString) {
        const date = new Date(isoString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function formatTimeTo12Hour(isoString) {
        const date = new Date(isoString);
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options).replace(':', 'h:');
    }

    function handleCheck(todoId) {
        const updatedTasks = todo.tasks.map((task) => {
            if (task.id === todoId) {
                return { ...task, checked: !task.checked };
            }
            return task;
        });

        setTodo({ ...todo, tasks: updatedTasks });
    }

    return (
        <>
            {blank ? (
                <div className={className}>
                    <div className={cx('item', 'blank')}>
                        <div className={cx('add-btn')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={className}>
                    <div className={cx('item')} style={{ backgroundColor: todo.color }}>
                        <div>
                            <div className={cx('title')}>{todo.title}</div>
                            <div className={'todo-list-wrapper'}>
                                <ul className={cx('todo-list', 'mt-3')}>
                                    {todo.tasks.map((task, id) => (
                                        <li key={id} className={cx('todo')}>
                                            <input
                                                onChange={() => handleCheck(task.id)}
                                                type="checkbox"
                                                className={cx('check-done')}
                                                checked={task.checked}
                                            />
                                            <p className={cx('label', 'ms-3')}>{task.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={cx('todo-time', 'd-flex', 'mt-3')}>
                            <div className={cx('todo-time-icon')}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </div>
                            <div className={cx('todo-time-text', 'ms-3')}>
                                <p className={cx('date')}>{formatDateToLongString(todo.datetime)}</p>
                                <p className={cx('hour')}>{formatTimeTo12Hour(todo.datetime)}</p>
                            </div>
                        </div>
                        <div className={cx('edit')} onClick={() => setIsEditing(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TodoItem;
