import { use, useRef, useState } from 'react';
const Hero = () => {
    const videoRef = `videos/vlhlll.mp4`;
  return (
    <div className="relative h-dvh w-screen overflow-hidden">
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <video src={videoRef}
            autoPlay
            loop
            muted></video>
        </div>
    </div>
  );
}

export default Hero;