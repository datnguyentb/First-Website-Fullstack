import classNames from 'classnames/bind';
import styles from './ConversationItem.module.scss';
import { Img } from '~/components';
const cx = classNames.bind(styles);

function ConversationItem({ data, active = false }) {
    const classes = cx('wrapper', {
        active,
    });
    return (
        <div className={classes}>
            <div className={cx('avatar')}>
                <Img src="https://cdn-01.cms-ap-v2i.applyflow.com/pinnacle-people/wp-content/uploads/2023/09/slide-2.png" />
            </div>
            <div className={cx('info')}>
                <div className={cx('name')}>{data.ten_nguoi_dung}</div>
                <div className={cx('last-message')}>{data.xem_truoc_tin_nhan}</div>
            </div>
            <div className={cx('timestamp')}>{data.thoi_gian_gui}</div>
        </div>
    );
}

export default ConversationItem;
