import classNames from 'classnames/bind';
import styles from './postComposer.module.scss';
import { toast } from 'react-toastify';

import PostTextarea from './components/PostTextarea';
import ImagePreviewList from './components/ImagePreviewList';
import PostActions from './components/PostActions';

import { usePostComposer } from './hooks/usePostComposer';
import { useImageHandler } from './hooks/useImageHandler';
import { useSubmitPost } from './hooks/useSubmitPost';
import { Post } from '~/contexts/PostContext/PostContextType';

const cx = classNames.bind(styles);

function PostComposer() {
    const {
        text,
        setText,
        setPosts,
        selectedImages,
        setSelectedImages,
        previewImages,
        isPostValid,
        imageInputRef,
        privacyOptionRef,
    } = usePostComposer();

    // Định nghĩa handleSuccess TRƯỚC useSubmitPost
    const handleSuccess = (result: Post) => {
        setPosts((prev: Post[]) => [result, ...prev]);
        toast.success('Your post has been published!');

        // Reset UI
        setText('');
        setSelectedImages([]);
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (privacyOptionRef.current) privacyOptionRef.current.value = 'private';
    };

    const { handleImageSelect, handlePasteImage, handleRemovePreview } = useImageHandler(
        selectedImages,
        setSelectedImages,
    );

    const { handlePostSubmit, loading } = useSubmitPost(selectedImages, text, privacyOptionRef, handleSuccess);

    return (
        <div className={cx('wrapper')}>
            <PostTextarea text={text} setText={setText} onPaste={handlePasteImage} />

            <ImagePreviewList previewImages={previewImages} handleRemovePreview={handleRemovePreview} />

            <PostActions
                onSubmit={handlePostSubmit}
                loading={loading}
                isPostValid={isPostValid}
                imageInputRef={imageInputRef}
                handleImageSelect={handleImageSelect}
                privacyOptionRef={privacyOptionRef}
            />
        </div>
    );
}

export default PostComposer;
