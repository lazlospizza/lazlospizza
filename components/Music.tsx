import React from 'react';

const Music: React.FC = () => {
  return (
    <>
      <iframe
        src="/assets/silence.mp3"
        allow="autoplay"
        id="audio"
        style={{ display: 'none' }}
      ></iframe>
      <audio id="player" autoPlay loop>
        <source src="/assets/cafe-music.mp3" type="audio/mp3" />
      </audio>
    </>
  );
};

export default Music;
