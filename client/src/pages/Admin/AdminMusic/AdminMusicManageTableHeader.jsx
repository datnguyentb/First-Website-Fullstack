import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminMusicManageTableHeader({ setType, inputValue, setInputValue }) {
    const handleDeleteInput = () => {
        setInputValue('');
    };
    return (
        <div className={cx('table-header-wrapper')}>
            <div className={cx('search-filter')}>
                <input
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.currentTarget.value);
                    }}
                    type="text"
                    placeholder="Enter your search"
                />

                {inputValue && (
                    <div className={cx('delete-icon')} onClick={handleDeleteInput}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                )}
            </div>
            <div>
                <label>Type</label>
                <select
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    defaultValue="all"
                >
                    <option value="all">All</option>
                    <option value="track">Track</option>
                    <option value="playlist">Playlist</option>
                </select>
            </div>
        </div>
    );
}

export default AdminMusicManageTableHeader;
