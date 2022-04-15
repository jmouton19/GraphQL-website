import React from 'react';
import './videoPlayer.css';

// source: https://dev.to/rebeccapeltz/five-ways-for-integrating-the-cloudinary-video-player-into-react-applications-2kcb

function VideoPlayer({ publicId, cloudName }) {
  const url = `https://player.cloudinary.com/embed/?public_id=${publicId}&cloud_name=${cloudName}&player%5Bfluid%5D=true&player%5Bcontrols%5D=true&player%5Bmuted%5D=true&player%5BautoplayMode%5D=on-scroll&player%5Bautoplay%5D=true&player%5Bloop%5D=true&source%5BsourceTypes%5D%5B0%5D=mp4`;

  return (
    <>
      <div className="iframe-container">
        <iframe
          className="responsive-iframe"
          title="Cloud Hosted Video Player"
          src={url}
          width="640"
          height="480"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
}
export default VideoPlayer;
