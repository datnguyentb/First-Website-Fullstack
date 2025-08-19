import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { useMemo, useRef, useState } from 'react'; // Import useRef
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AdminMusicManageRow({ data, onDelete, onUpload }) {
    // Tạo một ref cho thẻ input file
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    const info = useMemo(() => {
        if (data.type === 'track') {
            return data.info;
        } else {
            if (Number(data.info) > 0) {
                return `${data.info} Tracks`;
            } else {
                return '';
            }
        }
    }, [data.type, data.info]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <tr title={`${data.name} - ${data.info}`}>
            <td className={cx('name')}>
                <span>{data.name}</span>
            </td>
            <td className={cx('artist')}>
                <span>{info}</span>
            </td>
            <td className={cx('type', data.type)}>
                <span>{data.type}</span>
            </td>
            <td>
                <button
                    className={cx('btn-remove')}
                    title="Remove"
                    onClick={() => {
                        onDelete(data.spotifyId);
                    }}
                >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
                <button className={cx('btn-upload')} onClick={handleUploadClick} title="Upload .mp3">
                    <FontAwesomeIcon icon={faUpload} />
                </button>
                <input
                    ref={fileInputRef}
                    id="fileInput"
                    className={cx('d-none')}
                    type="file"
                    accept=".mp3,.wav,.ogg"
                    onChange={(e) => {
                        // e.target.files là FileList
                        const file = e.target.files[0];
                        setFile(file);
                    }}
                />
            </td>
        </tr>
    );
}

export default AdminMusicManageRow;
