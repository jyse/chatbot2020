import React from "react";
import "./YouTubeVideo.css";

const YouTubeVideo = (props) => {
  const { youTubeId } = props;

  const videoSrc = "https://www.youtube.com/embed/" + youTubeId;

  return (
    <div className="container">
      <iframe
        className="player"
        type="text/html"
        width="100%"
        height="100%"
        src={videoSrc}
        frameborder="0"
      />
    </div>
  );
};

export default YouTubeVideo;
