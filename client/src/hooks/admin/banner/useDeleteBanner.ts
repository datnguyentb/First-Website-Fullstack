import { useState } from 'react';
import bannerAdminApi from '~/api/admin/bannerAdminApi';

export function useDeleteBanner() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteBanner = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await bannerAdminApi.deleteBanner(id);
            setLoading(false);

            return response.data;
        } catch (err: any) {
            setLoading(false);
            const errMsg = err?.response?.data?.message || 'Something went wrong while deleting the banner';
            setError(errMsg);
            throw err;
        }
    };

    return { deleteBanner, loading, error };
}
