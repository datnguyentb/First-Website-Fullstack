import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePlaylist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faMusic, faPlus } from '@fortawesome/free-solid-svg-icons';
import Img from '~/components/Img';
import { useEnterKeySubmit } from '~/hooks/common/useEnterKeySubmit';
import useCreatePlaylistForm from './useCreatePlaylist';

const cx = classNames.bind(styles);

function CreatePlaylist({ setShowCreatePlaylist }: { setShowCreatePlaylist: Dispatch<SetStateAction<boolean>> }) {
    const createButtonRef = useRef<HTMLButtonElement>(null);

    // Gọi đúng hook quản lý form
    const { formData, preview, handleChange, handleImageChange, handlePrivacyChange, handleSubmit } =
        useCreatePlaylistForm({ setShowCreatePlaylist });

    useEnterKeySubmit(createButtonRef);

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
                        <label className={cx('avatar-upload-box')} htmlFor="image-upload">
                            {preview ? (
                                <Img id="avatar-preview" src={preview} alt="Playlist Avatar Preview" />
                            ) : (
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </div>
                            )}
                        </label>
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
                            name="playlistName"
                            placeholder="E.g., Weekend Vibes"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="playlistDescription"
                            rows={3}
                            placeholder="A brief description of your playlist..."
                            onChange={handleChange}
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
                                onChange={handlePrivacyChange}
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
