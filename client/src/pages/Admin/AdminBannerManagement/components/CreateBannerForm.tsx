import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';
import { useImagePreview } from '~/hooks/imagePreview/useImagePreview';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function CreateBannerForm({ banner, setBanner, handleSubmit, handleResetForm }) {
    const previewImages = useImagePreview(banner.imageUrl);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBanner((prev) => ({
            ...prev,
            [name]: value, // Cập nhật thuộc tính dựa theo attribute 'name' của thẻ input
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // 2. Cập nhật vào state banner
            setBanner((prev) => ({
                ...prev,
                imageUrl: file,
            }));
        }
    };

    return (
        <div className={cx('wrapper', 'card')}>
            <h2>{banner._id ? 'Edit Banner Details' : 'Add New Banner'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="title">Banner Title / Event Name</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={cx('form-control')}
                        placeholder="e.g., Spring Mega Sale 2026"
                        value={banner.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="title">Banner Type</label>
                    <select
                        id="type"
                        name="type"
                        className={cx('form-control')}
                        value={banner.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="normal">Normal (Homepage)</option>
                        <option value="auth">Auth Interface (Login/Register)</option>
                    </select>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="imageUrl">Image URL (or upload a file below)</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        className={cx('form-control')}
                        placeholder="https://example.com/banner.jpg"
                        value={banner.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="imageFile" className={cx('file-label')}>
                        ➔ Or upload image from your device
                    </label>
                    <input
                        type="file"
                        id="imageFile"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label>Image Preview:</label>
                    <div className={cx('preview-box')}>
                        {banner.imageUrl ? <Img src={previewImages} /> : <span>No image selected</span>}
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="link">Redirect Link (URL on click)</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        className={cx('form-control')}
                        placeholder="https://yourwebsite.com/event"
                        value={banner.link}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={cx('btn', 'btn-primary')}>
                    {banner._id ? 'Update Banner' : 'Save Banner'}
                </button>

                {banner._id && (
                    <button type="button" className={cx('btn', 'btn-cancel')} onClick={handleResetForm}>
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreateBannerForm;
