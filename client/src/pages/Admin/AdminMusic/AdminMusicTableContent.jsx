import classNames from 'classnames/bind';
import styles from './AdminMusicManage.module.scss';
import AdminMusicManageRow from './AdminMusicManageRow';

const cx = classNames.bind(styles);

function AdminMusicTableContent() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Aritis</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminMusicManageRow />
                    <AdminMusicManageRow />
                </tbody>
            </table>
        </>
    );
}

export default AdminMusicTableContent;
