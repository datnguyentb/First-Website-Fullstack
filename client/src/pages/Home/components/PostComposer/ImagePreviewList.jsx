import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Img } from '~/components';
import classNames from 'classnames/bind';
import styles from './postComposer.module.scss';

const cx = classNames.bind(styles);

function ImagePreviewList({ previewImages, handleRemovePreview }) {
    if (previewImages.length === 0) return null;

    return (
        <div className={cx('preview-list')}>
            {previewImages.map((url, idx) => (
                <div key={idx} className={cx('preview-item')}>
                    <Img src={url} className={cx('preview-img')} />
                    <FontAwesomeIcon
                        onClick={() => handleRemovePreview(idx)}
                        className={cx('delete-img-preview')}
                        icon={faClose}
                    />
                </div>
            ))}
        </div>
    );
}

export default ImagePreviewList;
