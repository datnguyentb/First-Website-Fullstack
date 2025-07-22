// utils/textUtils.js
import React from 'react'; // 💥 CẦN IMPORT nếu dùng JSX như <p>...</p>

export const renderMultilineText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => <p key={index}>{line || <br />}</p>);
};
