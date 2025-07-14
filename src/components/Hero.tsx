import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import HackedText from "./HackedText";
import FlipWord from "./FlipWord";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoSrc = `videos/vlhlll.mp4`;

    const words = ["Secure", "Modern", "Scalable"];

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "power2.inOut",
            },
        });

        tl.fromTo(
            "#video-frame",
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            "#content",
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                ease: "power1.out",
                duration: 1,
                scrollTrigger: {
                    trigger: "#content",
                    start: "top 80%",
                    end: "top 40%",
                    scrub: false,
                    toggleActions: "play none none reverse",
                },
                onComplete: () => {
                    gsap.to("#content", {
                        opacity: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: "#content",
                            start: "center center",
                            end: "bottom center ",
                            scrub: true,
                        },
                    });
                },
            }
        );
    }, []);

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "+=600 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: false,
            }
        })

        clipAnimation.to("#video-frame", {
            scale: 8,
            borderRadius: 0,
            transformOrigin: "75% 25%", // Zoom into this point (30% from left, 40% from top)
        })
    });

    return (
        <div id="home" className="relative h-dvh w-screen overflow-x-hidden bg-black">
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black">

                <video src={videoSrc}
                    autoPlay
                    loop
                    muted
                    className="absolute left-0 top-0 size-full object-cover object-center"
                ></video>
                <div id="content" className="absolute top-0 left-0 h-full sm:w-[80vw] md:w-[70vw] lg:w-[40vw] bg-black/40 backdrop-blur-md flex flex-col justify-center pl-16 z-20">
                    {/* <h1 className="text-left font-bold text-white drop-shadow-lg select-none hero-heading">
                    Hi, I'm Zariel
                    <span className="block mb-4 hero-span">A Full stack Software Engineer</span>
                </h1> */}
                    <HackedText className="text-left font-bold text-white drop-shadow-lg select-none hero-heading">
                        Hi, I&apos;m Zariel
                    </HackedText>
                    <HackedText className="block mb-4 hero-span select-none">
                        A Full stack Software Engineer
                    </HackedText>
                    <HackedText className="block hero-span select-none">
                        I&apos;m Dedicated To Building
                    </HackedText>
                    <FlipWord words={words} duration={2500} className="text-4xl font-bold text-white flip-word select-none">
                    </FlipWord>
                    <HackedText className="block mb-4 hero-span select-none">
                        Web Applications
                    </HackedText>
                    <Button
                        id="contact-button"
                        title="contact"
                        leftIcon={<TiLocationArrow />}
                        scrollTarget="contact"
                        containerClass="bg-white/10 hover:bg-white/20 text-white flex-center gap-1"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;