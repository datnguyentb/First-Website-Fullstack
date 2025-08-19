import useAdminGetAll from '~/hooks/admin/music/useAdminGetAll';

export function useAdminMusicManage() {
    const { result, setResult, loading } = useAdminGetAll();

    return {
        result,
        setResult,
        loading,
    };
}
