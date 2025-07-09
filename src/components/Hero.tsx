import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import HackedText from "./HackedText";

const Hero = () => {
    const videoSrc = `videos/vlhlll.mp4`;
  return (
    <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black">

            <video src={videoSrc}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            ></video>
            <div className="absolute top-0 left-0 h-full w-[40vw] bg-black/40 backdrop-blur-md flex flex-col justify-center pl-16 z-20">
                {/* <h1 className="text-left font-bold text-white drop-shadow-lg select-none hero-heading">
                    Hi, I'm Zariel
                    <span className="block mb-4 hero-span">A Full stack Software Engineer</span>
                </h1> */}
                <HackedText className="text-left font-bold text-white drop-shadow-lg select-none hero-heading">
                    Hi, I'm Zariel
                </HackedText>
                <HackedText className="block mb-4 hero-span">
                    A Full stack Software Engineer
                </HackedText>
                <Button
                id="contact-button"
                title="contact"
                leftIcon={<TiLocationArrow/>}
                containerClass="bg-white/10 hover:bg-white/20 text-white flex-center gap-1"
                />
            </div>
        </div>
    </div>
  );
}

export default Hero;