import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';

const cx = classNames.bind(styles);

function CreateBannerForm({
    bannerId,
    handleSubmit,
    title,
    setTitle,
    imageUrl,
    setImageUrl,
    handleFileChange,
    previewContent,
    link,
    setLink,
    handleResetForm,
}) {
    return (
        <div className={cx('wrapper', 'card')}>
            <h2>{bannerId ? 'Edit Banner Details' : 'Add New Banner'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="title">Banner Title / Event Name</label>
                    <input
                        type="text"
                        id="title"
                        className={cx('form-control')}
                        placeholder="e.g., Spring Mega Sale 2026"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="imageUrl">Image URL (or upload a file below)</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className={cx('form-control')}
                        placeholder="https://example.com/banner.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
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
                    <div className={cx('preview-box')}>{previewContent}</div>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="link">Redirect Link (URL on click)</label>
                    <input
                        type="text"
                        id="link"
                        className={cx('form-control')}
                        placeholder="https://yourwebsite.com/event"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                <button type="submit" className={cx('btn', 'btn-primary')}>
                    {bannerId ? 'Update Banner' : 'Save Banner'}
                </button>

                {bannerId && (
                    <button type="button" className={cx('btn', 'btn-cancel')} onClick={handleResetForm}>
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreateBannerForm;
