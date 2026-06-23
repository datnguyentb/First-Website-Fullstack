import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';
import BannerItem from './BannerItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

type InterfaceType = 'all' | 'normal' | 'auth';

const FILTERD = ['all', 'normal', 'auth'];

function BannerList({ banners, setBanner, setBanners }) {
    const [type, setType] = useState('all');

    const handleTabClick = (e) => {
        setType(e.target.name);
    };

    const filteredBanners = banners.filter((banner) => {
        if (type === 'all') return true;
        return banner.type === type;
    });
    return (
        <div className={cx('list-container')}>
            <div className={cx('list-header')}>
                <h2>Current Banners ({banners.length})</h2>
                <div className={cx('tab-filters')}>
                    {FILTERD.map((item, index) => (
                        <button
                            key={index}
                            name={item}
                            className={cx('tab-btn', item === type ? 'active' : '')}
                            onClick={handleTabClick}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className={cx('banner-list')}>
                {filteredBanners.length === 0 ? (
                    <div className={cx('empty-msg')}>No banners found. Create one!</div>
                ) : (
                    filteredBanners.map((banner) => (
                        <BannerItem key={banner._id} banner={banner} setBanner={setBanner} setBanners={setBanners} />
                    ))
                )}
            </div>
        </div>
    );
}

export default BannerList;
