import classNames from 'classnames/bind';
import styles from './BannerManagement.module.scss';
import { Img } from '~/components';
import { useDeleteBanner } from '~/hooks/admin/banner/useDeleteBanner';
import { toast } from 'react-toastify';
import { useToggleStatusBanner } from '~/hooks/admin/banner/useToggleStatusBanner';

const cx = classNames.bind(styles);

function BannerItem({ banner, setBanner, setBanners }) {
    const { deleteBanner } = useDeleteBanner();
    const { toggleStatusBanner } = useToggleStatusBanner();
    const handleEditClick = () => {
        setBanner({
            _id: banner._id,
            title: banner.title,
            imageUrl: banner.imageUrl,
            link: banner.link,
            type: banner.type,
        });
    };

    const handleToggleStatus = async () => {
        const res = await toggleStatusBanner(banner._id);
        if (res.success) {
            const updateItem = res?.data;
            toast.success(res.message);
            setBanners((prevBanners) =>
                prevBanners.map((item) =>
                    item._id === updateItem._id ? { ...item, isActive: updateItem.isActive } : item,
                ),
            );
        } else {
            toast.error(res.message);
        }
    };

    const handleDeleteClick = async () => {
        const res = await deleteBanner(banner._id);
        if (res) {
            toast.success(res.message);
            setBanners((prevBanners) => prevBanners.filter((item) => item._id !== banner._id));
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div key={banner.id} className={cx('banner-item')}>
            <div className={cx('banner-thumb')}>
                <Img src={banner.imageUrl} />
            </div>
            <div className={cx('banner-info')}>
                <div className={cx('banner-title')}>
                    {banner.title}
                    <span className={cx('badge', `badge-${banner.type}`)}>{banner.type}</span>
                </div>
                <div className={cx('banner-link')}>
                    Link:{' '}
                    <a href={banner.link || '#'} target="_blank" rel="noreferrer">
                        {banner.link || 'None'}
                    </a>
                </div>
            </div>
            <div className={cx('banner-actions')}>
                <label className={cx('switch')} title="Toggle Visibility">
                    <input type="checkbox" checked={banner.isActive} onChange={handleToggleStatus} />
                    <span className={cx('slider-toggle')}></span>
                </label>
                <div className={cx('action-btns')}>
                    <button className={cx('btn-small', 'btn-edit')} onClick={handleEditClick}>
                        Edit
                    </button>
                    <button className={cx('btn-small', 'btn-delete')} onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BannerItem;
