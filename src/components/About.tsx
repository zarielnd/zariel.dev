import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HackedText from "./HackedText";
import Image from "next/image";
import { SmartVideo } from "./SmartVideo";
// import BentoCard from "./BentoCard";
import { useRef } from "react";
import { SmartGlobe } from "./SmartGlobe";
import { SmartFrameworks } from "./SmartFrameworks";

gsap.registerPlugin(ScrollTrigger);

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
}
export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const boundsRef = useRef<DOMRect | null>(null);

  const calculateTilt = (clientX: number, clientY: number) => {
    if (!itemRef.current || !boundsRef.current) return;

    const { left, top, width, height } = boundsRef.current;

    const relativeX = (clientX - left) / width;
    const relativeY = (clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 6;
    const tiltY = (relativeX - 0.5) * -6;

    itemRef.current.style.transform = `
      perspective(700px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(.96,.96,.96)
    `;
  };

  const handlePointerEnter = () => {
    if (!itemRef.current) return;
    boundsRef.current = itemRef.current.getBoundingClientRect();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    // Desktop hover behavior
    if (e.pointerType === "mouse") {
      calculateTilt(e.clientX, e.clientY);
    }

    // Mobile drag behavior
    if (e.pointerType === "touch" && isDragging.current) {
      calculateTilt(e.clientX, e.clientY);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") return;

    if (!itemRef.current) return;

    isDragging.current = true;
    boundsRef.current = itemRef.current.getBoundingClientRect();
    itemRef.current.setPointerCapture(e.pointerId);
  };

  const resetTilt = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    isDragging.current = false;
    boundsRef.current = null;

    if (e && itemRef.current.hasPointerCapture(e.pointerId)) {
      itemRef.current.releasePointerCapture(e.pointerId);
    }

    itemRef.current.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1,1,1)
    `;
  };

  return (
    <div
      ref={itemRef}
      className={`${className} transition-transform duration-300 ease-out`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerDown={handlePointerDown}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
    >
      {children}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "bottom top",
        end: "+=50%",
        scrub: true,
      },
    });

    tl.to(sectionRef.current, {
      backgroundColor: "#ffffff",
      ease: "none",
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pb-52 bg-black will-change[background-color];"
    >
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 select-none hero-heading">
          <HackedText
            hoverAnimation={true}
            className="max-w-md text-white font-bold"
            playOnLoad={false}
          >
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
                <h1 className="bento-title ">Bonjour, I&apos;m Zariel</h1>
                <p className="bento-description">
                  Over the past two years, I&apos;ve built solid frontend and
                  backend foundations to ship dynamic software and web
                  applications.
                </p>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* start grid */}
        <div
          ref={gridRef}
          className="grid h-[135vh] max-h-[95rem] mw-full grid-cols-2 grid-rows-3 gap-7 transform-gpu [transform-style:preserve-3d]"
        >
          {/*Card2*/}
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2 max-h-[70rem]">
            <div className="relative size-full" ref={card2Ref}>
              <div className=" absolute top-0 bottom-0 md:top-[50%] w-full h-full left-[50%] scale-100 md:scale-[2.5] md:left-[0%] transform-gpu will-change-transform ">
                <SmartFrameworks observeRef={card2Ref} />
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
              <figure className="absolute inset-y-0 right-[-30%] flex items-center justify-end md:right-[-20%] md:scale-125">
                <SmartGlobe></SmartGlobe>
              </figure>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">Time Zone</h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base">
                    I&apos;m based in Jupiter, and open to remote work worldwide
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card4*/}
          <BentoTilt className="bento-tilt_1 col-span-2 mr-14 md:col-span-1 md:mr-0 max-h-[30rem]">
            <div className="relative size-full select-none pointer-events-none">
              <div className="absolute right-5 bottom-5 size-30 md:inset-y-5 md:top-5 md:aspect-square md:size-auto">
                <Image
                  src={"/logos/temporal.svg"}
                  alt={"Temporal logo"}
                  className="bento-media brightness-0 invert object-contain"
                  fill
                  sizes="(min-width: 768px) 100vw, 40px"
                  priority
                ></Image>
              </div>
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white pointer-events-none">
                <div className="select-none">
                  <h1 className="bento-title ">CURRENTLY</h1>
                  <p className="mt-3 max-w-64 text-xs md:text-base text-str">
                    Deep in Go and Temporal at the moment; durable workflows are
                    the new obsession.
                  </p>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/*Card5*/}
          <BentoTilt className="bento-tilt_2 max-h-[30rem]">
            <div className="flex size-full flex-col justify-between bg-white p-5">
              <h1 className="bento-title special-font text-black">
                &quot;Know how to learn. Then, want to learn.&quot;
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
        <div className="h-[150vh]" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default About;
