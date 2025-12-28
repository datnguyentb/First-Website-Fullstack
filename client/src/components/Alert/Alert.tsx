import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import style from './Alert.module.scss';
import React from 'react';
import { AlertProps } from './type';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(style);

const icons: Record<'success' | 'error', IconDefinition> = {
    success: faCheckCircle,
    error: faTimesCircle,
};

const Alert: React.FC<AlertProps> = ({ type = 'success', title, message }) => {
    return (
        <div className={cx('wrapper', 'alert', type)}>
            <FontAwesomeIcon icon={icons[type]} className={cx('alert-icon')} />
            <div className={cx('alert-content')}>
                <strong>{title}</strong>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alert;
