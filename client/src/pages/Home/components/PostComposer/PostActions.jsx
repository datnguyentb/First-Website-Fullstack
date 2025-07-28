import { Button } from '~/components';
import classNames from 'classnames/bind';
import styles from './postComposer.module.scss';
import ImageUpload from './ImageUpload';

const cx = classNames.bind(styles);

function PostActions({ onSubmit, loading, isPostValid, imageInputRef, handleImageSelect, privacyOptionRef }) {
    return (
        <div className={cx('d-flex', 'justify-content-between', 'mt-3')}>
            <div className={cx('attached', 'd-flex')}>
                <ImageUpload imageInputRef={imageInputRef} handleImageSelect={handleImageSelect} />
                <select ref={privacyOptionRef} className={cx('privacy-select', 'ms-3')}>
                    <option value="private">🔒 Private</option>
                    <option value="friends">👤 Friend</option>
                    <option value="public">🌎 Public</option>
                </select>
            </div>

            <div>
                <Button onClick={onSubmit} primary disabled={!isPostValid || loading}>
                    {loading ? <div className={cx('spinner')}></div> : 'Publish'}
                </Button>
            </div>
        </div>
    );
}

export default PostActions;
