import React from 'react';
import classNames from 'classnames/bind';
import styles from './ErrorFallback.module.scss';
import { errorIcon } from '~/assets/imgs/global';
import { Img } from '~/components';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ErrorFallback() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cute-error-container')}>
                <div className={cx('error-illustration')}>
                    <Img src={errorIcon.error_cute} alt="Cute Error Illustration" />
                </div>

                <h1 className={cx('cute-title')}>Oopsie Daisy!</h1>

                <p className={cx('cute-message')}>
                    Looks like something went a little bit wobbly. Please try again or come back later!
                </p>

                <button className={cx('cute-button')} onClick={() => window.location.reload()}>
                    GIVE IT ANOTHER GO!
                </button>

                <Link to="/" className={cx('back-link')}>
                    Go back home
                </Link>
            </div>
        </div>
    );
}

export default ErrorFallback;
