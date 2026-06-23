import { useState } from 'react';
import bannerAdminApi from '~/api/admin/bannerAdminApi';
import { BannerState } from '~/types';

export function useCreateBanner() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createBanner = async (bannerData: BannerState) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();

        formData.append('title', bannerData.title);
        formData.append('link', bannerData.link);
        formData.append('type', bannerData.type);

        // --- ĐOẠN XỬ LÝ IMAGEURL (FILE HOẶC LINK STRING) ---
        if (bannerData.imageUrl instanceof File) {
            formData.append('file', bannerData.imageUrl);
        } else if (typeof bannerData.imageUrl === 'string') {
            formData.append('imageUrl', bannerData.imageUrl);
        }

        try {
            const response = await bannerAdminApi.createBanner(formData);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            setLoading(false);
            const errMsg = err?.response?.data?.message || 'Có lỗi xảy ra khi lưu banner';
            setError(errMsg);
            throw err;
        }
    };

    return { createBanner, loading, error };
}
