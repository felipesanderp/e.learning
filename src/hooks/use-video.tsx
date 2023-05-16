"use client"

import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';

export const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const player = videojs(videoElement, { techOrder: ['youtube'], sources: [{ "type": "video/youtube", "src": videoUrl }] });

      return () => {
        player.dispose();
      };
    }
  }, [videoUrl]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js h-full w-full aspect-video" controls />
      </div>
    </div>
  );
};
