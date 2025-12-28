import { ReactNode, MouseEventHandler } from 'react';

export interface ButtonProps {
    // Điều hướng
    to?: string;
    href?: string;

    // Trạng thái & Kiểu dáng
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    style_2?: boolean;
    style_3?: boolean;
    active?: boolean;

    // Nội dung & Icon
    badge?: boolean | string | number;
    children: ReactNode;
    className?: string;
    icon_className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;

    // Sự kiện
    onClick?: MouseEventHandler<HTMLElement>;

    // Cho phép truyền các thuộc tính bổ sung (target, rel, type, v.v.)
    [key: string]: any;
}
