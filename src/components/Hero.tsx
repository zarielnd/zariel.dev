import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Hero = () => {
    const videoRef = `videos/vlhlll.mp4`;
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black">

            <video src={videoRef}
            autoPlay  
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            ></video>
            <div className="absolute top-0 left-0 h-full w-[40vw] bg-black/40 backdrop-blur-md flex flex-col justify-center pl-16 z-20">
                <h1 className="text-left text-5xl font-bold text-white drop-shadow-lg select-none">
                    Hi, I'm Zariel
                    <span className="block text-4xl mb-4">A Full stack Software Engineer</span>
                </h1>
                <Button
                id="explore-button"
                title="Explore"
                leftIcon={<TiLocationArrow/>}
                containerClass="bg-white/10 hover:bg-white/20 text-white flex-center gap-1"
                />
            </div>
        </div>
    </div>
  );
}

export default Hero;