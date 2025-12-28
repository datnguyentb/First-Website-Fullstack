import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { ButtonProps } from './ButtonTypes';

const cx = classNames.bind(styles);

const Button: React.FC<ButtonProps> = ({
    to,
    href,
    badge,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    style_2 = false,
    style_3 = false,
    active = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    icon_className,
    ...passProps
}) => {
    // 1. Xác định Component sẽ render
    let Comp: any = 'button';

    // 2. Thu thập các props
    const props: any = {
        onClick,
        ...passProps,
    };

    // Loại bỏ các sự kiện khi button bị disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx(
        'wrapper',
        {
            primary,
            outline,
            text,
            disabled,
            rounded,
            small,
            large,
            style_2,
            style_3,
            active,
        },
        className,
    );

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', icon_className)}>{leftIcon}</span>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon', icon_className)}>{rightIcon}</span>}
            {badge && <span className={cx('badge')}>{badge === true ? 1 : badge}</span>}
        </Comp>
    );
};

export default Button;
