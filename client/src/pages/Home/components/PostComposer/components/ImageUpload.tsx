import { Img } from '~/components';
import classNames from 'classnames/bind';
import styles from '../PostComposer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ImageUpload({ imageInputRef, handleImageSelect }) {
    return (
        <label htmlFor="uploadInput" className={cx('attacked-imgs', 'd-flex')}>
            <div className={cx('img')}>
                <FontAwesomeIcon icon={faImage} />
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
