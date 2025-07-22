import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';

const cx = classNames.bind(styles);

function EditInfoCard({ form, setForm }) {
    return (
        <div>
            {/* First & Last Name */}
            <div className={cx('form-group', 'd-flex', 'justify-content-between', 'mt-2')}>
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
            <div className={cx('form-group', 'd-flex', 'justify-content-between', 'mt-4')}>
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
            <div className={cx('form-group', 'mt-4')}>
                <div className={cx('form-item')}>
                    <label>Email</label>
                    <input type="email" className={cx('input-custom')} value={form.email} readOnly />
                </div>
            </div>

            {/* Phone */}
            <div className={cx('form-group', 'mt-4')}>
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
            <div className={cx('form-group', 'mt-4')}>
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
            <div className={cx('form-group', 'mt-4')}>
                <div className={cx('form-item')}>
                    <label>Location</label>
                    <input
                        className={cx('input-custom')}
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditInfoCard;
