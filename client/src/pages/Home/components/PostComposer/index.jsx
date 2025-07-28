import classNames from 'classnames/bind';
import styles from './postComposer.module.scss';
import { useRef } from 'react';
import { usePostComposer } from './usePostComposer';
import { usePosts } from '~/contexts/usePost';
import { toast } from 'react-toastify';

import PostTextarea from './PostTextarea';
import ImagePreviewList from './ImagePreviewList';
import PostActions from './PostActions';
import useCreatePost from '~/hooks/post/useCreatePost';

const cx = classNames.bind(styles);

function PostComposer() {
    const { createPost, loading } = useCreatePost();
    const { text, setText, selectedImages, setSelectedImages, previewImages, isPostValid } = usePostComposer();

    const imageInputRef = useRef();
    const privacyOptionRef = useRef();
    const { setPosts } = usePosts();

    const handleImageSelect = (e) => {
        const files = [...e.target.files];
        if (files.length + selectedImages.length > 5) {
            toast.warning('Chỉ chọn tối đa 5 ảnh!');
            e.target.value = '';
            return;
        }
        setSelectedImages((prev) => [...prev, ...files]);
    };

    const handlePasteImage = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        const pasted = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                const file = new File([blob], `pasted-${Date.now()}-${i}.png`, {
                    type: blob.type,
                });
                pasted.push(file);
            }
        }

        if (selectedImages.length + pasted.length > 5) {
            toast.warning('Tối đa 5 ảnh!');
            return;
        }
        setSelectedImages((prev) => [...prev, ...pasted]);
    };

    const handleRemovePreview = (index) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append('content', text.trim());
        formData.append('privacy', privacyOptionRef.current?.value);
        selectedImages.forEach((file) => formData.append('posts', file));

        const result = await createPost(formData);

        if (result) {
            setPosts((prev) => [result, ...prev]);
            toast.success('Đăng bài thành công!');
            setText('');
            setSelectedImages([]);
            if (imageInputRef.current) imageInputRef.current.value = null;
            if (privacyOptionRef.current) privacyOptionRef.current.value = 'private';
        } else {
            //
        }
    };

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
