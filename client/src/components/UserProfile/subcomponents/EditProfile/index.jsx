import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './EditProfile.module.scss';
import Swal from 'sweetalert2';
import { handleImagePreview } from '~/utils/imagePreview';
import EditAvatar from './EditAvatar';
import EditInfoCard from './EditInfoCard';
import EditActionBtn from './EditActionBtn';
import { useEditProfile } from './useEditProfile';
import useUpdateUser from '~/hooks/user/useUpdateUser';

const cx = classNames.bind(styles);

function EditProfile({ onCancel, onUpdate }) {
    const { user, setUser, form, setForm, preview, setPreview, file, setFile, disabled, setDisabled, setInitialForm } =
        useEditProfile();

    //hook Api
    const { updateUser } = useUpdateUser();

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

        if (!result.isConfirmed) return;

        const hasFirstName = form.firstName?.trim();
        const hasLastName = form.lastName?.trim();

        if (!hasFirstName && !hasLastName) {
            toast.error('Vui lòng nhập ít nhất Họ hoặc Tên.');
            return;
        }
        const updatedUser = await updateUser(form, file);
        if (updatedUser) {
            setUser(updatedUser);
            onUpdate();
            setInitialForm(form);
            setDisabled(true);
        }
    };

    return (
        <div className={cx('edit-container')}>
            <EditAvatar preview={preview} handleFileChange={handleFileChange} user={user} />

            <EditInfoCard form={form} setForm={setForm} />

            <EditActionBtn onCancel={onCancel} disabled={disabled} handleSaveUser={handleSaveUser} />
        </div>
    );
}

export default EditProfile;
