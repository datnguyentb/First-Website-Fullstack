import { useEffect, useRef, forwardRef } from 'react';

const SoundCloudPlayer = forwardRef(({ trackId, volume }, ref) => {
    const iframeRef = useRef(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe || !window.SC || !window.SC.Widget) return;

        const widget = window.SC.Widget(iframe);
        widgetRef.current = widget;
        if (ref) ref.current = widget;

        const handlePlay = () => {
            widget.setVolume(volume);
        };

        const handleReady = () => {
            widget.load(`https://api.soundcloud.com/tracks/${trackId}`, {
                auto_play: true,
            });
            widget.bind(window.SC.Widget.Events.PLAY, handlePlay);
        };

        widget.bind(window.SC.Widget.Events.READY, handleReady);

        return () => {
            // ⚠️ Chỉ cleanup nếu iframe vẫn còn tồn tại trong DOM
            if (iframe && iframe.contentWindow) {
                try {
                    widget.unbind(window.SC.Widget.Events.READY, handleReady);
                    widget.unbind(window.SC.Widget.Events.PLAY, handlePlay);
                } catch (err) {
                    console.warn('Safe cleanup failed:', err);
                }
            }
        };
    }, [trackId, ref]);

    useEffect(() => {
        if (widgetRef.current) {
            try {
                widgetRef.current.setVolume(volume);
            } catch (err) {
                console.warn('Error setting volume:', err);
            }
        }
    }, [volume]);

    const src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&auto_play=false`;

    return <iframe ref={iframeRef} width="100%" height="0" allow="autoplay" src={src} style={{ display: 'none' }} />;
});

export default SoundCloudPlayer;
