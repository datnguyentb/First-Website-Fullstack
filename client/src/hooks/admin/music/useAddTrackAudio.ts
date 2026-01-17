import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import musicAdminApi from '~/api/admin/musicAdminApi';

const useAddTrackAudio = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const addTrackAudio = async (id: string, file: File | null) => {
        if (!file) {
            toast.error('No file selected');
            return null;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('audio', file);
            console.log(formData);
            const res = await musicAdminApi.addTrackAudio(id, formData);
            return res.data;
        } catch (err: any) {
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { addTrackAudio, loading };
};

export default useAddTrackAudio;
