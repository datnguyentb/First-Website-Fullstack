import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminBannerManagement.module.scss';
import { BannerList, CreateBannerForm } from './components';

const cx = classNames.bind(styles);

//  {
//             id: '1',
//             title: 'New Year Festive Event 2026',
//             imageUrl: 'https://picsum.photos/id/10/800/400',
//             link: 'https://example.com/festive-event',
//             isActive: true,
//         },

function AdminBannerManagement() {
    // 1. Mock Data Initial State
    const [banners, setBanners] = useState([]);

    // 2. Form States
    const [banner, setBanner] = useState({
        id: '',
        title: '',
        imageUrl: '',
        link: '',
        isActive: false,
    });
    const [previewContent, setPreviewContent] = useState('');

    const handleSubmit = () => {
        console.log('submit');
    };

    const handleFileChange = () => {
        console.log('file change');
    };

    const handleResetForm = () => {
        console.log('reset form');
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>System Slider &amp; Banner Management</h1>
                <p>Add, edit, delete, or toggle the visibility of event banners on the homepage.</p>
            </header>

            <div className={cx('main-layout')}>
                {/* LEFT: ADD/EDIT FORM */}
                <CreateBannerForm />

                {/* RIGHT: BANNER LIST */}
                <BannerList />
            </div>
        </div>
    );
}

export default AdminBannerManagement;
