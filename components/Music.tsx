import React from 'react';

const Music: React.FC = () => {
  let isChrome = false;
  if (typeof window !== 'undefined') {
    isChrome =
      /Chrome/.test(window.navigator.userAgent) &&
      /Google Inc/.test(window.navigator.vendor);
  }
  return isChrome ? (
    <iframe
      src="/assets/cafe-music.mp3"
      allow="autoplay"
      style={{ display: 'none' }}
    ></iframe>
  ) : (
    <audio src="/assets/cafe-music.mp3" autoPlay loop hidden />
  );
};

export default Music;
