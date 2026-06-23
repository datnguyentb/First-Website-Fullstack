import { Loading, Slider } from '~/components';
import useGetAuthBanners from '~/hooks/banner/useGetAuthBanners';

function AuthSlider() {
    //get banners
    const { banners, loading, error } = useGetAuthBanners();

    return <>{loading ? <Loading /> : <Slider banners={banners} autoSlide={3000} />}</>;
}

export default AuthSlider;
