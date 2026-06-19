import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';
import BannerItem from './BannerItem';

const cx = classNames.bind(styles);

function BannerList({}) {
    const banners = [];
    return (
        <div className={cx('list-container')}>
            <div className={cx('list-header')}>
                <h2>Current Banners</h2>
                <span className={cx('banner-count')}>
                    {banners.length} {banners.length === 1 ? 'banner' : 'banners'}
                </span>
            </div>

            <div className={cx('banner-list')}>
                {banners.length === 0 ? (
                    <div className={cx('empty-msg')}>No banners found. Create one!</div>
                ) : (
                    banners.map((banner) => <BannerItem banner={banner} />)
                )}
            </div>
        </div>
    );
}

export default BannerList;
