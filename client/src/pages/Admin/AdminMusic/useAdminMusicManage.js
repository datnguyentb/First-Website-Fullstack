import useAdminGetAllTracks from '~/hooks/admin/music/useAdminGetAllTracks';

export function useAdminMusicManage() {
    const { result, setResult, loading } = useAdminGetAllTracks();

    return {
        result,
        setResult,
        loading,
    };
}
