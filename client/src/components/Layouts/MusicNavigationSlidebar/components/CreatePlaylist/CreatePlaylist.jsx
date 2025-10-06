import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePlaylist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMusic, faPlus } from '@fortawesome/free-solid-svg-icons';
import Img from '~/components/Img';
import { handleImagePreview } from '~/utils/imagePreview';
import useCreatePlaylist from '~/hooks/music/playlist/useCreatePlaylist';
import { toast } from 'react-toastify';
import { usePlaylistContext } from '~/contexts';

const cx = classNames.bind(styles);

function CreatePlaylist({ setShowCreatePlaylist }) {
    //useRef
    const createButtonRef = useRef(null);

    //useContext
    const { setPlaylists } = usePlaylistContext();

    //useHook UseState
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        playlistAvatar: null,
        playlistName: '',
        playlistDescription: '',
        isPublic: true,
    });

    //Xử lý nhấn enter
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (createButtonRef.current) {
                    createButtonRef.current.click();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    //Call Api
    const { createPlaylist } = useCreatePlaylist();

    //useHook UseEffect
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    //Handle Funtion
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFormData((prev) => ({
            ...prev,
            playlistAvatar: selectedFile,
        }));
        handleImagePreview(selectedFile, setPreview, preview);
    };

    const handleSubmit = async () => {
        if (!formData.playlistName.trim()) return;
        const data = new FormData();
        data.append('playlistAvatar', formData.playlistAvatar);
        data.append('playlistName', formData.playlistName);
        data.append('playlistDescription', formData.playlistDescription);
        data.append('isPublic', formData.isPublic);
        const res = await createPlaylist(data);
        if (res?.success) {
            toast.success(res?.message);
            setShowCreatePlaylist(false);
            setPlaylists((prev) => [res.data, ...prev]);
        } else {
            toast.error('error');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>
                        <FontAwesomeIcon icon={faMusic} /> Create New Playlist
                    </h1>
                    <p>Organize your favorite songs.</p>
                </div>

                <form>
                    <div className={cx('avatar-upload')}>
                        <div
                            className={cx('avatar-upload-box')}
                            onClick={() => document.getElementById('image-upload').click()}
                        >
                            {preview ? (
                                <Img id="avatar-preview" src={preview} alt="Playlist Avatar Preview" />
                            ) : (
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </div>
                            )}
                        </div>
                        <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                            Upload Image (Optional)
                        </label>
                        <input
                            type="file"
                            id="image-upload"
                            name="image_upload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="playlist-name">Playlist Name</label>
                        <input
                            type="text"
                            id="playlist-name"
                            name="playlist_name"
                            placeholder="E.g., Weekend Vibes"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    playlistName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="A brief description of your playlist..."
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    playlistDescription: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className={cx('toggle-group')}>
                        <label className={cx('status')} htmlFor="privacy-toggle">
                            Public
                        </label>
                        <label className={cx('toggle-switch')}>
                            <input
                                type="checkbox"
                                id="privacy-toggle"
                                name="privacy_toggle"
                                defaultChecked
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isPublic: e.target.value,
                                    }))
                                }
                            />
                            <span className={cx('slider')}></span>
                        </label>
                    </div>

                    <button
                        type="button"
                        className={cx('cta-button', formData.playlistName.trim() === '' && 'disabled')}
                        onClick={handleSubmit}
                        disabled={!formData.playlistName.trim()}
                        ref={createButtonRef}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Create Playlist
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePlaylist;
