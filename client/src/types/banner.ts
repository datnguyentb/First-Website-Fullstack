export interface BannerState {
    _id: string;
    title: string;
    type: 'auth' | 'normal';
    imageUrl: File | string;
    link: string;
}
