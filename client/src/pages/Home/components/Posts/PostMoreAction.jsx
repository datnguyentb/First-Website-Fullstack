import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './Post.module.scss';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreSetting from './MoreSetting';

const cx = classNames.bind(styles);

function PostMoreAction({ settingVisible, handleClickOutsideSetting, handleToggleSetting, post, isAuthor }) {
    return (
        <div>
            <TippyHeadless
                placement="top-end"
                interactive
                offset={[0, -30]}
                visible={settingVisible}
                onClickOutside={handleClickOutsideSetting}
                render={(attrs, ref) => (
                    <div tabIndex="-1" ref={ref} {...attrs}>
                        <MoreSetting onClick={handleToggleSetting} id={post._id} isAuthor={isAuthor} />
                    </div>
                )}
            >
                <div onClick={handleToggleSetting} className={cx('setting-icon')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </TippyHeadless>
        </div>
    );
}

export default PostMoreAction;
