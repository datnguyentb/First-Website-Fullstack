import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './EditProfile.module.scss';
import userApi from '~/api/userApi';
import baseUrl from '~/helper/baseUrl';
import Swal from 'sweetalert2';
import { formatDate } from '~/utils/dateUtils';
import { handleImagePreview } from '~/utils/imagePreview';
import { Button, Img } from '~/components';
import { useUser } from '~/contexts/useUser';

const cx = classNames.bind(styles);

function EditProfile({ onCancel, onUpdate }) {
    const { user, setUser } = useUser();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        birthdate: '',
        location: '',
        bio: '',
        avatarUrl: '',
    });

    const [initialForm, setInitialForm] = useState({});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [disabled, setDisabled] = useState(true);

    // 👉 Handle file upload & preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setForm((prev) => ({
            ...prev,
            avatar: selectedFile.name,
        }));
        handleImagePreview(selectedFile, setPreview, preview);
    };

    // 👉 Save user
    const handleSaveUser = async () => {
        const result = await Swal.fire({
            title: 'Xác nhận lưu',
            text: 'Bạn có muốn lưu lại những chỉnh sửa hồ sơ của mình không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                const formData = new FormData();
                formData.append('avatar', file);
                formData.append('firstName', form.firstName);
                formData.append('lastName', form.lastName);
                formData.append('email', form.email);
                formData.append('phone', form.phone);
                formData.append('gender', form.gender);
                formData.append('birthdate', form.birthdate);
                formData.append('location', form.location);
                formData.append('bio', form.bio);

                const res = await userApi.updateUser(formData);

                toast.success('Cập nhật thành công!');
                setUser(res.data.data);
                onUpdate();
                setInitialForm(form);
                setDisabled(true);
            } catch (error) {
                toast.error('Có lỗi xảy ra, thử lại sau nhé~');
                console.error(error);
            }
        }
    };

    // 👉 Fetch user profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userApi.getUserByIdAll(user.id);
                const data = res.data.data;

                if (data.birthdate) {
                    data.birthdate = formatDate(data.birthdate);
                }

                setForm(data);
                setInitialForm(data);
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
            }
        };

        fetchUser();
    }, [user.id]);

    // 👉 Revoke preview URL when unmounted
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // 👉 Enable Save when form is changed
    useEffect(() => {
        const isChanged = JSON.stringify(form) !== JSON.stringify(initialForm);
        setDisabled(!isChanged);
    }, [form, initialForm]);

    return (
        <div className={cx('edit-container')}>
            <div className={cx('form-group', 'd-flex', 'align-items-center')}>
                <div className={cx('avatar')}>
                    <Img src={preview || baseUrl(form.avatarUrl)} className={cx('avatar-custom')} />
                </div>
                <label htmlFor="avatarUpload" className={cx('upload-label')}>
                    📸 Choose File
                </label>
                <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={cx('input-hidden')}
                />
            </div>

            {/* First & Last Name */}
            <div className={cx('form-group', 'd-flex', 'justify-content-between')}>
                <div className={cx('form-item')}>
                    <label>First name</label>
                    <input
                        className={cx('input-custom')}
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                </div>
                <div className={cx('form-item')}>
                    <label>Last name</label>
                    <input
                        className={cx('input-custom')}
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                </div>
            </div>

            {/* Birthdate & Gender */}
            <div className={cx('form-group', 'd-flex', 'justify-content-between')}>
                <div className={cx('form-item')}>
                    <label>Birthdate</label>
                    <input
                        type="date"
                        className={cx('input-custom')}
                        value={form.birthdate}
                        onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                    />
                </div>
                <div className={cx('form-item')}>
                    <label>Gender</label>
                    <select
                        className={cx('input-custom')}
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            {/* Email (read-only) */}
            <div className={cx('form-group')}>
                <div className={cx('form-item')}>
                    <label>Email</label>
                    <input type="email" className={cx('input-custom')} value={form.email} readOnly />
                </div>
            </div>

            {/* Phone */}
            <div className={cx('form-group')}>
                <div className={cx('form-item')}>
                    <label>Phone Number</label>
                    <input
                        className={cx('input-custom')}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>
            </div>

            {/* Bio */}
            <div className={cx('form-group')}>
                <div className={cx('form-item')}>
                    <label>Bio</label>
                    <textarea
                        className={cx('input-custom')}
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                </div>
            </div>

            {/* Location */}
            <div className={cx('form-group')}>
                <div className={cx('form-item')}>
                    <label>Location</label>
                    <input
                        className={cx('input-custom')}
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className={cx('actions')}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button disabled={disabled} onClick={handleSaveUser}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default EditProfile;
