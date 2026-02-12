import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackedText from "./HackedText";
import { TiLocationArrow } from "react-icons/ti";
import { Globe } from "./Globe";
import Image from "next/image";
import { SmartVideo } from "./SmartVideo";
// import BentoCard from "./BentoCard";
import { useRef, useState } from "react";
import { SmartGlobe } from "./SmartGlobe";
import { OrbitingCircles } from "./OrbitingCircles";
import { Frameworks } from "./Frameworks";
gsap.registerPlugin(ScrollTrigger);

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    itemRef.current.style.transform = `
    perspective(700px)
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg)
    scale3d(.95,.95,.95)
  `;
  };

  const handleMouseLeave = () => {
    const el = itemRef.current;
    if (!el) return;

    // Smooth reset
    el.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const About = () => {
  // useGSAP(() => {
  //   const titleElement = document.querySelector("#hacked-title-container");

  //   if (titleElement) {
  //     gsap.fromTo(
  //       titleElement,
  //       { opacity: 0, y: -50 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: titleElement,
  //           start: "top 80%",
  //           end: "top 40%",
  //           scrub: true,
  //         },
  //       },
  //     );

  //     ScrollTrigger.create({
  //       trigger: titleElement,
  //       start: "top 80%",
  //       end: "top 40%",
  //       onEnter: () => {
  //         const hackedTextElement = document.querySelector(
  //           "#hacked-text-About-Me",
  //         );
  //         if (hackedTextElement) {
  //           hackedTextElement.dispatchEvent(
  //             new Event("mouseover", { bubbles: true }),
  //           );
  //         }
  //       },
  //     });
  //   }

  //   // Separate animation for the about text
  //   const aboutTextElement = document.querySelector("#about-text");
  //   if (aboutTextElement) {
  //     gsap.fromTo(
  //       aboutTextElement,
  //       { opacity: 0, y: 50 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: aboutTextElement,
  //           start: "top 85%",
  //           end: "top 45%",
  //           scrub: true,
  //         },
  //       },
  //     );
  //   }
  // }, []);

  return (
    // <div
    //   id="about"
    //   className="relative h-dvh w-screen overflow-x-hidden bg-black flex flex-col justify-center items-center"
    // >
    //   <div id="hacked-title-container" className="mb-8">
    //     <HackedText
    //       className="text-center text-white drop-shadow-lg select-none hero-heading"
    //       playOnLoad={false}
    //     >
    //       About Me
    //     </HackedText>
    //   </div>
    //   <p id="about-text" className="max-w-2xl text-center text-lg text-white">
    //     I am a Full Stack Software Engineer with a passion for building scalable
    //     web applications and creating seamless user experiences. I have
    //     experience in various technologies and frameworks, and I love to learn
    //     new things.
    //   </p>
    // </div>
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 select-none hero-heading">
          <HackedText className="max-w-md text-white" playOnLoad={false}>
            About Me
          </HackedText>
        </div>
        {/*Card 1*/}
        <BentoTilt className="bento-tilt_1 border-hsla relative mb-7 h-96 max-h-[30rem] w-full overflow-hidden rounded-md md:h-[65vh]">
          <div className="relative size-full">
            <SmartVideo
              src="videos/feature-1.mp4"
              className="bento-media"
            ></SmartVideo>
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
              <div className="select-none">
                <h1 className="bento-title ">Bonjour, I'm Zariel</h1>
                <p className="bento-description">
                  Over the past two years, I've built solid frontend and backend
                  foundations to ship dynamic software and web applications.
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>
        {/* start grid */}
        <div className="grid h-[135vh] max-h-[95rem] mw-full grid-cols-2 grid-rows-3 gap-7">
          {/*Card2*/}
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2 max-h-[70rem]">
            <div className="relative size-full">
              <div
                className="
                absolute
                top-0
                bottom-0
                md:top-[50%]
                w-full
                h-full
                left-[50%]
                scale-100
                md:scale-[2.5]
                md:left-[0%]
              "
              >
                <Frameworks />
              </div>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">Tech stack</h1>
                  <p className="bento-description">
                    I specialize in a diverse range of modern web technologies,
                    delivering scalable and efficient solutions.
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>
          {/*Card3*/}
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 ml-32 md:col-span-1 md:ml-0 max-h-[30rem]">
            <div className="relative size-full">
              <figure
                className="absolute inset-y-0 right-[-30%]
  flex items-center justify-end
  md:right-[-20%] md:scale-125"
              >
                <SmartGlobe></SmartGlobe>
              </figure>

              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">Time Zone</h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base">
                    I'm based in Jupiter, and open to remote work worldwide
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>
          {/*Card4*/}
          <BentoTilt className="bento-tilt_1 col-span-2 mr-14 md:col-span-1 md:mr-0 max-h-[30rem]">
            <div className="relative size-full select-none pointer-events-none">
              <Image
                src={"/imgs/feature-2.jpg"}
                alt={"Feature 2"}
                className="bento-media"
                fill
                priority
              ></Image>

              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">lorem ipsum</h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base text-str">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sed porttitor magna. Mauris vitae leo dui. Proin vel
                    nulla at nisl feugiat interdum
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>
          {/*Card5*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <div className="flex size-full flex-col justify-between bg-white p-5">
              <h1 className="bento-title special-font text-black">
                "Know how to learn. Then, want to learn."
              </h1>
              <p className="m-5 self-end text-black">- Katherine Johnson</p>
            </div>
          </BentoTilt>
          {/*Card6*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <SmartVideo
              src="videos/feature-4.mp4"
              className="bento-media border-hsla"
            ></SmartVideo>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default About;
