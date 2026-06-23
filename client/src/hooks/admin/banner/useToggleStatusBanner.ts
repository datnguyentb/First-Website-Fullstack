import { useState } from 'react';
import bannerAdminApi from '~/api/admin/bannerAdminApi';

export function useToggleStatusBanner() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const toggleStatusBanner = async (bannerId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await bannerAdminApi.toggleStatus(bannerId);
            setLoading(false);

            return response.data;
        } catch (err: any) {
            setLoading(false);
            const errMsg = err?.response?.data?.message || 'Something went wrong';
            setError(errMsg);
            throw err;
        }
    };

    return { toggleStatusBanner, loading, error };
}
