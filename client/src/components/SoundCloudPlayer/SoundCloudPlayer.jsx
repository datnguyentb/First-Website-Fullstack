import { useEffect, useRef, forwardRef } from 'react';

const SoundCloudPlayer = forwardRef(({ trackId }, ref) => {
    const iframeRef = useRef(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        if (window.SC && window.SC.Widget && iframeRef.current) {
            const widget = window.SC.Widget(iframeRef.current);
            widgetRef.current = widget;

            if (ref) {
                ref.current = widget;
            }

            // Lắng nghe khi widget đã sẵn sàng
            widget.bind(window.SC.Widget.Events.READY, () => {
                widget.load(`https://api.soundcloud.com/tracks/${trackId}`, {
                    auto_play: true,
                });
            });
        }
    }, [trackId, ref]);

    const src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&auto_play=false`;

    return (
        <iframe
            ref={iframeRef}
            width="100%"
            height="0"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={src}
            style={{ display: 'none' }}
        ></iframe>
    );
});

export default SoundCloudPlayer;
