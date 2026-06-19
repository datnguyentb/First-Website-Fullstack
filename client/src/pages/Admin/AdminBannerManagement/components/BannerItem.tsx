import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';

const cx = classNames.bind(styles);

function BannerItem({ banner }) {
    return (
        <div key={banner.id} className={cx('banner-item')}>
            <img
                src={banner.imageUrl}
                alt={banner.title}
                className={cx('banner-thumb')}
                onError={(e) => {
                    e.target.src = 'https://placehold.co/160x90?text=Image+Error';
                }}
            />
            <div className={cx('banner-info')}>
                <div className={cx('banner-title')}>{banner.title}</div>
                <div className={cx('banner-link')}>
                    Link:{' '}
                    <a href={banner.link || '#'} target="_blank" rel="noreferrer">
                        {banner.link || 'None'}
                    </a>
                </div>
            </div>
            <div className={cx('banner-actions')}>
                <label className={cx('switch')} title="Toggle Visibility">
                    <input type="checkbox" checked={banner.isActive} onChange={() => handleToggleStatus(banner.id)} />
                    <span className={cx('slider-toggle')}></span>
                </label>
                <div className={cx('action-btns')}>
                    <button className={cx('btn-small', 'btn-edit')} onClick={() => handleEditClick(banner)}>
                        Edit
                    </button>
                    <button className={cx('btn-small', 'btn-delete')} onClick={() => handleDeleteClick(banner.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BannerItem;
