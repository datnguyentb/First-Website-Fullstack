import { useEffect, useState } from 'react';
import bannerApi from '~/api/user/bannerApi';
import { BannerState } from '~/types';

export default function useGetHomeBanners() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [banners, setBanners] = useState<BannerState[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await bannerApi.getHomeBanners();
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

    return { banners, loading, error };
}
