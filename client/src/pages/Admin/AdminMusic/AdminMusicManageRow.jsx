import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import { useMemo, useRef, useState } from 'react'; // Import useRef
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
import useAddTrackAudio from '~/hooks/admin/music/useAddTrackAudio';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AdminMusicManageRow({ data, onDelete, onUpload }) {
    // Tạo một ref cho thẻ input file
    const [isReady, setIsReady] = useState(data.isReady);
    const fileInputRef = useRef(null);
    const { addTrackAudio, loading } = useAddTrackAudio();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile || !data?._id) return;
        const resUpload = await addTrackAudio(data._id, selectedFile);
        if (resUpload.success) {
            setIsReady(true);
            toast.success(resUpload.message);
        } else {
            toast.error(resUpload.data.message);
        }
    };

    const artists = useMemo(() => {
        return data.artists.map((artist) => artist.name).join(', ');
    }, [data?.artists]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <tr title={`${data.name} - ${data.info}`}>
            <td className={cx('name')}>
                <span>{data.name}</span>
            </td>
            <td className={cx('artist')}>
                <span>{artists}</span>
            </td>
            <td className={cx('type', isReady ? 'ready' : 'not-ready')}>
                <span>{isReady ? 'Ready' : 'Not Ready'}</span>
            </td>
            <td>
                <button
                    className={cx('btn-remove')}
                    title="Remove"
                    onClick={() => {
                        onDelete(data._id);
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
                        handleFileChange(e);
                    }}
                />
            </td>
        </tr>
    );
}

export default AdminMusicManageRow;
