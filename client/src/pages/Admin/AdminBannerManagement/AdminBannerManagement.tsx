import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminBannerManagement.module.scss';
import { BannerList, CreateBannerForm } from './components';
import { useCreateBanner } from '~/hooks/admin/banner/useCreateBanner';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

interface BannerState {
    _id: string;
    title: string;
    imageUrl: File | string;
    link: string;
}

function AdminBannerManagement() {
    const [banners, setBanners] = useState<BannerState[]>([]);
    const [banner, setBanner] = useState<BannerState>({
        _id: '',
        title: '',
        imageUrl: '',
        link: '',
    });

    const { createBanner } = useCreateBanner();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (banner._id) {
        } else {
            const res = await createBanner(banner);
            console.log(res);
            if (res) {
                toast.success(res.message);
                setBanners((prevBanners) => [res.data, ...prevBanners]);
                handleResetForm();
            } else {
                toast.error('Thêm thất bại');
            }
        }
    };

    const handleResetForm = () => {
        setBanner({
            _id: '',
            title: '',
            imageUrl: '',
            link: '',
        });
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>System Slider &amp; Banner Management</h1>
                <p>Add, edit, delete, or toggle the visibility of event banners on the homepage.</p>
            </header>

            <div className={cx('main-layout')}>
                {/* LEFT: ADD/EDIT FORM */}
                <CreateBannerForm banner={banner} setBanner={setBanner} handleSubmit={handleSubmit} />

                {/* RIGHT: BANNER LIST */}
                <BannerList banners={banners} setBanner={setBanner} />
            </div>
        </div>
    );
}

export default AdminBannerManagement;
