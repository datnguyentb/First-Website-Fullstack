import { useEffect, useState } from 'react';
import bannerAdminApi from '~/api/admin/bannerAdminApi';
import { BannerState } from '~/types';

export default function useGetAllBanner() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [banners, setBanners] = useState<BannerState[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await bannerAdminApi.getAllBanner();
                setBanners(res.data.data);
            } catch (err: any) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { banners, setBanners, loading, error };
}
