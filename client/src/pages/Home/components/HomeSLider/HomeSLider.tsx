import { Loading, Slider } from '~/components';
import useGetHomeBanners from '~/hooks/banner/useGetHomeBanners';

function HomeSLider() {
    //get Banner
    const { banners, loading, error } = useGetHomeBanners();
    return <>{loading ? <Loading /> : <Slider autoSlide={5000} direction={true} banners={banners} />}</>;
}

export default HomeSLider;
