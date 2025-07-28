import { ActionDialog } from '~/components';

// PostDialog.jsx
function AdminPostDialog({ reasonRef, dialog, onCancel }) {
    if (!dialog.show) {
        return 'no working';
    }

    return (
        <ActionDialog
            title={dialog.title}
            confirmText={dialog.confirmText}
            reasonTitle={dialog.reasonTitle}
            senToUser={dialog.sendToUser}
            onConfirm={dialog.onConfirm}
            onCancel={onCancel}
            reasonRef={reasonRef}
        />
    );
}

export default AdminPostDialog;
