import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './EditProfile.module.scss';
import EditAvatar from './EditAvatar';
import EditInfoCard from './EditInfoCard';
import EditActionBtn from './EditActionBtn';
import { useEditProfile } from './useEditProfile';
import useUpdateUser from '~/hooks/user/useUpdateUser';
import { useModalContext } from '~/contexts';

const cx = classNames.bind(styles);

function EditProfile({ onCancel, onUpdate }) {
    const { user, setUser, form, setForm, preview, file, setFile, disabled, setDisabled, setInitialForm } =
        useEditProfile();

    //hook Api
    const { updateUser } = useUpdateUser();
    const { showModal } = useModalContext();

    // 👉 Handle file upload & preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setForm((prev) => ({
            ...prev,
            avatar: selectedFile.name,
        }));
    };

    //[PUT] Save user
    const handleSaveUser = async () => {
        showModal({
            title: 'Xác nhận lưu',
            description: 'Bạn có muốn lưu lại những chỉnh sửa hồ sơ của mình không?',
            type: 'confirm',
            confirmText: 'Xác nhận',
            onConfirm: async () => {
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
            },
        });
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
