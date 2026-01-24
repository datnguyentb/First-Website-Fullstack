import classNames from 'classnames/bind';
import styles from './ActionItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ActionItem({ item, handleItemClick }) {
    let Comp: any = 'div';
    if (item.to) {
        Comp = Link;
    } else if (item.href) {
        Comp = 'a';
    }

    const props: any = {};
    if (item.to) {
        props.to = item.to;
    } else if (item.href) {
        props.href = item.href;
    } else {
        props.onClick = () => handleItemClick(item);
    }

    return (
        <div>
            <Comp className={cx('menu-item')} {...props}>
                {item?.icon && <div className={cx('icon-wrapper')}>{item.icon}</div>}
                <span className={cx('label')}>{item.label}</span>
            </Comp>
            {item.separator && <div className={cx('separator')} />}
        </div>
    );
}

export default ActionItem;
