import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackedText from "./HackedText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const titleContainerId = "#hacked-title-container";
        const aboutTextId = "#about-text";

        // Set initial states
        gsap.set([titleContainerId, aboutTextId], { opacity: 0, y: 50 });

        // Create ScrollTrigger with all callbacks
        ScrollTrigger.create({
            trigger: "#about",
            start: "top top",
            end: "bottom top",
            onEnter: () => {
                // Fade in when entering
                gsap.to(titleContainerId, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
                
                gsap.to(aboutTextId, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3
                });

                // Trigger HackedText animation
                const hackedTextElement = document.querySelector("#hacked-text-About-Me");
                if (hackedTextElement) {
                    hackedTextElement.dispatchEvent(new Event('mouseover'));
                }
            },
            onLeave: () => {
                // Fade out when leaving (scrolling down)
                gsap.to([titleContainerId, aboutTextId], {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power2.in"
                });
            },
            onEnterBack: () => {
                // Fade in when scrolling back up
                gsap.to(titleContainerId, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
                
                gsap.to(aboutTextId, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3
                });

                // Trigger HackedText animation
                const hackedTextElement = document.querySelector("#hacked-text-About-Me");
                if (hackedTextElement) {
                    hackedTextElement.dispatchEvent(new Event('mouseover'));
                }
            },
            onLeaveBack: () => {
                // Fade out when scrolling back up (leaving the section)
                gsap.to([titleContainerId, aboutTextId], {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    ease: "power2.in"
                });
            }
        });

    }, []);

    return (
        <div id="about" className="relative h-dvh w-screen overflow-x-hidden bg-black flex flex-col justify-center items-center">
            <div id="hacked-title-container" className="mb-8">
                <HackedText 
                    className="text-center text-white drop-shadow-lg select-none hero-heading"
                    playOnLoad={false}
                >
                    About Me
                </HackedText>
            </div>
            <p 
                id="about-text"
                className="max-w-2xl text-center text-lg text-white"
            >
                I am a Full Stack Software Engineer with a passion for building scalable web applications and
                creating seamless user experiences. I have experience in various technologies and frameworks, and I
                love to learn new things.
            </p>
        </div>
    );
}

export default About;