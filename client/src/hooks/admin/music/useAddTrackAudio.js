import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAddTrackAudio = () => {
    const [loading, setLoading] = useState(false);

    const addTrackAudio = async (id, file = null) => {
        if (!file) {
            toast.error('No file selected');
            return null;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('audio', file);
            const res = await musicAdminApi.addTrackAudio(id, formData);
            return res.data;
        } catch (err) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackAudio, loading };
};

export default useAddTrackAudio;
