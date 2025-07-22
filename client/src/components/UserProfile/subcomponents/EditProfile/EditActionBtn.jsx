import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function EditActionBtn({ onCancel, disabled, handleSaveUser }) {
    return (
        <div className={cx('actions')}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button disabled={disabled} onClick={handleSaveUser}>
                Save
            </Button>
        </div>
    );
}

export default EditActionBtn;
