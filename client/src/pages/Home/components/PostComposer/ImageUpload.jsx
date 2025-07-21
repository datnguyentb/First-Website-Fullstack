import { Img } from '~/components';
import classNames from 'classnames/bind';
import styles from './postComposer.module.scss';
import { small_imgs } from '~/assets/imgs/small_imgs';

const cx = classNames.bind(styles);

function ImageUpload({ imageInputRef, handleImageSelect }) {
    return (
        <label htmlFor="uploadInput" className={cx('attacked-imgs', 'd-flex')}>
            <div className={cx('img')}>
                <Img src={small_imgs.attacked_img} />
            </div>
            <span className={cx('ms-3')}>Picture/video</span>
            <input
                id="uploadInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className={cx('d-none')}
                ref={imageInputRef}
            />
        </label>
    );
}

export default ImageUpload;
