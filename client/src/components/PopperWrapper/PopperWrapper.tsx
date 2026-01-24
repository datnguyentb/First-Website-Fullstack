import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

interface Props {
    children: React.ReactNode;
    className?: string;
}

function PopperWrapper({ children, className }: Props) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default PopperWrapper;
