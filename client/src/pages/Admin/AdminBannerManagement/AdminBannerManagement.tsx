import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminBannerManagement.module.scss';
import { BannerList, CreateBannerForm } from './components';
import { useCreateBanner } from '~/hooks/admin/banner/useCreateBanner';
import { toast } from 'react-toastify';
import { useUpdateBanner } from '~/hooks/admin/banner/useUpdateBanner';
import { BannerState } from '~/types';
import useGetAllBanner from '~/hooks/admin/banner/useGetAllBanner';
import { Loading } from '~/components';

const cx = classNames.bind(styles);

function AdminBannerManagement() {
    const [banner, setBanner] = useState<BannerState>({
        _id: '',
        title: '',
        type: 'normal',
        imageUrl: '',
        link: '',
    });

    const { createBanner } = useCreateBanner();
    const { updateBanner } = useUpdateBanner();

    //getbanner
    const { banners, setBanners, loading, error } = useGetAllBanner();

    //Submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (banner._id) {
            const res = await updateBanner(banner);
            if (res) {
                toast.success(res.message);
                setBanners((prevBanners) => prevBanners.map((item) => (item._id === banner._id ? res.data : item)));
                handleResetForm();
            } else {
                toast.error(res.message);
            }
        } else {
            const res = await createBanner(banner);
            if (res) {
                toast.success(res.message);
                setBanners((prevBanners) => [res.data, ...prevBanners]);
                handleResetForm();
            } else {
                toast.error(res.message);
            }
        }
    };

    //Reset Form
    const handleResetForm = () => {
        setBanner({
            _id: '',
            title: '',
            type: 'normal',
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
                <CreateBannerForm
                    banner={banner}
                    setBanner={setBanner}
                    handleSubmit={handleSubmit}
                    handleResetForm={handleResetForm}
                />

                {/* RIGHT: BANNER LIST */}
                {loading ? <Loading /> : <BannerList banners={banners} setBanner={setBanner} setBanners={setBanners} />}
            </div>
        </div>
    );
}

export default AdminBannerManagement;
